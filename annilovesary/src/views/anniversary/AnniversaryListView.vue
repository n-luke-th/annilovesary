<template>
  <DetailsPageLayout
    ><div class="flex flex-col lg:flex-row flex-wrap justify-around items-center gap-2 space-x-1">
      <div v-for="value in anniversaries" :key="value.id">
        <AnniversaryDetail :data="value" :show-buttom-btn="true" />
      </div>
    </div>
  </DetailsPageLayout>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { useUserStore } from "@/stores/user";
import { useAnniversaryStore } from "@/stores/anniversary";
import { onMounted, ref } from "vue";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";
import { useTitle } from "@vueuse/core";

useTitle("Your anniversaries");

const anniversaryStore = useAnniversaryStore();
const userStore = useUserStore();

const anniversaries = ref<AnniversaryEntity[]>([]);

async function getData() {
  if (userStore.isAuthenticated && userStore.authUser?.uid) {
    const result = await anniversaryStore.getAnniversaries();
    if (result) {
      anniversaries.value = result;
    }
    console.log("anniversaries", result);
  }
}

onMounted(() => {
  getData();
});
</script>

<style scoped></style>
