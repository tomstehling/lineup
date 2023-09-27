<template>
  <n-tabs type="segment" :default-value="0">
    <n-tab-pane
      v-for="(date, dateIndex) in getFestivalDates()"
      :name="dateIndex"
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

getLineup().then(() => {
  sortByDate();
});
</script>
