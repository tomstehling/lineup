<template>
  <n-button @click="$emit('switcher')">{{
    props.showWishlist ? "All" : "Favs"
  }}</n-button>
</template>
<script setup>
const props = defineProps({ showWishlist: Boolean });
</script>
