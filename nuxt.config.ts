// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
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
    },
  },

  build: {
    transpile: ["naive-ui", "vueuc", "contentful"],
  },
});
