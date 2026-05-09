<template>
  <div class="border border-accent rounded-xl mx-1 my-3 py-4 px-3">
    <div class="my-2" v-if="getDate">
      <label class="label">
        Mode
        <input type="checkbox" @change="toggleMode" class="toggle" />
        {{ countMode.toUpperCase() }}
      </label>
    </div>
    <AnniversaryCountto v-if="countMode === 'since' && getDate" :start-date="getDate" />
    <AnniversaryCountdown v-else-if="countMode === 'countdown' && getDate" :target-date="getDate" />
    <div v-else>You haven't pick default anniversary with your partner.</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AnniversaryCountdown from "./AnniversaryCountdown.vue";
import AnniversaryCountto from "./AnniversaryCountto.vue";
import { useAnniversaryStore } from "@/stores/anniversary";
import { whenever } from "@vueuse/core";

const countMode = ref<"countdown" | "since">("countdown");
const date = ref<Date | undefined>();

const props = defineProps<{
  targetDate?: Date;
}>();

const getTargetDate = computed(() => {
  if (props.targetDate) {
    return props.targetDate;
  } else {
    return date.value;
  }
});

const anniStore = useAnniversaryStore();
whenever(
  () => anniStore.selectedAnniversary,
  (v) => {
    date.value = v.date;
  },
);

function toggleMode() {
  if (countMode.value === "countdown") countMode.value = "since";
  else countMode.value = "countdown";
}

const getDate = computed(() => {
  const currentYear = new Date().getFullYear();
  if (countMode.value === "countdown" && getTargetDate.value) {
    console.log(
      "countdown to current year, anni date and month",
      currentYear,
      getTargetDate?.value?.getMonth(),
      getTargetDate?.value?.getDate(),
    );
    return new Date(currentYear, getTargetDate.value.getMonth(), getTargetDate.value.getDate());
  }
  return getTargetDate.value;
});
</script>

<style scoped></style>
