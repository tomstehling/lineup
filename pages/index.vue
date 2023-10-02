<template>
  <div v-if="isLoading">..loading</div>
  <div v-else>
    <Timetable
      :lineup="showWishlist ? wishlist : lineup"
      @addToWishList="
        (obj) => {
          wishlist.add(obj);
          console.log(wishlist);
        }
      "
    ></Timetable>
  </div>
</template>
<script setup>
import { getEntries } from "../contentful/contentfulAPI";
import { provide, ref } from "vue";

provide("wishlist", { getWishlist, addWishlist, removeWishlist });

let isLoading = ref(true);
const showWishlist = ref(false);
const lineup = reactive([]);
const wishlist = reactive(new Set());
const getWishlist = () => wishlist;
const addWishlist = (obj) => {
  wishlist.add(obj);
};
const removeWishlist = (obj) => {
  wishlist.delete(obj);
};
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
