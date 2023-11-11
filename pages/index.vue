<template>
  <n-space justify="center">
    <n-button
      @click="
        () => {
          $i18n.locale = 'de';
          navigateTo('timetable');
        }
      "
      ><n-tag :bordered="false" type="info">Deutsch</n-tag></n-button
    >
    <n-button
      @click="
        () => {
          $i18n.locale = 'de';
          navigateTo('timetable');
        }
      "
      ><n-tag :bordered="false" type="info">Englisch</n-tag></n-button
    ></n-space
  >
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
