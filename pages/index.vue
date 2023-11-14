<template>
  <n-space vertical justify="center" style="height: 100%"
    ><n-space justify="center">
      <n-button
        type="info"
        @click="
          () => {
            $i18n.locale = 'de';
            navigateTo('timetable');
          }
        "
        >Deutsch</n-button
      >
      <n-button
        type="info"
        @click="
          () => {
            $i18n.locale = 'en';
            navigateTo('timetable');
          }
        "
        >Englisch</n-button
      ></n-space
    >
  </n-space>
</template>
