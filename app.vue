<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
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
              <SiteHeader v-if="!($route.path === '/')" />
              <n-layout position="absolute" style="top: 64px">
                <NuxtPage />
              </n-layout>
            </n-layout>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>
<script setup>
import { darkTheme } from "naive-ui";
const themeOverrides = {
  // ...
};
</script>
<style>
html,
body {
  overscroll-behavior-y: none;
  overscroll-behavior-x: none;
}
</style>
