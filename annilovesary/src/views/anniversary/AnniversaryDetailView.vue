<template>
  <DetailsPageLayout>
    <div
      class="flex flex-col justify-center lg:flex-row lg:justify-around items-center-safe gap-2"
      v-if="isError === false"
    >
      <AnniversaryDetail :data="data" />
      <div class="my-2 text-gray-500">
        {{ since?.days }} Days since anniversary date.
        <br />
        {{ since?.years }} Years since anniversary date.
        <br />
        {{ since?.months }} Months since anniversary date.
        <br />
        {{ since?.weeks }} Weeks since anniversary date.
        <br />
        {{ since?.hours }} Hours since anniversary date.
        <br />
        {{ since?.minutes }} Minutes since anniversary date.
        <AnniversaryCountdown :target-date="getAnniDate" :is-ready="isReady" />

        <!-- {{ $route.params }} -->
      </div>
    </div>
    <div v-else class="text-center">You are not authorized!</div>
  </DetailsPageLayout>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";
import { useRoute } from "vue-router";
import { computed, reactive, ref } from "vue";
import { useAnniversaryStore } from "@/stores/anniversary";
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";
import AnniversaryCountdown from "@/components/anniversary/AnniversaryCountdown.vue";
import { Timestamp } from "firebase/firestore";
import { useAsyncState, useTitle } from "@vueuse/core";
import { useEventDuration } from "@/composables/useEventDuration";
import { useUserStore } from "@/stores/user";

useTitle("Anniversary Details - Annilovesary");
const route = useRoute();
const data = reactive<AnniversaryEntity>({
  id: "",
  partnerIds: [],
  customTypeValue: "null",
  desc: "null",
  anniversaryType: "custom",
  isDateIncludeTime: null,
  date: new Date(),
  createdAt: Timestamp.fromDate(new Date()),
  updatedAt: Timestamp.fromDate(new Date()),
});
const anniversaryStore = useAnniversaryStore();
const userStore = useUserStore();
const isError = ref(false);
const { since } = useEventDuration(() => data.date);

const getAnniDate = computed(() => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, data.date.getMonth(), data.date.getDate());
});

async function getData(docId: string) {
  try {
    isError.value = false;
    const result = await anniversaryStore.getAnniversary(docId as string);
    if (result) {
      if (result.partnerIds.some((v) => v === userStore.getCurrentUserId()) === false) {
        // TODO: apply this as the firestore rules in the future
        isError.value = true;
        throw new Error("Unauthorized");
      } else {
        Object.assign(data, result); // Cleaner way to update reactive object
        console.log(data);
      }
    } else {
      console.error("No record found for ID:", docId);
    }
  } catch (err) {
    console.error("Fetch failed", err);
  }
}
const { isReady } = useAsyncState(getData(route.params.docId as string), undefined);
</script>

<style scoped></style>
