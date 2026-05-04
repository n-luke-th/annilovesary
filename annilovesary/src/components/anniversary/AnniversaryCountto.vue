<template>
  <div class="mx-1 my-2">
    <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.years ?? 0}`"
            aria-live="polite"
            :aria-label="countto?.years?.toString()"
            >{{ countto?.years }}</span
          >
        </span>
        years
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.months ?? 0}`"
            aria-live="polite"
            :aria-label="countto?.months?.toString()"
            >{{ countto?.months }}</span
          >
        </span>
        months
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countto?.days ?? 0}`"
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
            :style="`--value: ${countto?.hours ?? 0}`"
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
            :style="`--value: ${countto?.minutes ?? 0}`"
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
            :style="`--value: ${countto?.seconds ?? 0}`"
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
