<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <n-layout
              style="
                width: 100%;
                height: 100%;
                position: absolute;
                max-width: 750px;
                display: block;
                left: 0;
                right: 0;
                margin: auto;
              "
            >
              <SiteHeader
                v-if="!($route.path === '/')"
                :contentPages="contentPagesMainNav"
                :emergencyHotline="emergencyHotline"
              />
              <n-layout position="absolute" style="top: 64px">
                <NuxtPage />
              </n-layout>
              <SiteFooter
                v-if="
                  !($route.path === '/' || contentPagesFooterNav.length === 0)
                "
                :contentPages="contentPagesFooterNav"
              />
            </n-layout>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { getEntries } from "./contentful/contentfulAPI";
interface ContentPage {
  name: string;
  nameDe?: string;
}
const emergencyHotline = ref("emergencyHotline");
const contentPagesMainNav: ContentPage[] = reactive([]);
const contentPagesFooterNav: ContentPage[] = reactive([]);
async function getContentPagesForNavigation() {
  try {
    const res = await getEntries({ content_type: "pages" });
    res.map((page) => {
      if (page.showInMainNavigation) {
        contentPagesMainNav.push({ name: page.name, nameDe: page.nameDe });
      }
      if (page.showInFooterNavigation)
        contentPagesFooterNav.push({ name: page.name });
    });
  } catch (e) {
    console.log("Error", e);
  } finally {
  }
}
async function getEmergencyNumber() {
  try {
    const res = await getEntries({ content_type: "notfallHotline" });
    emergencyHotline.value = res[0].name;
  } catch (e) {
    console.log("Error", e);
  } finally {
  }
}

onMounted(() => {
  getContentPagesForNavigation();
  getEmergencyNumber();
});
const themeOverrides = {
  // common: {
  //   //first
  //   fontFamily: "Secret-Forest",
  //   primaryColor: "#07D9D9",
  //   infoColor: "#07D9D9",
  //   successColor: "#D9298A",
  //   warningColor: "#D9B166",
  //   warningColorSuppl: "#D9B166",
  //   errorColor: "#03588C",
  // },
  common: {
    //sec
    fontFamily: "Secret-Forest",
    primaryColor: "#AB96D9",
    infoColor: "#B9B4D9",
    successColor: "#AB96D9",
    warningColor: "#D9B166",
    warningColorSuppl: "#D9B166",
    errorColor: "#03588C",
  },
  // common: {
  //   //sec
  //   fontFamily: "Secret-Forest",
  //   primaryColor: "#76C4C1",
  //   infoColor: "#22734D",
  //   successColor: "#D9B166",
  //   warningColor: "#D9B166",
  //   warningColorSuppl: "#D9B166",
  //   errorColor: "#03588C",
  // },
  // common: {
  //   //third
  //   fontFamily: "Secret-Forest",
  //   primaryColor: "#03E384",
  //   infoColor: "#00AABC",
  //   successColor: "#BD2962",
  //   warningColor: "#D9B166",
  //   warningColorSuppl: "#D34E4C",
  //   errorColor: "#03588C",
  // },
};
</script>
<style>
@font-face {
  font-family: "Secret-Forest";
  src: url("/font/SecretForest-Medium.otf") format("opentype");
}
html,
body {
  overscroll-behavior-y: none;
  overscroll-behavior-x: none;
}
a {
  color: #ab96d9; /* Set your desired color */
  text-decoration: none; /* Optional: Remove underline */
}
</style>
