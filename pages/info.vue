<template>
  <n-layout>
    <div v-if="isLoading === false">
      <n-collapse accordion>
        <n-collapse-item
          :title="e.title"
          :name="index"
          v-for="(e, index) of info"
        >
          <div v-html="documentToHtmlString(e.infoText)"></div>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div v-else>loading..</div>
  </n-layout>

  <Menu></Menu>
</template>
<script setup lang="ts">
import { getEntries } from "../contentful/contentfulAPI";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
interface Info {
  title: string;
  [k: string]: any;
}
const isLoading = ref(true);
const info: Array<Info> = new Array();
onMounted(async () => {
  try {
    const result = await getEntries({ content_type: "info" });
    result.map((e) => {
      info.push(e);
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
