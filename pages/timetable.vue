<template>
  <n-space v-if="isLoading" vertical justify="center" style="height: 100%">
    <n-space justify="center"><n-spin size="medium" /></n-space>
  </n-space>
  <div v-else>
    <TimetableComponent
      :lineup="lineup"
      :festivalDates="festivalDates"
      :floors="floors"
      :showWishlist="showWishlist"
      @switcher="showWishlist = !showWishlist"
    ></TimetableComponent>
  </div>
</template>
<script setup>
import { getEntries } from "../contentful/contentfulAPI";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
let isLoading = ref(true);
const showWishlist = ref(route.query.showWishlist);

const lineup = reactive([]);
const festivalDates = reactive([]);
const floors = reactive([]);

const getLineup = async () => {
  try {
    const combinedTimetable = await getEntries({
      content_type: "zeitplan",
    });

    const days = await getEntries({ content_type: "tage" });
    const stages = await getEntries({ content_type: "floors" });
    combinedTimetable.map((e) => {
      lineup.push(e);
    });
    days.map((e) => {
      festivalDates.push(e);
    });
    stages.map((e) => {
      floors.push(e);
    });
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  getLineup();
});
</script>
