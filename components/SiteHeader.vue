<template>
  <n-layout-header
    position="absolute"
    bordered
    class="nav"
    :style="{
      '--side-padding': '16px',
      'grid-template-columns': 'auto 1fr auto',
      height: '65px',
    }"
  >
    <n-text tag="div" class="ui-logo">
      <img src="/WurzelIcon.png" />
    </n-text>
    <div :style="''"></div>
    <n-popover
      style="padding: 0; width: 288px"
      placement="bottom-end"
      display-directive="show"
      trigger="click"
    >
      <template #trigger>
        <n-icon size="20" style="margin-left: 12px">
          <menu-outline />
        </n-icon>
      </template>
      <div style="overflow: auto; max-height: 79vh">
        <n-menu
          :value="mobileMenuValue"
          :options="mobileMenuOptions"
          :indent="18"
          :render-label="renderMenuLabel"
          @update:value="handleUpdateMobileMenu"
        />
      </div>
    </n-popover>
  </n-layout-header>
</template>

<script setup lang="ts">
import { MenuOutline } from "@vicons/ionicons5";
import { useRoute } from "vue-router";
import type { RouteLocationPathRaw } from "vue-router";

const route = useRoute();

const renderMenuLabel = (option: { label: string; path: any }) => {
  return option.label;
};

const mobileMenuOptionsRef = computed(() => {
  return [
    {
      key: "home",
      label: "home",
      path: "home",
    },
    {
      key: "timetable",
      label: "timetable",
      path: "timetable",
    },
    {
      key: "info",
      label: "info",
      path: "info",
    },
    {
      key: "map",
      label: "map",
      path: "map",
    },
  ];
});

const mobileMenuValueRef = computed(() => {
  switch (route.name) {
    case "index":
      return "index";
    case "index":
      return "index";
  }
});

const mobileMenuOptions = mobileMenuOptionsRef;
const mobileMenuValue = mobileMenuValueRef;

function handleUpdateMobileMenu(
  key: String,
  { path }: { path: RouteLocationPathRaw }
) {
  console.log(key, path);
  navigateTo(path);
}
</script>
<style scoped>
:root {
  --header-height: 60px;
}
.nav {
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}

.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.ui-logo > img {
  margin-right: 12px;
  height: 32px;
  width: 32px;
}

.nav-menu {
  padding-left: 36px;
}

.nav-picker {
  margin-right: 4px;
}

.nav-picker.padded {
  padding: 0 10px;
}

.nav-picker:last-child {
  margin-right: 0;
}

.nav-end {
  display: flex;
  align-items: center;
}
</style>

<style>
.nav-menu .n-menu-item {
  height: calc(var(--header-height) - 1px) !important;
}
.scroll {
  /* margin-top: 64px;
  overflow: auto;
  position: relative;
  width: 100%; */
}
</style>
