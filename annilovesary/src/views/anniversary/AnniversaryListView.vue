<template>
  <button type="button" class="btn btn-outline mx-15 mt-10 mb-1" @click="goBack">Back</button>
  <div class="flex flex-col items-center my-3">
    <div v-for="value in anniversaries" :key="value.id"><AnniversaryDetail :data="value" /></div>
  </div>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { useAccountStore } from "@/stores/account";
import { useAnniversaryStore } from "@/stores/anniversary";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AnniversaryDetail from "@/components/anniversary/AnniversaryDetail.vue";

const anniversaryStore = useAnniversaryStore();
const accountStore = useAccountStore();
const router = useRouter();

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

function goBack() {
  router.back();
}

onMounted(() => {
  getData();
});
</script>

<style scoped></style>
