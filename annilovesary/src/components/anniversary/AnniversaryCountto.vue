<template>
  <div class="mx-1 my-2">
    <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.days?.toString()}`"
            aria-live="polite"
            :aria-label="countto?.days?.toString()"
            >{{ countto?.days }}</span
          >
        </span>
        days
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.hours?.toString()}`"
            aria-live="polite"
            :aria-label="countto?.hours?.toString()"
            >{{ countto?.hours }}</span
          >
        </span>
        hours
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.minutes?.toString()}`"
            aria-live="polite"
            :aria-label="countto?.minutes?.toString()"
            >{{ countto?.minutes }}</span
          >
        </span>
        min
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.seconds?.toString()}`"
            aria-live="polite"
            :aria-label="countto?.seconds?.toString()"
            >{{ countto?.seconds }}</span
          >
        </span>
        sec
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventDuration } from "@/composables/useEventDuration";
import { computed } from "vue";

const props = defineProps({
  startDate: { type: Date, required: true },
  isReady: { type: Boolean, required: true },
});

const { since: countto } = useEventDuration(computed(() => props.startDate));
</script>

<style scoped></style>
