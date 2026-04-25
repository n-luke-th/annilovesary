// stores/theme.ts
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // 1. State: Syncs with localStorage automatically
  const currentTheme = useStorage("theme", "light");

  // 2. Action: To change the theme
  function setTheme(newTheme: string) {
    currentTheme.value = newTheme;
  }

  // function toggleTheme() {
  //   currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  // }

  // 3. Side Effect: Update the DOM whenever the state changes
  // This replaces the logic 'theme-change' used to handle
  watch(
    currentTheme,
    (newVal, prevTheme) => {
      document.documentElement.setAttribute("data-theme", newVal);
      console.log('Pinia Watcher "theme" change to:', newVal, "from", prevTheme);
    },
    { immediate: true },
  );

  return {
    currentTheme,
    setTheme,
    // toggleTheme
  };
});
