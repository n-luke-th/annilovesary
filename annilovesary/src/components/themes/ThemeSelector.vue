<template>
  <div class="dropdown dropdown-center tooltip tooltip-bottom" data-tip="Theme">
    <a tabindex="0">
      <LucideIconSunMoon :size="28" :fill="'var(--color-amber-600)'" />
    </a>
    <ThemeSelectorContent />
  </div>
</template>

<script setup lang="ts">
import LucideIconSunMoon from "@/components/icons/LucideIconSunMoon.vue";
import ThemeSelectorContent from "@/components/themes/ThemeSelectorContent.vue";
</script>
