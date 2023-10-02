<template>
  <div class="lineup">
    <h1>Lineup</h1>
    <n-card
      v-for="e in artists"
      :bordered="false"
      size="small"
      content-style="padding:0px;"
    >
      <div style="display: flex; align-items: center">
        <n-button
          @click="handleArtist(e)"
          class="artist-button"
          :bordered="false"
        >
          <n-avatar round>Artist Picture</n-avatar>{{ e.artist }}
        </n-button>
      </div>
    </n-card>

    <n-button @click="goToTimetable()">See Timetable</n-button>
  </div>
</template>

<script setup>
import { NCard, NAvatar, NButton } from "naive-ui";
import { getEntries } from "../contentful/contentfulAPI";

const artists = reactive([]);
const getLineup = async () => {
  const result = await getEntries();
  result.map((e) => {
    artists.push(e);
  });
};

getLineup();
</script>
<style>
.lineup {
  width: 350px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.n-card {
  width: min-content;
  height: min-content;
  display: inline-block;
}
.artist-button {
  font-weight: bold;
  font-size: 20px;
  padding: 0;
}
</style>
