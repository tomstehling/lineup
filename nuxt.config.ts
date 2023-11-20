// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  },
  build: {
    transpile: ["naive-ui", "vueuc", "contentful", "vue-i18n"],
  },
});
