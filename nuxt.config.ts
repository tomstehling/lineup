// https://nuxt.com/docs/api/configuration/nuxt-config
import { writeFileSync } from "fs";
import { resolve } from "path";
import { create_wb_manifest } from "./create_wb-manifest";

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
export default defineNuxtConfig({
  hooks: {
    //fetch pre-rendered files during build time and create precache-manifest
    "build:manifest"(manifest) {
      let manifestArr = new Array();
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
        ".nuxt/dist/client/_nuxt/_v15_manifest.json"
      );
      writeFileSync(filePath, JSON.stringify(wb_manifest));
    },
  },
  ssr: false,

  devtools: { enabled: true },
  router: {
    options: { hashMode: true },
  },
  modules: ["@kevinmarrec/nuxt-pwa"],
  //pwa config..
  pwa: {
    manifest: {
      name: "Wurzelfestival",
      short_name: "Wurzelfestival",
      background_color: "#000000",
      theme_color: "#000000",
      start_url: "",
    },

    meta: {
      name: "Wurzelfestival",
      description: "Zurueck zu den Wurzeln",
      theme_color: "#000000",
    },
    workbox: {
      templatePath: "./sw.js",
      preCaching: ["/#/", "/#/timetable", "/#/map"],
      // enabled: true,//enable workbox in dev mode
    },
  },

  //tried to fix ts.config base url is not set error, worked for some time but not anymore
  // alias: {
  //   "#pwa": "./.nuxt/types/pwa",
  // },
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
  //disable app manifest cuz dont know wtf its good for. Needs to be precached if used. also dont know how to precache it.
  experimental: {
    appManifest: false,
  },
});
