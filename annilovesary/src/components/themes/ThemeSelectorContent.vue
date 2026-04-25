<template>
  <ul
    class="menu bg-amber-400 dark:bg-base-200 shadow-2xl shadow-sky-600 dark:shadow-warning border-3 border-primary-content rounded-box max-w-56 dropdown-content dropdown-bottom dropdown-hover space-y-0.5 top-18 indicator"
    tabindex="-1"
  >
    <!-- <li :class="['p-4', currentTheme ? 'border-2' : 'border']"> -->
    <li>
      <span
        v-if="currentTheme === 'light'"
        class="indicator-item indicator-middle badge badge-secondary"
      ></span>
      <a @click="themeStore.setTheme('light')">Light</a>
    </li>
    <li>
      <a @click="themeStore.setTheme('dark')">Dark</a>
    </li>
    <li>
      <a @click="themeStore.setTheme('valentine')">Valentine</a>
    </li>
    <li>
      <a @click="themeStore.setTheme('halloween')">Halloween</a>
    </li>
    <li>
      <a @click="themeStore.setTheme('sunset')">Sunset</a>
    </li>

    <li>
      <details open>
        <summary>More Themes</summary>
        <ul class="p-2 w-40 z-1">
          <li><a @click="themeStore.setTheme('cupcake')">Cupcake</a></li>
          <li><a @click="themeStore.setTheme('forest')">Forest</a></li>
        </ul>
      </details>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const currentTheme = themeStore.currentTheme;
</script>
