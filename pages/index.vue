<template>
  <Switcher
    :showWishlist="showWishlist"
    @switcher="showWishlist = !showWishlist"
    class="switcher"
  ></Switcher>
  <div v-if="isLoading">..loading</div>
  <div v-else>
    <Timetable
      :lineup="showWishlist ? getWishlist() : lineup"
      @addToWishList="
        (obj) => {
          wishlist.add(obj);
        }
      "
      class="timetable"
    ></Timetable>
  </div>
</template>
<script setup>
import { getEntries } from "../contentful/contentfulAPI";
import { provide, ref } from "vue";

let isLoading = ref(true);
const showWishlist = ref(false);
const lineup = reactive([]);
const wishlist = reactive(new Set());
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
const getLineup = async () => {
  try {
    const result = await getEntries();
    result.map((e) => {
      lineup.push(e);
    });
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  getLineup();
});
</script>
<style>
.switcher {
  width: 50%;
  left: 25%;
}
.timetable {
  width: 50%;
  left: 25%;
}
</style>
