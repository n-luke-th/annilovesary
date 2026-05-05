<template>
  <!-- <div class="dropdown dropdown-bottom dropdown-end">
    <div tabindex="0" role="button" class="btn m-1">Profile</div>
    <ul tabindex="-1" class="dropdown-content menu menu-bg rounded-box z-1 w-52 p-2 shadow-sm">
      <li class="hidden"><a>Edit Profile</a></li>
      <li><a @click="onLogout">Logout</a></li>
    </ul>
  </div> -->

  <button class="btn" onclick="profileModal.showModal()">Profile</button>
  <dialog id="profileModal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="text-lg font-bold">Profile Actions</h3>
      <!-- <p class="py-4">Press ESC key or click the 'x' button above to close</p> -->
      <div class="gap-2 mt-5">
        <div class="flex flex-row justify-around">
          <RouterLink :to="{ name: 'logout' }" class="btn btn-error mx-2">LOGOUT</RouterLink>
          <RouterLink
            :to="{ name: 'profile' }"
            class="btn btn-primary"
            @click="
              () => {
                const _ = defaultDocument?.getElementById('profileModal') as HTMLDialogElement;
                _.close();
              }
            "
            >Edit Profile</RouterLink
          >
        </div>
      </div>
      <!-- </form> -->
    </div>
    <!-- form below enables close when click outside of the modal -->
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { defaultDocument } from "@vueuse/core";
import { document } from "postcss";
</script>

<style scoped></style>
