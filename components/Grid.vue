<template>
  <div>
    <div
      v-for="(row, rowIndex) in props.entries"
      :key="rowIndex"
      ref="rows"
      :id="props.entries[rowIndex].id"
    >
      <Card
        :content="row"
        @addToWishList="
          (obj) => {
            $emit('addToWishList', obj);
          }
        "
      ></Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const rows = ref([]);

onMounted(() => {});
const props = defineProps({
  entries: Object,
  focusedId: String,
});
</script>
