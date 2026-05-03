<script setup lang="ts">
// import { useAnniversaryStore } from "@/stores/anniversary";
import AnniversaryCountdown from "@/components/anniversary/AnniversaryCountdown.vue";
import AnniversaryCountto from "@/components/anniversary/AnniversaryCountto.vue";
import { type UserPref } from "@/entities/userEntity.types";
import { useUserStore } from "@/stores/user";
import { CirclePlus, Clock, ClockArrowUp, Pencil, BookMarked, BadgePlus } from "@lucide/vue";
import { useNow } from "@vueuse/core";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

// const anniversaryStore = useAnniversaryStore();
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
  if (userStore.getCurrentUserId()) {
    const userPref = await userStore.getUserPref();
    Object.assign(pref, userPref);
  }
});

const now = useNow();
const showTime = ref(true);
const showTimeMode = ref<"date-only" | "full" | "time-only">("time-only");

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
    <div>lang: {{ pref.favLang?.toString() }}</div>
    <div>theme: {{ pref.favTheme?.toString() }}</div>
    <div>
      Countdown
      <AnniversaryCountdown
        :target-date="new Date(2026, 7, 30)"
        :is-ready="true"
      ></AnniversaryCountdown>
    </div>
    <div>
      Countto
      <AnniversaryCountto :is-ready="true" :start-date="new Date(2025, 6, 1)"></AnniversaryCountto>
    </div>
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

  <div class="left-fab cursor-pointer">
    <!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility -->
    <div tabindex="0" role="button" class="flex bg-info rounded-md px-1 py-1 text-amber-100">
      <div class="flex flex-row items-center w-fit" v-if="showTime">
        <Clock class="mr-1" />
        {{
          showTimeMode === "full"
            ? now.toString()
            : showTimeMode === "date-only"
              ? now.toDateString()
              : now.toTimeString()
        }}
      </div>
      <div v-else><ClockArrowUp /></div>
    </div>

    <button
      :class="`btn btn-sm ${showTime ? 'btn-error' : 'btn-accent'}`"
      @click="showTime = !showTime"
    >
      {{ !showTime ? "Show" : "Hide" }}
    </button>

    <button class="btn btn-sm" v-if="showTime" @click="showTimeMode = 'date-only'">
      Date only
    </button>
    <button class="btn btn-sm" v-if="showTime" @click="showTimeMode = 'time-only'">
      Time only
    </button>
    <button class="btn btn-sm" v-if="showTime" @click="showTimeMode = 'full'">Full</button>
  </div>
</template>
