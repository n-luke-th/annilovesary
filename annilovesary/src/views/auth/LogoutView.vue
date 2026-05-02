<template>
  <div class="text-center my-2">Logging out...</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const onLogout = async () => {
  const userStore = useUserStore();
  const router = useRouter();
  try {
    await userStore.logout();
    router.push({ name: "logoutSuccess", replace: true });
  } catch (error) {
    console.error("LogoutView.vue", error);
    throw new Error("error when logging out");
  }
};

onLogout();
</script>

<style scoped></style>
