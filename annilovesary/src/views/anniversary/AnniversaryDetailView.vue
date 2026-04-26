<template>
  <div>
    <AnniversaryDetail :data="data" />

    {{ diffDays }} Days since anniversary date.
  </div>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useAnniversaryStore } from "@/stores/anniversary";
// const id = ref("");
// onBeforeRouteUpdate(async (to, from) => {
//   // react to route changes...
//   await getData(to.params.docId as string);
// });
onBeforeRouteLeave((to, from) => {
  console.log("Something is trying to make me leave this page!");
  console.trace(); // This will show you exactly what function called the redirect
  // return false; // Uncomment this to block the redirect and stay on the page
});
const route = useRoute();
// watch(
//   () => route.params.docId,
//   async (newId) => {
//     if (newId) {
//       await getData(newId as string);
//     }
//   },
//   { immediate: true }, // This replaces the need for onMounted
// );
const data = reactive<AnniversaryEntity>({
  id: "as string",
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
// async function getData(docId: string) {
//   console.log(docId);
//   const result = await anniversaryStore.getAnniversary(docId as string);
//   console.log("anniversaries", result);
//   if (result) {
//     data.anniversaryType = result.anniversaryType;
//     data.customTypeValue = result.customTypeValue;
//     data.date = result.date;
//     data.desc = result.desc;
//     data.id = result.id;
//     data.mt = result.mt;
//   }
// }
// async function getData(docId: string) {
//   try {
//     const result = await anniversaryStore.getAnniversary(docId as string);
//     if (result) {
//       Object.assign(data, result); // Cleaner way to update reactive object
//     } else {
//       console.error("No record found for ID:", docId);
//     }
//   } catch (err) {
//     console.error("Fetch failed", err);
//   }
// }
// onMounted(() => {
//   getData(route.params.docId as string);
// });
</script>

<style scoped></style>
