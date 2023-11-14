<template>
  <n-button @click="$emit('switcher')">{{
    props.showWishlist ? $t("all") : $t("favorites")
  }}</n-button>
</template>
<script setup>
const props = defineProps({ showWishlist: Boolean });
</script>
