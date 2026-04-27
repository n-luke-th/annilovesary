<template>
  <DetailsPageLayout>
    <div class="flex flex-col md:flex-row justify-around items-start gap-2">
      <AnniversaryDetail :data="data" />
      <div class="my-2 text-gray-500">
        {{ diffDays }} Days since anniversary date.
        <br />
        {{ diffYears }} Years since anniversary date.
        <br />
        {{ diffMonths }} Months since anniversary date.
        <br />
        {{ diffWeeks }} Weeks since anniversary date.
        <br />
        {{ diffHours }} Hours since anniversary date.
        <br />
        {{ diffMinutes }} Minutes since anniversary date.

        <!-- {{ $route.params }} -->
      </div>
    </div>
  </DetailsPageLayout>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { useAnniversaryStore } from "@/stores/anniversary";
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";
const route = useRoute();
const data = reactive<AnniversaryEntity>({
  id: "",
  customTypeValue: "null",
  desc: "null",
  anniversaryType: "custom",
  date: new Date(),
  mt: {
    createdAt: new Date(),
    updatedAt: new Date(),
    createdByUid: "",
    updatedByUid: "",
  },
});
const anniversaryStore = useAnniversaryStore();
let timer: number;
onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now();
  }, 1000); // Updates every second
});
onUnmounted(() => {
  clearInterval(timer);
});
const now = ref(Date.now());
const diffMs = computed(() => {
  if (!data.date || !(data.date instanceof Date)) return 0;
  return now.value - data.date.getTime();
});
const diffDays = computed(() => {
  const days = diffMs.value / (1000 * 60 * 60 * 24);
  return days.toFixed(3); // limits the long decimal string
});
const diffYears = computed(() => {
  const years = diffMs.value / (1000 * 60 * 60 * 24 * 365.25);
  return years.toFixed(3);
});
const diffMonths = computed(() => {
  const months = diffMs.value / (1000 * 60 * 60 * 24 * 30.44);
  return months.toFixed(3);
});
const diffWeeks = computed(() => {
  const weeks = diffMs.value / (1000 * 60 * 60 * 24 * 7);
  return weeks.toFixed(3);
});
const diffHours = computed(() => {
  const hours = diffMs.value / (1000 * 60 * 60);
  return hours.toFixed(3);
});
const diffMinutes = computed(() => {
  const minutes = diffMs.value / (1000 * 60);
  return minutes.toFixed(3);
});

async function getData(docId: string) {
  try {
    const result = await anniversaryStore.getAnniversary(docId as string);
    if (result) {
      Object.assign(data, result); // Cleaner way to update reactive object
    } else {
      console.error("No record found for ID:", docId);
    }
  } catch (err) {
    console.error("Fetch failed", err);
  }
}
onMounted(async () => {
  await getData(route.params.docId as string);
});
</script>

<style scoped></style>
