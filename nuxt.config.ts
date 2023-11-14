// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Disable SSR for development
  devtools: { enabled: true },
  router: {
    options: {
      hashMode: true,
    },
  },
  modules: ["@kevinmarrec/nuxt-pwa"],
  pwa: {
    meta: {
      name: "Wurzelfestival",
      description: "Zurueck zu den Wurzeln",
      theme_color: "#aa22ff",
    },
    workbox: {
      templatePath: "./sw.js",
      enabled: true,
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
  // build: {
  //   transpile: ["naive-ui", "vueuc", "contentful"],
  // },
});
