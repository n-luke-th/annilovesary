<script setup lang="ts">
// import { useAccountStore } from "@/stores/account";
// import { useAnniversaryStore } from "@/stores/anniversary";
import { CirclePlus } from "@lucide/vue";
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

  <div class="fab">
    <!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility -->
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-info">
      <CirclePlus />
    </div>

    <!-- close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder -->
    <div class="fab-close">Close <span class="btn btn-circle btn-lg btn-error">✕</span></div>

    <!-- buttons that show up when FAB is open -->
    <div>Label A <button class="btn btn-lg btn-circle">A</button></div>
    <div>Label B <button class="btn btn-lg btn-circle">B</button></div>
    <div>Label C <button class="btn btn-lg btn-circle">C</button></div>
  </div>
</template>
