import { computed, type MaybeRefOrGetter, toValue } from "vue";
import { useNow } from "@vueuse/core";

/**
 * A composable for calculating the countdown to a target date. It returns a `countdown` object with the remaining days, hours, minutes, and seconds, as well as a `diffMs` value representing the time difference in milliseconds.
 * usage:
 *
 * `const { countdown } = useEventCountdown(computed(() => props.targetDate));`
 *
 * `console.log(countdown.hours, countdown.days)`

 * @param targetDate
 * @returns a `countdown` object and `diffMs`, a time diffence in milliseconds
 */
export function useEventCountdown(targetDate: MaybeRefOrGetter<Date>) {
  const now = useNow();

  const diffMs = computed(() => {
    const target = toValue(targetDate);

    return Math.max(0, target.getTime() - now.value.getTime());
  });

  const totalSeconds = computed(() => Math.floor(diffMs.value / 1000));

  const countdown = computed(() => ({
    days: Math.floor(totalSeconds.value / 86400),

    hours: Math.floor(totalSeconds.value / 3600) % 24,

    minutes: Math.floor(totalSeconds.value / 60) % 60,

    seconds: totalSeconds.value % 60,

    completed: diffMs.value <= 0,
  }));

  return {
    countdown,
    diffMs,
  };
}
