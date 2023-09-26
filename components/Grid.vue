<template>
  <div>
    <table>
      <tr v-for="(row, rowIndex) in getData()" :key="rowIndex">
        <td>{{ row }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  lineup: Object,
});
const getData = () => {
  return props.lineup;
};
</script>
<style></style>
