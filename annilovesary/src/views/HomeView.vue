<script setup lang="ts">
// import { useAccountStore } from "@/stores/account";
// import { useAnniversaryStore } from "@/stores/anniversary";
import { useRouter } from "vue-router";

// const anniversaryStore = useAnniversaryStore();
// const accountStore = useAccountStore();
const router = useRouter();

function toCreateFormView() {
  router.push({ name: "newAnniversary" });
}
function toListView() {
  router.push({ name: "listAnniversary" });
}

// async function updateData() {
//   if (accountStore.user?.uid) {
//     const data: AnniversaryWriteEntity = {
//       date: new Date(),
//       anniversaryType: "birthday",
//       customTypeValue: Math.random().toString(),
//       mt: {
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         createdByUid: accountStore.user?.uid,
//         updatedByUid: "",
//       },
//     };
//     const result = await anniversaryStore.updateAnniversary("JaylY1IMnx5Z4dHD0VOL", data);
//     console.log("anniversary updated", result);
//   }
// }

function toTestParam() {
  router.push({
    name: "test",
    params: {
      docId: "a unique doc id",
      // aNumber: 123
    },
  });
}
</script>

<template>
  <main class="flex flex-col items-center my-6 gap-5">
    <button class="btn btn-secondary text-3xl" @click="toListView">get anniversaries</button>

    <button class="btn btn-neutral" @click="toCreateFormView">add</button>
    <!-- <button class="btn btn-primary" @click="updateData">update</button> -->
    <!-- <button class="btn btn-secondary">Secondary</button> -->
    <!-- <button class="btn btn-accent">Accent</button> -->
    <button class="btn btn-info" @click="toTestParam">Info to 'test'</button>
    <!-- <button class="btn btn-success">Success</button> -->
    <!-- <button class="btn btn-warning">Warning</button> -->
    <!-- <button class="btn btn-error">Error</button> -->
  </main>
</template>
