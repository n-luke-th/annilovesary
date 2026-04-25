<!--
https://lucide.dev/icons/circle-check-big

@license https://lucide.dev/license
-->
<script setup lang="ts">
import type { CustomSvgIconProps } from "@/common/types/icons.types";

defineProps<CustomSvgIconProps>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="$props.size ?? 24"
    :height="$props.size ?? 24"
    viewBox="0 0 24 24"
    :fill="$props.fill ?? 'none'"
    :stroke="$props.stroke ?? 'currentColor'"
    :stroke-width="$props.strokeWidth ?? 2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-circle-check-big-icon lucide-circle-check-big"
  >
    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
    <path d="m9 11 3 3L22 4" />
  </svg>
</template>
