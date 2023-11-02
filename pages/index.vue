<template>
  <div id="index">
    <div class="scroll">
      <Switcher
        :showWishlist="showWishlist"
        @switcher="showWishlist = !showWishlist"
        class="switcher"
      ></Switcher>
      <div v-if="isLoading">..loading</div>
      <div v-else>
        <Timetable
          :lineup="lineup"
          :showWishlist="showWishlist"
          class="timetable"
        ></Timetable>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getEntries } from "../contentful/contentfulAPI";
import { provide, ref } from "vue";

let isLoading = ref(true);
const showWishlist = ref(false);
const lineup = reactive([]);

const getLineup = async () => {
  try {
    const result = await getEntries({ content_type: "lineup" });
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
.scroll {
  overflow: auto;
  height: 100%;
  width: 50%;
  left: 25%;
  position: relative;
}

.switcher {
  position: sticky;
  top: 0;
}
#index {
  position: fixed; /* or absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: linear-gradient(
      30deg,
      #72759d 12%,
      transparent 12.5%,
      transparent 87%,
      #72759d 87.5%,
      #72759d
    ),
    linear-gradient(
      150deg,
      #72759d 12%,
      transparent 12.5%,
      transparent 87%,
      #72759d 87.5%,
      #72759d
    ),
    linear-gradient(
      30deg,
      #72759d 12%,
      transparent 12.5%,
      transparent 87%,
      #72759d 87.5%,
      #72759d
    ),
    linear-gradient(
      150deg,
      #72759d 12%,
      transparent 12.5%,
      transparent 87%,
      #72759d 87.5%,
      #72759d
    ),
    linear-gradient(
      60deg,
      #72759d 25%,
      transparent 25.5%,
      transparent 75%,
      #72759d 75%,
      #72759d
    ),
    linear-gradient(
      60deg,
      #72759d 25%,
      transparent 25.5%,
      transparent 75%,
      #72759d 75%,
      #72759d
    );
  background-size: 80px 140px;
  background-position: 0 0, 0 0, 40px 72px, 40px 72px, 0 0, 40px 72px;
}
</style>

<!-- wishlist -->
