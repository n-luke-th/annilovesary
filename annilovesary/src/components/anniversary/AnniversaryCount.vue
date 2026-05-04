<template>
  <div class="border border-accent mx-1 my-3 py-4 px-3">
    <AnniversaryCountto
      v-if="countMode === 'to' && anniStore.selectedAnniversary"
      :is-ready="isReady"
      :start-date="date"
    />
    <AnniversaryCountdown
      v-if="countMode === 'down' && anniStore.selectedAnniversary"
      :is-ready="isReady"
      :target-date="date"
    />
    <div v-else>You haven't pick default anniversary with your partner.</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AnniversaryCountdown from "./AnniversaryCountdown.vue";
import AnniversaryCountto from "./AnniversaryCountto.vue";
import { useAnniversaryStore } from "@/stores/anniversary";
import { whenever } from "@vueuse/core";

const countMode = ref<"down" | "to">("down");
const date = ref(new Date());
const isReady = ref(false);

const anniStore = useAnniversaryStore();
whenever(
  () => anniStore.selectedAnniversary,
  (v) => {
    date.value = v.date;
    isReady.value = true;
  },
);
</script>

<style scoped></style>
