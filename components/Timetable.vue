<template>
  <div class="timetable-container">
    <n-tabs type="segment" :default-value="showTab">
      <n-tab-pane
        v-for="(date, dateIndex) in getFestivalDates()"
        :name="dateIndex"
        :tab="getWeekday(date)"
        display-direcitve="show"
      >
        <Grid
          :lineup="getLineupAtDate(date)"
          :focusedId="queryId"
          @addToWishList="
            (obj) => {
              $emit('addToWishList', obj);
            }
          "
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { NTabs, NTabPane, NTab } from "naive-ui";

const queryId = ref("");
const route = useRoute();
const showTab = ref(0);
onMounted(() => {
  sortByDate();
  if (route.query.id) {
    queryId.value = route.query.id;
  }
});
const props = defineProps({
  lineup: Array,
});

const sortByDate = () => {
  props.lineup.sort((a, b) => {
    const dateA = new Date(a.showDatetime);
    const dateB = new Date(b.showDatetime);
    return dateA - dateB;
  });
};

const getFestivalDates = () => {
  const festivalDates = [
    ...new Set(props.lineup.map((obj) => obj.showDatetime.split("T")[0])),
  ];

  return festivalDates;
};

const getWeekday = (dateString) => {
  const weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const date = new Date(dateString);
  return weekDays[date.getDay()];
};

const getLineupAtDate = (date) => {
  return props.lineup.filter((obj) => obj.showDatetime.startsWith(date));
};
</script>
<style>
.timetable-container {
  width: 50%;
  position: absolute;
  left: 25%;
}
</style>
