import { useNow } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * a store for managing
 */
export const useCountdownStore = defineStore("home", () => {
  const now = useNow();

  const targetDate = ref<Date | null>(null);

  const diffMs = computed(() => {
    if (!targetDate.value) return 0;

    return Math.max(0, targetDate.value.getTime() - now.value.getTime());
  });

  const totalSeconds = computed(() => Math.floor(diffMs.value / 1000));

  const countdown = computed(() => ({
    days: Math.floor(totalSeconds.value / 86400),

    hours: Math.floor(totalSeconds.value / 3600) % 24,

    minutes: Math.floor(totalSeconds.value / 60) % 60,

    seconds: totalSeconds.value % 60,
  }));

  function setTargetDate(date: Date) {
    targetDate.value = date;
  }

  return {
    targetDate,
    countdown,
    setTargetDate,
  };
});
