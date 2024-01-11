<template>
  <n-space vertical justify="center" style="height: 100%">
    <n-space justify="center">
      <n-popover
        ref="PWARef"
        style="padding: 0; width: 288px"
        placement="top"
        display-directive="show"
        trigger="manual"
        :overlap="true"
      >
        <template #trigger>
          <n-text tag="div" style="width: 25; height: 25">
            <n-image
              width="100"
              src="/WurzelIcon.png"
              :preview-disabled="true"
            />
          </n-text>
        </template>
        <n-card>
          <n-text>
            {{ $t("pwaHint") }}
          </n-text>
        </n-card>
        <n-space justify="center">
          <n-button
            round
            type="info"
            @click="
              () => {
                navigateTo('timetable');
              }
            "
            >Ok!</n-button
          >
        </n-space>
      </n-popover>
    </n-space>
    <n-space justify="center">
      <n-button
        round
        type="info"
        @click="
          () => {
            $i18n.locale = 'de';
            standalone ? navigateTo('timetable') : triggerPopover();
          }
        "
        >DE</n-button
      >
      <n-button
        round
        type="info"
        @click="
          () => {
            $i18n.locale = 'en';
            standalone ? navigateTo('timetable') : triggerPopover();
          }
        "
        >EN</n-button
      >
    </n-space>
  </n-space>
</template>

<script setup>
import { getEntries } from "../contentful/contentfulAPI";

const PWARef = ref(null);
const standalone = ref(false);
const triggerPopover = () => {
  PWARef.value.setShow(true);
};
const checkStandalone = () => {
  // For iOS Safari
  const isStandaloneiOS = window.navigator.standalone;

  // For other browsers
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  if (isStandalone || isStandaloneiOS) {
    standalone.value = true;
  } else {
    standalone.value = false;
  }
};
const fetchContentful = async () => {
  if ("serviceWorker" in navigator) {
    const status = await navigator.serviceWorker.ready;

    try {
      //making the fist fetch twice, because otherwise the sw cant hook up on it.dont know why, but wont work otherwise
      const notDays = await getEntries({ content_type: "tage" });
      const days = await getEntries({ content_type: "tage" });
      const stages = await getEntries({ content_type: "floors" });
      const combinedTimetable = await getEntries({
        content_type: "zeitplan",
      });
      const map = await getEntries({ content_type: "map" });
    } catch (e) {
      console.log(e);
    }
  }
};

onMounted(() => {
  //request api data, to trigger sw runtime caching
  checkStandalone();
  fetchContentful();
});
</script>
