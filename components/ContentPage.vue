<template>
  <n-layout position="relative">
    <n-card :title="props.page.name">
      <div v-for="rte in props.page.contents">
        <RichTextRenderer
          :document="rte.richText"
          :nodeRenderers="renderNodes()"
        />
      </div>
    </n-card>
  </n-layout>
</template>
<script setup>
import RichTextRenderer from "contentful-rich-text-vue-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { h } from "vue";
const props = defineProps({ page: Object });

function renderNodes() {
  return {
    [BLOCKS.EMBEDDED_ASSET]: (node, text) => {
      const image = node.data.target.fields;
      return h("img", {
        src: `https://${image.file.url}`,
        alt: image.description,
        style: { maxWidth: "100%" },
      });
    },
  };
}
</script>
<style></style>
