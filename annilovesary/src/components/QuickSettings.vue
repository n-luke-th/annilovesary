<template>
  <ul class="menu menu-horizontal rounded-box">
    <!-- Home Nav btn -->
    <li>
      <a class="tooltip tooltip-bottom" data-tip="Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </a>
    </li>
    <!-- End Home btn -->
    <!-- Theme selector -->
    <li>
      <ThemeSelector />
    </li>
    <!-- End Theme selector -->
  </ul>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import ThemeSelector from "@/components/themes/ThemeSelector.vue";

onMounted(() => {
  console.log("current theme:", localStorage.getItem("theme"));
});

watch(
  () => localStorage.getItem("theme"),
  (newTheme, prevTheme) => {
    console.log("theme changed to:", newTheme);
    console.log("theme changed from:", prevTheme);
  },
  { immediate: true, deep: true },
);
</script>

<style scoped></style>
