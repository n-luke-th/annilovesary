<template>
  <div class="w-full flex flex-col justify-around content-center items-center mx-1 my-4">
    <!-- profile pic card -->
    <div class="card bg-accent-content w-96 shadow-sm">
      <figure>
        <img
          :src="userStore.authUser?.photoURL ?? ''"
          alt="ProfilePic"
          v-if="userStore.authUser?.photoURL"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-accent">
          {{ userStore.authUser?.displayName ?? userStore.authUser?.email }}'s Profile
        </h2>
        <p></p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" disabled="true">
            {{ userStore.authUser?.photoURL ? "Update" : "Upload" }} Picture
          </button>
        </div>
      </div>
    </div>

    <!-- password bar -->
    <div class="card bg-neutral w-72 shadow-2xs my-2 py-2">
      <div class="flex flex-row justify-around items-center">
        <h4 class="text-md text-balance text-error">Password</h4>
        <button class="btn btn-dash btn-info">Change</button>
      </div>
    </div>

    <!-- table data display -->
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 2 -->
          <tr>
            <td>Display Name</td>
            <td>
              <u>{{ userStore.authUser?.displayName }}</u>
            </td>
            <th>
              <button class="btn btn-outline btn-xs">details</button>
            </th>
          </tr>
          <!-- row 3 -->
          <tr>
            <td>Email</td>
            <td>
              <u>{{ userStore.authUser?.email }}</u>
            </td>
            <th>
              <button class="btn btn-outline btn-xs">details</button>
            </th>
          </tr>
          <!-- row 4 -->
          <tr>
            <td>Creation Time</td>
            <td>
              {{ format(userStore.authUser?.metadata.creationTime?.toString()!, "PPp") }}
            </td>
            <th>
              <button class="btn btn-outline btn-xs">details</button>
            </th>
          </tr>
          <!-- row 5 -->
          <tr>
            <td>Last Signin Time</td>
            <td>
              {{ format(userStore.authUser?.metadata.lastSignInTime?.toString()!, "PPp") }}
            </td>
            <th>
              <button class="btn btn-outline btn-xs">details</button>
            </th>
          </tr>
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Action</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>

    <button
      class="btn btn-secondary btn-md"
      @click="async () => await userStore.authUser?.reload()"
    >
      Reload
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useTitle } from "@vueuse/core";
import { format } from "date-fns";

useTitle("Account - Annilovesary");

const userStore = useUserStore();
const data = userStore.authUser?.toJSON();
console.log(data);
</script>

<style scoped></style>
