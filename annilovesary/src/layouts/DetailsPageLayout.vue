<template>
  <button
    type="button"
    class="btn btn-outline mx-2 md:mx-15 mt-3 md:mt-6 mb-1 md:md-2"
    @click="goBack"
  >
    <ArrowBigLeftDash />
    Back
  </button>
  <div class="flex flex-col my-2">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ArrowBigLeftDash } from "@lucide/vue";

const router = useRouter();
function goBack() {
  router.back();
}
</script>

<style scoped></style>
