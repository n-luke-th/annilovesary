<template>
  <div>
    <AnniversaryDetail :data="data" />

    {{ diffDays }} Days since anniversary date.

    {{ $route.params }}
  </div>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import { useAnniversaryStore } from "@/stores/anniversary";
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
const now = computed(() => Date.now());
const diffMs = computed(() => {
  if (!data.date || !(data.date instanceof Date)) return 0;
  return now.value - data.date.getTime();
});
const diffDays = computed(() => diffMs.value / (1000 * 60 * 60 * 24));

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
