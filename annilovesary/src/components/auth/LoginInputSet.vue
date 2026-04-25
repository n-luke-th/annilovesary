<template>
  <fieldset
    class="fieldset bg-linear-to-b from-base-content/10 to-neutral/20 dark:bg-base-200 border-base-100 dark:border-base-content rounded-box border p-4"
  >
    <legend class="fieldset-legend text-center text-3xl text-base-200 dark:text-neutral-content">
      Login
    </legend>

    <label class="label">Email</label>
    <input
      type="email"
      class="input w-full bg-base-content dark:bg-accent-content"
      placeholder="Email"
    />

    <label class="label">Password</label>
    <input
      type="password"
      class="input w-full bg-base-content dark:bg-accent-content"
      placeholder="Password"
    />

    <button class="btn btn-neutral mt-4">Login</button>
  </fieldset>
</template>

<script setup lang="ts"></script>

<style scoped></style>
