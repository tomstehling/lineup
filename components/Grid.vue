<template>
  <div>
    <table>
      <tr v-for="(row, rowIndex) in props.lineup" :key="rowIndex">
        <td><Card :content="row"></Card></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  lineup: Object,
});
</script>
<style></style>
