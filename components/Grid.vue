<template>
  <div>
    <div>
      <div
        v-for="(row, rowIndex) in props.lineup"
        :key="rowIndex"
        ref="rows"
        :id="props.lineup[rowIndex].id"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const rows = ref([]);

onMounted(() => {
  //   for (let element of rows.value) {
  //     if (element.getAttribute("id") === props.focusedId) {
  //       console.log(element);
  //       element.scrollIntoView();
  //     }
  //   }
});
const props = defineProps({
  lineup: Object,
  focusedId: String,
});
</script>
<style></style>
