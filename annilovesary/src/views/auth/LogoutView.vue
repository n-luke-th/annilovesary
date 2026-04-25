<template>
  <div>Logging out...</div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import { useRouter } from "vue-router";

const onLogout = async () => {
  const accountStore = useAccountStore();
  const router = useRouter();
  try {
    await accountStore.logout();
    router.push({ name: "logoutSuccess", replace: true });
  } catch (error) {
    console.error("LogoutView.vue", error);
    throw new Error("error when logging out");
  }
};

onLogout();
</script>

<style scoped></style>
