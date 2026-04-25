<template>
  <div class="grid grid-rows-2 gap-3 mx-2 my-12">
    <div class="row-around"><LoginInputSet class="max-w-md w-full" /></div>

    <div class="container mx-auto my-2 hidden"><div class="row-around">signup btn</div></div>
  </div>
</template>

<script lang="ts" setup>
import LoginInputSet from "@/components/auth/LoginInputSet.vue";
</script>

<style scoped>
.row-around {
  @apply flex flex-row justify-around;
}
</style>
