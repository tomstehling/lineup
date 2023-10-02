<template>
  <n-card :title="props.content.artist">
    <template #header-extra>{{ props.content.showDuration + "h" }}</template>
    {{ getTimeSlot(props.content.showDatetime) }}
    <template #footer>{{ props.footer }} </template>
    <template #action>
      <n-button
        @click="
          () => {
            $emit('addToWishList', { ...props.content });
            isActive = !isActive;
          }
        "
        >{{ isActive ? "Remove from Wishlist" : "Add to Wishlist" }}</n-button
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
const { wishlist, addWishlist, removeWishlist } = inject("wishlist");

const isActive = ref(false);
const getTimeSlot = (dateString) => {
  return dateString.split("T")[1];
};
</script>
<style>
.n-card {
  width: 100%;
}
</style>
