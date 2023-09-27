<template>
  <n-card :title="props.content.artist">
    <template #header-extra>{{ props.content.showDuration + "h" }}</template>
    {{ getTimeSlot(props.content.showDatetime) }}
    <template #footer>{{ props.footer }} </template>
    <template #action> #action </template>
  </n-card>
</template>

<script setup>
import { NCard } from "naive-ui";
const props = defineProps({
  content: Object,
});
const showTime = ref("");
const getTimeSlot = (dateString) => {
  return dateString.split("T")[1];
};
</script>
