<template>
  <n-card :title="props.content.artist" content-style="">
    <template #header-extra>{{ props.content.showDuration + "h" }}</template>

    <n-tag :type="checkWishlist({ ...props.content }) ? 'success' : ''">
      {{ getTimeSlot(props.content.showDatetime) }}
    </n-tag>

    <template #footer>
      <n-button
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
        >{{ checkWishlist({ ...props.content }) ? "UnFav" : "Fav  " }}
        <n-icon size="20" style="margin-left: 12px">
          <heart v-if="!checkWishlist({ ...props.content })" />
          <heart-dislike
            v-if="checkWishlist({ ...props.content })"
          /> </n-icon></n-button
    ></template>
  </n-card>
</template>

<script setup>
import { NCard, NButton, backTopDark } from "naive-ui";
import { inject } from "vue";
import { MenuOutline, Heart, HeartDislike } from "@vicons/ionicons5";
const props = defineProps({
  content: Object,
});
const { getWishlist, addWishlist, removeWishlist, checkWishlist } =
  inject("wishlist");

const getTimeSlot = (dateString) => {
  return dateString.split("T")[1];
};
</script>
<style>
.n-card {
  width: 100%;
}
</style>
