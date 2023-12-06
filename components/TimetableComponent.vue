<template>
  <div>
    <n-collapse-transition :show="show">
      <n-space
        ><n-tag
          v-for="(e, index) of props.floors"
          :bordered="checked[index]"
          :type="checked[index] ? 'success' : ''"
          @click="checked[index] = !checked[index]"
          >{{ e.floorname }}</n-tag
        ></n-space
      >
    </n-collapse-transition>

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
        <div v-else>
          <n-space justify="center"
            ><n-text>{{
              props.showWishlist
                ? $t("startAddWishlist")
                : $t("noEntriesAvailable")
            }}</n-text></n-space
          >
        </div>
      </n-tab-pane>
      <template #suffix>
        <n-space justify="evenly">
          <n-badge :show="filteredFloors.length === 0 ? false : true" dot>
            <n-button round secondary type="info" @click="show = !show"
              ><n-icon size="24" color="#ffffff">
                <FilterCircleOutline v-if="!show" /><CheckmarkCircleOutline
                  v-if="show" /></n-icon
            ></n-button>
          </n-badge>
          <Switcher
            style="margin-right: 10px"
            @switcher="$emit('switcher')"
            :showWishlist="props.showWishlist"
          />
        </n-space>
      </template>
    </n-tabs>
  </div>
</template>
<script setup>
import { onMounted, computed, watch } from "vue";
import { FilterCircleOutline, CheckmarkCircleOutline } from "@vicons/ionicons5";
import { NTabs, NTabPane, NTab } from "naive-ui";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../helpers/localStorage";
import { useI18n } from "vue-i18n";
const show = ref(false);
const { t } = useI18n();
const props = defineProps({
  lineup: Array,
  festivalDates: Array,
  floors: Array,
  showWishlist: Boolean,
});
const checked = reactive(new Array(props.floors.length).fill(false));
const filteredFloors = computed(() =>
  props.floors.filter((e, index) => e.floorname && checked[index])
);
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
  const date = new Date(dateString);
  const dayInt = date.getDay();
  return t(`weekdays[${dayInt}]`);
};

const getData = (date) => {
  let dataArr = props.lineup;
  if (props.showWishlist) {
    dataArr = reactiveWishlist;
  }
  //implement verbergen field
  return dataArr
    .filter((obj) => !obj.verbergen && obj.tage.datum.startsWith(date))
    .filter((obj) => {
      if (filteredFloors.value.length === 0) {
        return true;
      } else {
        return filterOptions(obj);
      }
    })
    .sort((a, b) => {
      const dateA = parseFloat(a.startzeit.split("-")[0]);
      const dateB = parseFloat(b.startzeit.split("-")[0]);
      return dateA - dateB;
    });
};

const filterOptions = (obj) => {
  const floorname = obj.floors && obj.floors.floorname;
  if (!floorname) return false;
  for (const i of filteredFloors.value) {
    if (obj.floors.floorname === i.floorname) return true;
  }
  return false;
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
