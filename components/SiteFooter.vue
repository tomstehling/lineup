<template>
  <n-layout-footer
    bordered
    position="absolute"
    style="height: 64px; padding: 24px"
  >
    <n-space vertical justify="center" style="height: 100%">
      <n-space>
        <n-text tag="div" class="icon" v-for="footerObject in footerItems">
          <img
            :src="footerObject.iconUrl"
            :ariaLabel="footerObject.ariaLabel"
            @click="navigateTo(footerObject.path)"
          />
        </n-text>
      </n-space>
    </n-space>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { getEntries } from "~/contentful/contentfulAPI";
interface footerObject {
  iconUrl: string;
  name: string;
  path?: string | boolean;
  ariaLabel: string;
}
interface contentPage {
  name: string;
}
const props = defineProps({
  contentPages: Array<contentPage>,
});
const footerObjects: footerObject[] = reactive(new Array());
const isLoading = ref(true);

const footerItems = computed(() => {
  let arr = new Array();
  if (props.contentPages) {
    for (const contentPage of props.contentPages) {
      const obj = footerObjects.find(
        (obj) => obj.name.toLowerCase() === contentPage.name.toLowerCase()
      );
      if (obj) {
        arr.push({ ...obj, path: `/contentPages/${obj.name}` });
      }
    }
  }

  return arr;
});

onMounted(async () => {
  try {
    const result = await getEntries({ content_type: "footer" });
    result.map((e) => {
      footerObjects.push({
        iconUrl: e.iconLink.icon.url,
        name: e.name.toLowerCase(),
        ariaLabel: e.iconLink.ariaLabel,
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
});
</script>
<style scoped>
.icon > img {
  height: 24px;
  width: 24px;
}
</style>
