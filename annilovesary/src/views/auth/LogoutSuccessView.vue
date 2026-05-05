<template>
  <div class="mx-2 my-12 place-self-center-safe">Logout Successfully</div>
  <!-- <button type="button" class="btn btn-primary" ></button> -->
  <div class="mx-4 my-2 place-self-center-safe">
    <RouterLink to="/login" class="btn btn-primary">LOGIN</RouterLink>
  </div>
</template>
<script lang="ts" setup>
import { useTitle } from "@vueuse/core";

useTitle("Logged out - Annilovesary");
</script>
<style></style>
