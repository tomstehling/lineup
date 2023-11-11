<template>
  <div>
    <n-tabs type="line" animated size="large" :tabs-padding="30">
      <n-tab-pane
        v-for="(dateobj, dateIndex) in festivalDates"
        :name="dateIndex"
        :tab="getWeekday(dateobj.datum)"
        display-direcitve="show"
        ref="tabPaneInstRef"
      >
        <Grid
          v-if="getData(dateobj.datum).length !== 0"
          :entries="getData(dateobj.datum)"
        />
        <div v-else>Start adding to your wishlist!</div>
      </n-tab-pane>
      <template #suffix>
        <Switcher
          style="margin-right: 10px"
          @switcher="$emit('switcher')"
          :showWishlist="props.showWishlist"
        />
      </template>
    </n-tabs>
  </div>
</template>
<script setup>
import { onMounted, computed, watch } from "vue";
import { NTabs, NTabPane, NTab } from "naive-ui";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../helpers/localStorage";
const props = defineProps({
  lineup: Array,
  festivalDates: Array,
  showWishlist: Boolean,
});

const queryId = ref("");
const route = useRoute();
const festivalDates = props.festivalDates.sort((a, b) => {
  const dateA = new Date(a.datum);
  const dateB = new Date(b.datum);
  return dateA - dateB;
});

const reactiveWishlist = reactive([]);
watch(reactiveWishlist, () => {
  reactiveWishlist.sort((a, b) => {
    const dateA = new Date(a.showDatetime);
    const dateB = new Date(b.showDatetime);
    return dateA - dateB;
  });
});

// const festivalDates = computed(() => {
//   const festivalDates = [
//     ...new Set(props.lineup.map((obj) => obj.showDatetime.split("T")[0])),
//   ];

//   return festivalDates;
// });

const getWishlist = () => {
  const wishlist = getFromLocalStorage();
  return wishlist;
};
const addWishlist = (obj) => {
  const wishlist = getWishlist();
  let wishlistSet = new Set([JSON.stringify(obj)]);
  wishlist.map((e) => {
    wishlistSet.add(JSON.stringify(e));
  });
  const wishlistArr = Array.from(wishlistSet).map(JSON.parse);
  saveToLocalStorage(wishlistArr);
  reactiveWishlist.splice(0, reactiveWishlist.length);
  wishlistArr.map((e) => {
    reactiveWishlist.push(e);
  });
};
const removeWishlist = (obj) => {
  let wishlist = getFromLocalStorage();
  const wishlistSet = new Set(wishlist.map(JSON.stringify));
  wishlistSet.delete(JSON.stringify(obj));
  wishlist = Array.from(wishlistSet).map(JSON.parse);
  saveToLocalStorage(wishlist);
  reactiveWishlist.splice(0, reactiveWishlist.length);
  wishlist.map((e) => {
    reactiveWishlist.push(e);
  });
};
const checkWishlist = (obj) => {
  const wishlist = new Set(reactiveWishlist.map(JSON.stringify));
  if (wishlist.has(JSON.stringify(obj))) {
    return true;
  } else return false;
};

provide("wishlist", {
  getWishlist,
  addWishlist,
  removeWishlist,
  checkWishlist,
});

const getWeekday = (dateString) => {
  const weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const date = new Date(dateString);
  return weekDays[date.getDay()];
};

const getData = (date) => {
  let dataArr = props.lineup;
  if (props.showWishlist) {
    dataArr = reactiveWishlist;
  }
  //implement verbergen field
  return dataArr
    .filter((obj) => !obj.verbergen && obj.tage.datum.startsWith(date))
    .sort((a, b) => {
      const dateA = parseFloat(a.startzeit.split("-")[0]);
      const dateB = parseFloat(b.startzeit.split("-")[0]);
      return dateA - dateB;
    });
};

onMounted(() => {
  getWishlist().map((e) => {
    reactiveWishlist.push(e);
  });
  if (route.query.id) {
    queryId.value = route.query.id;
  }
});
</script>
