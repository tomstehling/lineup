<template>
  <div class="timetable-container">
    <n-tabs type="segment" animated>
      <n-tab-pane
        v-for="(date, dateIndex) in festivalDates"
        :name="dateIndex"
        :tab="getWeekday(date)"
        display-direcitve="show"
        ref="tabPaneInstRef"
      >
        <Grid v-if="getData(date).length !== 0" :entries="getData(date)" />
        <div v-else>Start adding to your wishlist!</div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { onMounted, computed, watch } from "vue";
import { NTabs, NTabPane, NTab } from "naive-ui";
const queryId = ref("");
const route = useRoute();
const wishlist = reactive(new Set());

const props = defineProps({
  lineup: Array,
  showWishlist: Boolean,
});
const festivalDates = computed(() => {
  const festivalDates = [
    ...new Set(props.lineup.map((obj) => obj.showDatetime.split("T")[0])),
  ];

  return festivalDates;
});

const getWishlist = () => {
  const wishlistArray = Array.from(wishlist).map((e) => JSON.parse(e));
  return wishlistArray;
};
const addWishlist = (obj) => {
  const objString = JSON.stringify(obj);
  wishlist.add(objString);
};
const removeWishlist = (obj) => {
  const objString = JSON.stringify(obj);
  wishlist.delete(objString);
};
const checkWishlist = (obj) => {
  const objString = JSON.stringify(obj);
  if (wishlist.has(objString)) {
    return true;
  } else return false;
};

provide("wishlist", {
  getWishlist,
  addWishlist,
  removeWishlist,
  checkWishlist,
});

onMounted(() => {
  sortByDate();
  if (route.query.id) {
    queryId.value = route.query.id;
  }
});

const sortByDate = () => {
  props.lineup.sort((a, b) => {
    const dateA = new Date(a.showDatetime);
    const dateB = new Date(b.showDatetime);
    return dateA - dateB;
  });
};

const getWeekday = (dateString) => {
  const weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const date = new Date(dateString);
  return weekDays[date.getDay()];
};

const getData = (date) => {
  if (props.showWishlist) {
    return getWishlist().filter((obj) => obj.showDatetime.startsWith(date));
  }
  return props.lineup.filter((obj) => obj.showDatetime.startsWith(date));
};
</script>
<style>
/* .timetable-container {
  width: 50%;
  position: relative;
  left: 25%;
  overflow: auto;
} */
</style>
