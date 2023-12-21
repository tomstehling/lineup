// https://nuxt.com/docs/api/configuration/nuxt-config
import { writeFileSync } from "fs";
import { resolve } from "path";
import { create_wb_manifest } from "./create_wb-manifest";

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  router: {
    options: { hashMode: true },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1 , user-scalable=0",
    },
    baseURL: "/",
  },
  experimental: {
    appManifest: false,
  },
  // build: {
  //   transpile: ["naive-ui", "vueuc", "contentful", "vue-i18n"],
  // },

  // ###########
  // PWA stuff. Keep commented out for development
  // ###########
  //    |
  //    |
  //    v

  // hooks: {
  //   //fetch pre-rendered files during build time and create precache-manifest
  //   "build:manifest"(manifest) {
  //     let manifestArr = new Array();
  //     for (const key in manifest) {
  //       if (manifest.hasOwnProperty(key)) {
  //         const entry = manifest[key];
  //         if (entry.prefetch && entry.preload) {
  //           manifestArr.push(entry.file);
  //         }
  //       }
  //     }
  //     const wb_manifest = create_wb_manifest(manifestArr);
  //     const filePath = resolve(
  //       __dirname,
  //       ".nuxt/dist/client/_nuxt/_v8_manifest.json"
  //     );
  //     writeFileSync(filePath, JSON.stringify(wb_manifest));
  //   },
  // },

  // modules: ["@kevinmarrec/nuxt-pwa"],
  // //pwa config..
  // pwa: {
  //   manifest: {
  //     name: "Wurzelfestival",
  //     short_name: "Wurzelfestival",
  //     background_color: "#000000",
  //     theme_color: "#000000",
  //     start_url: "",
  //   },

  //   meta: {
  //     name: "Wurzelfestival",
  //     description: "Zurueck zu den Wurzeln",
  //     theme_color: "#000000",
  //   },
  //   workbox: {
  //     templatePath: "./sw.js",
  //     preCaching: [
  //       "/",
  //       "/manifest.json",
  //       "/?standalone=true#/",
  //       "/WurzelIcon.png",
  //     ],
  //     // enabled: true,//enable workbox in dev mode
  //   },
  // },

  //tried to fix ts.config base url is not set error, worked for some time but not anymore
  // alias: {
  //   "#pwa": "./.nuxt/types/pwa",
  // },
});
