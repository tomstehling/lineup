export default defineNuxtConfig({
  ssr: false, // Disable SSR for development
  devtools: { enabled: true },
  router: {
    options: {
      hashMode: true,
    },
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
