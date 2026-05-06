<template>
  <DetailsPageLayout>
    <div class="flex flex-col items-center mx-4 mb-5">
      <h1 class="font-bold text-2xl mb-2">Profile</h1>
      <div class="border border-dotted rounded-2xl">
        <div role="tablist" class="tabs tabs-border place-self-center">
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
    </div>
  </DetailsPageLayout>
</template>

<script setup lang="ts">
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";
import { useTitle } from "@vueuse/core";

useTitle("Profile - Annilovesary");
</script>

<style scoped></style>
