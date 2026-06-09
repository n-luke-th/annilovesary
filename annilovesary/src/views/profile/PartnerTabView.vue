<template>
  <div class="w-full flex flex-col justify-around content-center items-center mx-1 my-4">
    <div>This is Partner profile tab</div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useTitle } from "@vueuse/core";

useTitle("Partner - Annilovesary");
const userStore = useUserStore();

async function handlePickDefaultAnni(defaultAnniId: string) {
  try {
    await userStore.setDefaultAnniversary(defaultAnniId);
  } catch {}
}
</script>
<style scoped></style>
