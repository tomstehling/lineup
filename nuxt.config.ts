// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { create_wb_manifest, wb_manifest } from "./create_wb-manifest";

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
export default defineNuxtConfig({
  hooks: {
    "build:manifest"(manifest) {
      let manifestArr = new Array();
      console.log("manifestRaw", manifest);
      for (const key in manifest) {
        if (manifest.hasOwnProperty(key)) {
          const entry = manifest[key];
          if (entry.prefetch && entry.preload) {
            manifestArr.push(entry.file);
          }
        }
      }
      const wb_manifest = create_wb_manifest(manifestArr);
      const filePath = resolve(
        __dirname,
        ".nuxt/dist/client/_nuxt/wb_manifest.json"
      );
      writeFileSync(filePath, JSON.stringify(wb_manifest));
      // const jsonString = JSON.stringify(manifestArr, null, 2); // Use null, 2 for pretty formatting
      // const filePath = resolve(__dirname, "wb_manifest.json");

      // // Write JSON string to file
      // writeFileSync(filePath, jsonString, "utf-8");
    },

    "nitro:build:before"(nitro) {
      //
    },
  },
  ssr: false,

  devtools: { enabled: true },
  router: {
    options: { hashMode: true },
  },
  modules: ["@kevinmarrec/nuxt-pwa"],

  pwa: {
    manifest: {
      name: "Wurzelfestival",
      short_name: "Wurzelfestival",
      background_color: "#000000",
      theme_color: "#000000",
    },

    meta: {
      name: "Wurzelfestival",
      description: "Zurueck zu den Wurzeln",
      theme_color: "#000000",
    },
    workbox: {
      templatePath: "./sw.js",
      preCaching: ["/#/", "/#/timetable", "/#/map"],
      // enabled: true,
    },
  },
  alias: {
    "#pwa": "./.nuxt/types/pwa",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1 , user-scalable=0",
    },
    baseURL: "/",
  },
  build: {
    transpile: ["naive-ui", "vueuc", "contentful", "vue-i18n"],
  },
  experimental: {
    appManifest: false,
  },
});
