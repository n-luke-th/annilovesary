<template>
  <ul
    class="menu menu-bg shadow-2xl shadow-sky-600 dark:shadow-warning border-3 border-primary-content rounded-box max-w-56 dropdown-content dropdown-bottom dropdown-hover space-y-0.5 top-18"
    tabindex="-1"
  >
    <!-- <li :class="['p-4', currentTheme ? 'border-2' : 'border']"> -->
    <li>
      <a @click="themeStore.setTheme('light')" class="justify-between"
        >Light
        <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'light'" :fill="sky600" />
      </a>
    </li>
    <li>
      <a @click="themeStore.setTheme('dark')" class="justify-between"
        >Dark <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'dark'" :fill="sky600"
      /></a>
    </li>
    <li>
      <a @click="themeStore.setTheme('valentine')" class="justify-between"
        >Valentine
        <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'valentine'" :fill="sky600"
      /></a>
    </li>
    <!-- <li>
      also need to enable in style.css if want it back
      <a @click="themeStore.setTheme('halloween')" class="justify-between"
        >Halloween
        <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'halloween'" :fill="sky600"
      /></a>
    </li> -->
    <li>
      <a @click="themeStore.setTheme('sunset')" class="justify-between"
        >Sunset
        <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'sunset'" :fill="sky600"
      /></a>
    </li>

    <li>
      <details open>
        <summary>More Themes</summary>
        <ul class="p-2 w-40 z-1">
          <li>
            <a @click="themeStore.setTheme('cupcake')" class="justify-between"
              >Cupcake
              <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'cupcake'" :fill="sky600"
            /></a>
          </li>
          <li>
            <a @click="themeStore.setTheme('forest')" class="justify-between"
              >Forest
              <LucideIconCircleCheckBig v-if="themeStore.currentTheme === 'forest'" :fill="sky600"
            /></a>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";
import LucideIconCircleCheckBig from "@/components/icons/LucideIconCircleCheckBig.vue";

const themeStore = useThemeStore();

const sky600 = "oklch(58.8% 0.158 241.966)";
</script>
