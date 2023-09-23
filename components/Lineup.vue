<template>
  <div class="lineup">
    <h1>Lineup</h1>
    <n-card
      v-for="artist in artists"
      :bordered="false"
      size="small"
      content-style="padding:0px;"
    >
      <div style="display: flex; align-items: center">
        <n-button
          @click="handleArtist(artist)"
          class="artist-button"
          :bordered="false"
        >
          <n-avatar round>Artist Picture</n-avatar>{{ artist }}
        </n-button>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NAvatar, NButton } from "naive-ui";
import { getEntry, getEntries } from "../contentful/contentfulAPI";
const handleArtist = (e) => {
  console.log(e);
};
const artists = reactive([]);
const getLineup = async () => {
  const result = await getEntries();
  result.map((e) => {
    artists.push(e.artist);
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
