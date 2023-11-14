// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
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

  // build: {
  //   transpile: ["naive-ui", "vueuc", "contentful"],
  // },
});
