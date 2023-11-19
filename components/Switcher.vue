<template>
  <n-button
    round
    secondary
    :type="showWishlist ? 'warning' : 'info'"
    @click="$emit('switcher')"
  >
    <n-space>
      <n-icon size="24" color="#ffffff">
        <HeartCircleOutline v-if="!showWishlist" />
        <ListSharp v-if="showWishlist" />
      </n-icon>
    </n-space>
  </n-button>
</template>
<script setup>
import { Heart, ListSharp, HeartCircleOutline } from "@vicons/ionicons5";
const props = defineProps({ showWishlist: Boolean });
</script>
