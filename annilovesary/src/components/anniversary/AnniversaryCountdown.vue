<template>
  <div class="mx-1 my-2">
    <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countdown.days.toString()}`"
            aria-live="polite"
            :aria-label="countdown.days.toString()"
            >{{ countdown.days }}</span
          >
        </span>
        days
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countdown.hours.toString().padStart(3, '0')}`"
            aria-live="polite"
            :aria-label="countdown.hours.toString()"
            >{{ countdown.hours }}</span
          >
        </span>
        hours
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countdown.minutes.toString()}`"
            aria-live="polite"
            :aria-label="countdown.minutes.toString()"
            >{{ countdown.minutes }}</span
          >
        </span>
        min
      </div>
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-mono text-5xl">
          <span
            :style="`--value: ${countdown.seconds.toString()}`"
            aria-live="polite"
            :aria-label="countdown.seconds.toString()"
            >{{ countdown.seconds }}</span
          >
        </span>
        sec
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventCountdown } from "@/composables/useEventCountdown";
import { computed } from "vue";

const props = defineProps({
  targetDate: { type: Date, required: true },
  isReady: { type: Boolean, required: true },
});

const { countdown } = useEventCountdown(computed(() => props.targetDate));
</script>

<style scoped></style>
