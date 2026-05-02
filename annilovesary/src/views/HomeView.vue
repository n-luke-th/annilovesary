<script setup lang="ts">
// import { useAccountStore } from "@/stores/account";
// import { useAnniversaryStore } from "@/stores/anniversary";
import { type UserPref } from "@/entities/userEntity.types";
import { useUserStore } from "@/stores/user";
import { CirclePlus, Pencil, BookMarked, BadgePlus } from "@lucide/vue";
import { onMounted, reactive } from "vue";
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
const pref = reactive<UserPref>({
  favTheme: null,
  favLang: null,
});
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.authUser?.uid) {
    const userPref = await userStore.getUserPref(userStore.authUser?.uid);
    Object.assign(pref, userPref);
  }
});

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
</script>

<template>
  <main class="flex flex-col items-center my-6 gap-5">
    <div>lang: {{ pref.favLang }}</div>
    <div>theme: {{ pref.favTheme }}</div>
  </main>

  <div class="fab">
    <!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility -->
    <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">
      <CirclePlus />
    </div>

    <!-- close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder -->
    <div class="fab-close">Close <span class="btn btn-circle btn-lg btn-error">✕</span></div>

    <!-- buttons that show up when FAB is open -->
    <div>
      Add Anniversary<button class="btn btn-lg btn-circle bg-amber-300" @click="toCreateFormView">
        <BadgePlus color="black" />
      </button>
    </div>
    <div>
      View My Anniversaries<button class="btn btn-lg btn-circle btn-info" @click="toListView">
        <BookMarked />
      </button>
    </div>
    <div>
      Edit My Partner<button class="btn btn-lg btn-circle"><Pencil /></button>
    </div>
  </div>
</template>
