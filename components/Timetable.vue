<template>
  <n-tabs type="segment">
    <n-tab-pane
      v-for="date in getFestivalDates()"
      :name="getWeekday(date)"
      :tab="getWeekday(date)"
    >
      <Grid
        :lineup="getLineupAtDate(date)"
        @cellToggled="(rowIndex) => console.log(rowIndex)"
      />
    </n-tab-pane>
  </n-tabs>
  <hr />
</template>
<script setup>
import { getEntry, getEntries } from "../contentful/contentfulAPI";
import { NTabs, NTabPane } from "naive-ui";
let lineup = reactive([]);
let newArray = reactive([]);
watch(lineup, () => {
  sortByDate();
});
const getLineup = async () => {
  const result = await getEntries();
  result.map((e) => {
    lineup.push(e);
  });
};
const sortByDate = () => {
  lineup.sort((a, b) => {
    const dateA = new Date(a.showDatetime);
    const dateB = new Date(b.showDatetime);
    return dateA - dateB;
  });
};
const getFestivalDays = () => {
  const weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const festivalDays = [
    ...new Set(
      lineup.map(
        (obj) => weekDays[new Date(obj.showDatetime.split("T")[0]).getDay()]
      )
    ),
  ];
  return festivalDays;
};
const getFestivalDates = () => {
  const festivalDates = [
    ...new Set(lineup.map((obj) => obj.showDatetime.split("T")[0])),
  ];
  return festivalDates;
};

const getWeekday = (dateString) => {
  const weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const date = new Date(dateString);
  return weekDays[date.getDay()];
};

const getLineupAtDate = (date) => {
  return lineup.filter((obj) => obj.showDatetime.startsWith(date));
};
getLineup();
</script>
