<template>
  <div style="overflow: auto">
    <n-space v-if="isLoading" vertical justify="center" style="height: 100%">
      <n-space justify="center"><n-spin size="medium" /></n-space>
    </n-space>

    <n-image v-else :src="areaPlanUrl" :width="screenWidth" />
  </div>
</template>
<script setup lang="ts">
import { getEntries } from "~/contentful/contentfulAPI";
import { onMounted } from "vue";
const screenWidth = ref(0);

const isLoading = ref(true);
let areaPlanUrl: string;
onMounted(async () => {
  try {
    const result = await getEntries({ content_type: "map" });
    result.map((e) => {
      areaPlanUrl = e.lageplan.url;
    });
  } catch (e) {
    console.log(e);
  } finally {
    screenWidth.value = window.innerWidth;
    isLoading.value = false;
  }
});
</script>
<style scoped>
.fit-screen {
  height: 100%;
}
</style>
