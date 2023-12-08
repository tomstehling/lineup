<template>
  <n-card :title="props.content.artist.name" content-style="">
    <n-space>
      <n-tag :type="checkWishlist({ ...props.content }) ? 'success' : ''">
        {{ props.content.startzeit }}
      </n-tag>
      <n-tag type="info">
        {{ props.content.floors.floorname }}
      </n-tag>
    </n-space>
    <template #header-extra>
      <n-button
        round
        strong
        secondary
        :type="!checkWishlist({ ...props.content }) ? 'tertiary' : 'primary'"
        @click="
          () => {
            if (!checkWishlist({ ...props.content })) {
              addWishlist({ ...props.content });
            } else if (checkWishlist({ ...props.content })) {
              removeWishlist({ ...props.content });
            }
          }
        "
      >
        <n-icon size="20">
          <heart v-if="!checkWishlist({ ...props.content })" />
          <heart-dislike v-if="checkWishlist({ ...props.content })" /> </n-icon
      ></n-button>
    </template>
  </n-card>
</template>

<script setup>
import { NCard, NButton } from "naive-ui";
import { inject } from "vue";
import { Heart, HeartDislike } from "@vicons/ionicons5";
const props = defineProps({
  content: Object,
});
const { addWishlist, removeWishlist, checkWishlist } = inject("wishlist");
</script>
<style>
.n-card {
  width: 100%;
}
</style>
