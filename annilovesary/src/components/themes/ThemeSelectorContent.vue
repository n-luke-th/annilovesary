<template>
  <ul
    class="menu bg-amber-400 dark:bg-base-200 shadow-2xl shadow-sky-600 dark:shadow-warning border-3 border-primary-content rounded-box max-w-56 dropdown-content dropdown-bottom dropdown-hover space-y-0.5 top-18"
    tabindex="-1"
  >
    <!-- <li :class="['p-4', currentTheme ? 'border-2' : 'border']"> -->
    <li>
      <a @click="themeStore.setTheme('light')" class="justify-between"
        >Light
        <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'light'" />
      </a>
    </li>
    <li>
      <a @click="themeStore.setTheme('dark')" class="justify-between"
        >Dark <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'dark'"
      /></a>
    </li>
    <li>
      <a @click="themeStore.setTheme('valentine')" class="justify-between"
        >Valentine <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'valentine'"
      /></a>
    </li>
    <li>
      <a @click="themeStore.setTheme('halloween')" class="justify-between"
        >Halloween <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'halloween'"
      /></a>
    </li>
    <li>
      <a @click="themeStore.setTheme('sunset')" class="justify-between"
        >Sunset <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'sunset'"
      /></a>
    </li>

    <li>
      <details open>
        <summary>More Themes</summary>
        <ul class="p-2 w-40 z-1">
          <li>
            <a @click="themeStore.setTheme('cupcake')" class="justify-between"
              >Cupcake <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'cupcake'"
            /></a>
          </li>
          <li>
            <a @click="themeStore.setTheme('forest')" class="justify-between"
              >Forest <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'forest'"
            /></a>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";
import LucideIconCircleCheckBig from "../icons/LucideIconCircleCheckBig.vue";

const themeStore = useThemeStore();
</script>
