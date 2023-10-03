<template>
  <n-button @click="$emit('switcher')">{{
    props.showWishlist ? "Go to Timetable" : "Go to Wishlist"
  }}</n-button>
</template>
<script setup>
import { NButton } from "naive-ui";
const props = defineProps({ showWishlist: Boolean });
</script>
