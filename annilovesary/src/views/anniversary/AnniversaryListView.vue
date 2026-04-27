<template>
  <DetailsPageLayout>
    <div v-for="value in anniversaries" :key="value.id"><AnniversaryDetail :data="value" /></div>
  </DetailsPageLayout>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { useAccountStore } from "@/stores/account";
import { useAnniversaryStore } from "@/stores/anniversary";
import { onMounted, ref } from "vue";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";

const anniversaryStore = useAnniversaryStore();
const accountStore = useAccountStore();

const anniversaries = ref<AnniversaryEntity[]>([]);

async function getData() {
  if (accountStore.isAuthenticated && accountStore.user?.uid) {
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
