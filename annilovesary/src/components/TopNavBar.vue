<template>
  <div class="max-md:collapse border-b my-1 shadow-md w-full rounded-md">
    <input id="navbar-1-toggle" class="peer hidden" type="checkbox" />
    <label for="navbar-1-toggle" class="fixed inset-0 hidden max-lg:peer-checked:block"></label>
    <div class="collapse-title navbar">
      <!-- Start nav content -->
      <div class="navbar-start">
        <label for="navbar-1-toggle" class="btn btn-ghost md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <button class="btn btn-ghost text-xl" @click="toLogin">Annilovesary</button>
        <!-- <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav> -->
      </div>
      <!-- Middle nav content -->
      <div class="navbar-center hidden md:flex">
        <QuickSettings />
      </div>

      <div class="navbar-end">
        <ProfileBtn v-if="accountStore.isAuthenticated" />
      </div>
    </div>

    <div class="collapse-content md:hidden z-1">
      <div class="flex flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <h3 class="text-xl font-medium select-none mb-1">Theme</h3>
          <ThemeSelectorContent />
        </div>

        <!-- <div class="flex flex-col items-center">
         ...content...
        </div> -->
        <!-- <div class="flex flex-col items-center">
         ...content...
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QuickSettings from "@/components/QuickSettings.vue";
import ThemeSelectorContent from "@/components/themes/ThemeSelectorContent.vue";
import { useRouter } from "vue-router";
import ProfileBtn from "@/components/auth/ProfileBtn.vue";
import { useAccountStore } from "@/stores/account";
const router = useRouter();
const accountStore = useAccountStore();

const toLogin = () => {
  router.push({ name: "login" });
};
</script>
