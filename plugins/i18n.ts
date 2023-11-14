import { createI18n } from "vue-i18n";
import de from "../locales/de.json";
import en from "../locales/en.json";
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  messages: {
    de,
    en,
  },
});
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n);
});
