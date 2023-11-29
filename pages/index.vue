<template>
  <n-space vertical justify="center" style="height: 100%"
    ><n-space justify="center">
      <n-button
        type="info"
        @click="
          () => {
            $i18n.locale = 'de';
            navigateTo('timetable');
          }
        "
        >Deutsch</n-button
      >
      <n-button
        type="info"
        @click="
          () => {
            $i18n.locale = 'en';
            navigateTo('timetable');
          }
        "
        >Englisch</n-button
      ></n-space
    >
  </n-space>
</template>

<script setup>
import { getEntries } from "../contentful/contentfulAPI";
import { inject, provide } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
let isLoading = ref(true);
const showWishlist = ref(route.query.showWishlist);
const lineup = reactive([]);
const festivalDates = reactive([]);
const floors = reactive([]);

const getLineup = async () => {
  if ("serviceWorker" in navigator) {
    const status = await navigator.serviceWorker.ready;
    console.log("service-worker ready", status);
    try {
      console.log("start fetching");
      //making the fist fetch twice, because otherwise the sw cant hook up on it.dont know why, but wont work otherwise
      const notDays = await getEntries({ content_type: "tage" });
      const days = await getEntries({ content_type: "tage" });
      const stages = await getEntries({ content_type: "floors" });
      const combinedTimetable = await getEntries({
        content_type: "zeitplan",
      });
      console.log("zeitplan:", combinedTimetable);

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
      console.log("data fetch finished");
    }
  }
};

onMounted(() => {
  getLineup();
});
</script>
