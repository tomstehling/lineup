<template>
  <n-config-provider :theme="darkTheme">
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
import { defineComponent } from "vue";
import { darkTheme } from "naive-ui";
import homeVue from "./pages/home.vue";
import { useRouter } from "#vue-router";
</script>
