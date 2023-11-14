<template>
  <n-icon size="20" style="margin-left: 12px"> <menu-outline /> </n-icon>
  <h1>this is my header</h1>

  <slot />
</template>
<script setup lang="ts">
import { MenuOutline } from "@vicons/ionicons5";
const options = [
  {
    key: "home",
    label: "home",
    path: "info",
  },
  {
    key: "timetable",
    label: "timetable",
    path: "info",
  },
];
import { h } from "vue";
import { RouterLink } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { GameController } from "@vicons/ionicons5";
const route = useRoute();
const router = useRouter();
const mobilePopoverRef = ref(null);

const renderMenuLabel = (option: { label: string; path: any }) => {
  if (!("path" in option) || option.label === "--Debug") {
    return option.label;
  }
  return h(
    RouterLink,
    {
      to: option.path,
    },
    { default: () => option.label }
  );
};

const mobileMenuOptionsRef = computed(() => {
  return [
    {
      key: "home",
      label: "home",
    },
    {
      key: "timetable",
      label: "timetable",
    },
  ];
});
const mobileMenuValueRef = computed(() => {
  if (route.name === "home") return "home";
  return "home";
});
const mobileMenuOptions = [
  {
    label: "Dance Dance Dance",
    key: "Dance Dance Dance",
  },
  {
    label: "Beverage",
    key: "beverage",
  },
  {
    label: "Food",
    key: "food",
  },
];

const mobileMenuValue = mobileMenuValueRef;

// function handleUpdateMobileMenu({ path }) {
//   router.push(path);
//   mobilePopoverRef.value.setShow(false);
// }
</script>
<style scoped>
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
