import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { intervalToDuration } from "date-fns";
import { useNow } from "@vueuse/core";
/**
 * A composable for calculating the duration between two dates.
 * @param startDate
 * @param endDate optional, now is default
 * @returns
 */
export function useEventDuration(
  startDate: MaybeRefOrGetter<Date>,

  endDate?: MaybeRefOrGetter<Date>,
) {
  const now = useNow();
  console.log(
    "useEventDuration called with startDate:",
    toValue(startDate),
    "endDate:",
    toValue(endDate) ? toValue(endDate) : now.value,
  );

  const since = computed(() => {
    const start = toValue(startDate);
    const currentClock = now.value;
    const end = toValue(endDate) ?? currentClock;

    if (!(start instanceof Date) || Number.isNaN(start.getTime())) {
      return null;
    }

    return intervalToDuration({
      start: start < end ? start : end,
      end: start < end ? end : start,
    });
  });
  console.log("useEventDuration since:", since.value);
  return { since };
}

// const diffMs = computed(() => {
//   if (!data.date || !(data.date instanceof Date)) return 0;
//   return now.value.getTime() - data.date.getTime();
// });
// const diffDays = computed(() => {
//   const days = diffMs.value / (1000 * 60 * 60 * 24);
//   return days.toFixed(3); // limits the long decimal string
// });
// const diffYears = computed(() => {
//   const years = diffMs.value / (1000 * 60 * 60 * 24 * 365.25);
//   return years.toFixed(3);
// });
// const diffMonths = computed(() => {
//   const months = diffMs.value / (1000 * 60 * 60 * 24 * 30.44);
//   return months.toFixed(3);
// });
// const diffWeeks = computed(() => {
//   const weeks = diffMs.value / (1000 * 60 * 60 * 24 * 7);
//   return weeks.toFixed(3);
// });
// const diffHours = computed(() => {
//   const hours = diffMs.value / (1000 * 60 * 60);
//   return hours.toFixed(3);
// });
// const diffMinutes = computed(() => {
//   const minutes = diffMs.value / (1000 * 60);
//   return minutes.toFixed(3);
// });
