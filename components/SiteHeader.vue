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
      <img src="/WurzelIcon.png" @click="navigateTo('')" />
    </n-text>
    <n-space justify="center"><n-text> WURZELFESTIVAL </n-text></n-space>
    <n-popover
      ref="menuPopoverRef"
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
        <n-alert :title="t('emergency')" type="warning">
          <n-el
            tag="a"
            :href="`tel:${emergencyHotline}`"
            style="text-decoration: none"
            ><n-h4>{{ emergencyHotline }}</n-h4></n-el
          >
        </n-alert>
      </div>
    </n-popover>
  </n-layout-header>
</template>

<script setup lang="ts">
import { MenuOutline } from "@vicons/ionicons5";
import { useRoute } from "vue-router";
import type { RouteLocationPathRaw } from "vue-router";
import { useI18n } from "vue-i18n";
const route = useRoute();
const { t } = useI18n();
const locale = useI18n();
const menuPopoverRef = ref<null | { setShow: (value: boolean) => null }>(null);
interface ContentPage {
  name: string;
  nameDe?: string;
}
const props = defineProps({ contentPages: Array<ContentPage> });
const renderMenuLabel = (option: { label: string; path: any }) => {
  return option.label;
};
const mobileMenuOptionsRef = computed(() => {
  return [
    {
      key: "timetable",
      label: t("timetable"),
      path: "/timetable",
    },
    {
      key: "map",
      label: t("map"),
      path: "/map",
    },
    ...contentPagesMenuRefs.value,
  ];
});

const contentPagesMenuRefs = computed(() => {
  let arr = new Array();
  for (const contentPage of props.contentPages!) {
    arr.push({
      key: contentPage.name,
      label:
        locale.locale.value === "en" ? contentPage.name : contentPage.nameDe,
      path: `/contentPages/${contentPage.name.toLowerCase()}`,
    });
  }
  return arr;
});

const mobileMenuValueRef = computed(() => {
  switch (route.name) {
    case "timetable":
      return "timetable";
    case "home":
      return "home";
    case "map":
      return "map";
    case "info":
      return "info";
  }
});

const mobileMenuOptions = mobileMenuOptionsRef;
const mobileMenuValue = mobileMenuValueRef;

const emergencyHotline = computed(() => "+49 160 9805 9698");
function handleUpdateMobileMenu(
  key: String,
  { path }: { path: RouteLocationPathRaw }
) {
  console.log(key, path);
  if (menuPopoverRef.value !== null) {
    menuPopoverRef.value.setShow(false);
  }
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
</style>
