<template>
  <div v-if="!isLoading">
    <ContentPage :page="thisPage" />
  </div>
</template>

<script setup lang="ts">
import { getEntries } from "../../contentful/contentfulAPI";
import { useI18n } from "vue-i18n";
const isLoading = ref(true);
const route = useRoute();
const locale = useI18n();
interface Page {
  name: string;
  title: string;
  description: string;
  showInMainNavigation: boolean;
  showInFooterNavigation: boolean;
  contents: object[];
}

let thisPage: Page = {
  name: "page not found",
  title: "title",
  description: "description",
  showInMainNavigation: false,
  showInFooterNavigation: false,
  contents: [{}],
};

async function fetchPages() {
  try {
    const res = await getEntries({ content_type: "pages" });
    console.log("res", res);
    console.log(route.params.slug);
    res
      .filter((page) => page.name.toLowerCase() === route.params.slug)
      .map((page) => {
        thisPage.name = page.name;
        thisPage.title = page.title;
        thisPage.description = page.description;
        thisPage.showInMainNavigation = page.showInMainNavigation;
        thisPage.showInFooterNavigation = page.showInFooterNavigation;
        thisPage.contents =
          locale.locale.value === "en" ? page.contents : page.contentsDe;
      });
  } catch (e) {
    console.log("Error", e);
  } finally {
    console.log("thispage", thisPage);
    isLoading.value = false;
  }
}

onMounted(() => fetchPages());
</script>
