<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <div tabindex="0" role="button" class="btn m-1">Profile</div>
    <ul tabindex="-1" class="dropdown-content menu menu-bg rounded-box z-1 w-52 p-2 shadow-sm">
      <li class="hidden"><a>Edit Profile</a></li>
      <li><a @click="onLogout">Logout</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function onLogout() {
  router.push({ name: "logout" });
}
</script>

<style scoped></style>
