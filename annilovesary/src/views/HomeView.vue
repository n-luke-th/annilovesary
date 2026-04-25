<script setup lang="ts">
import { type AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { useAccountStore } from "@/stores/account";
import { useAnniversaryStore } from "@/stores/anniversary";

const anniversaryStore = useAnniversaryStore();
const accountStore = useAccountStore();

async function getData() {
  if (accountStore.isAuthenticated && accountStore.user?.uid) {
    const result = await anniversaryStore.getAnniversaries(accountStore.user.uid);
    console.log("anniversaries", result);
  }
}

async function createData() {
  if (accountStore.user?.uid) {
    const data: AnniversaryEntity = {
      date: new Date(),
      anniversaryType: "custom",
      customTypeValue: Math.random().toString(),
      mt: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByUid: accountStore.user?.uid,
        updatedByUid: accountStore.user?.uid,
      },
    };
    const result = await anniversaryStore.createNewAnniversary(data, accountStore.user.uid);
    console.log("anniversary created", result);
  }
}
</script>

<template>
  <main class="flex flex-row justify-around items-center">
    <button class="btn btn-secondary text-3xl" @click="getData">get anniversaries</button>

    <button class="btn btn-neutral" @click="createData">Neutral add</button>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-accent">Accent</button>
    <button class="btn btn-info">Info</button>
    <button class="btn btn-success">Success</button>
    <button class="btn btn-warning">Warning</button>
    <button class="btn btn-error">Error</button>
  </main>
</template>
