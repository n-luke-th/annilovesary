<template>
  <div class="grid grid-rows-2 gap-3 mx-2 my-12">
    <div class="container mx-auto">
      <form
        @submit.prevent="handleLogin"
        @reset="resetInputs"
        ref="login-form"
        class="w-full px-1 flex justify-center"
      >
        <fieldset
          class="max-w-lg w-full h-fit fieldset bg-linear-to-b from-base-content/10 to-neutral/20 dark:bg-base-200 border-base-100 dark:border-base-content rounded-box border p-4"
        >
          <legend
            class="fieldset-legend text-center text-3xl text-base-200 dark:text-neutral-content"
          >
            Login
          </legend>

          <label class="label">Email</label>
          <input
            type="email"
            class="input-field-bg"
            placeholder="Email"
            autocomplete="username"
            v-model.trim="formData.email"
          />

          <label class="label">Password</label>
          <input
            type="password"
            class="input-field-bg"
            placeholder="Password"
            autocomplete="current-password"
            v-model="formData.password"
          />

          <button class="btn btn-neutral mt-4" type="submit">Login</button>
          <button type="reset" class="btn max-w-fit btn-ghost place-self-center">reset</button>
        </fieldset>
      </form>
    </div>

    <div class="container mx-auto my-2 hidden"><div class="row-around">signup btn</div></div>
  </div>
</template>

<script lang="ts" setup>
import type { LoginFormData } from "@/common/types/auth.types";
import { useAccountStore } from "@/stores/account";
import { reactive, useTemplateRef } from "vue";
import { useRouter } from "vue-router";

const formInput = useTemplateRef("login-form");
const accountStore = useAccountStore();
const router = useRouter();

function resetInputs() {
  formInput.value?.reset();
  ((formData.email = ""), (formData.password = ""));
}

const formData = reactive<LoginFormData>({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await accountStore.login({ email: formData.email, password: formData.password });
    router.push({ name: "home", replace: true });
  } catch (error) {
    console.log("login error:", error);
  } finally {
    resetInputs();
  }
};
</script>

<style scoped>
.row-around {
  @apply flex flex-row justify-around;
}
</style>
