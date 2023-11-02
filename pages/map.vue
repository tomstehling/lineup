<template>
  <div style="overflow: auto">
    <div v-if="isLoading">..loading</div>
    <img v-else :src="areaPlanUrl" />
  </div>
</template>
<script setup lang="ts">
import { getEntries } from "~/contentful/contentfulAPI";
import { onMounted } from "vue";
const isLoading = ref(true);
let areaPlanUrl: string;
onMounted(async () => {
  try {
    const result = await getEntries({ content_type: "map" });
    result.map((e) => {
      areaPlanUrl = e.lageplan.url;
      console.log(e.lageplan.url);
      console.log(e);
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
});
</script>
<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
