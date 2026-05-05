<template>
  <DetailsPageLayout>
    <div class="flex flex-col items-center mx-5 my-1">
      <h1>Profile</h1>
      <div role="tablist" class="tabs tabs-border">
        <a
          role="tab"
          :class="`tab ${$router.currentRoute.value.name === 'accountProfile' && 'tab-active'}`"
          ><RouterLink :to="{ name: 'accountProfile' }">Account</RouterLink></a
        >
        <a
          role="tab"
          :class="`tab ${$router.currentRoute.value.name === 'partnerProfile' && 'tab-active'}`"
          ><RouterLink :to="{ name: 'partnerProfile' }">Partner</RouterLink></a
        >
        <a
          role="tab"
          :class="`tab ${$router.currentRoute.value.name === 'prefProfile' && 'tab-active'}`"
          ><RouterLink :to="{ name: 'prefProfile' }">Preference</RouterLink></a
        >
      </div>
      <RouterView class="us__content" />
      <RouterView class="us__content us__content--bottom-bar" name="bottomBar" />
    </div>
  </DetailsPageLayout>
</template>

<script setup lang="ts">
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";
import { useTitle } from "@vueuse/core";

useTitle("Profile - Annilovesary");
</script>

<style scoped></style>
