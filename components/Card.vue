<template>
  <n-card :title="props.content.artist">
    <template #header-extra>{{ props.content.showDuration + "h" }}</template>
    {{ getTimeSlot(props.content.showDatetime) }}
    <template #footer>{{ props.footer }} </template>
    <template #action>
      <n-button
        @click="
          () => {
            if (!checkWishlist({ ...props.content })) {
              addWishlist({ ...props.content });
            } else if (checkWishlist({ ...props.content })) {
              removeWishlist({ ...props.content });
            }
          }
        "
        >{{
          checkWishlist({ ...props.content })
            ? "Remove from Wishlist"
            : "Add to Wishlist"
        }}</n-button
      ></template
    >
  </n-card>
</template>

<script setup>
import { NCard, NButton } from "naive-ui";
import { inject } from "vue";
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
