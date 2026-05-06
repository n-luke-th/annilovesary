<template>
  <DetailsPageLayout>
    <div class="flex items-center justify-center my-5">
      <div class="card w-full max-w-lg shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-4">New Anniversary</h2>

          <form @submit.prevent="handleSubmit" class="space-y-4" ref="newAnniversary">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Anniversary Type</span>
              </label>
              <select
                v-model="formData.anniversaryType"
                class="select select-bordered w-full inp-full"
                required="true"
              >
                <option disabled value="">Pick an anniversary type</option>
                <option value="first_met">First Met</option>
                <option value="annual">Annual</option>
                <option value="marry">Marry</option>
                <option value="birthday">Birthday</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Custom Type value (optional)</span>
              </label>
              <input
                v-model="formData.customTypeValue"
                type="text"
                placeholder="honeymoon, etc."
                class="inp-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Anniversary Date</span>
              </label>
              <div class="my-2">
                <label class="label">
                  Include Time
                  <input type="checkbox" v-model="formattedIncludeTime" class="toggle" />
                  {{ (!!formData.isDateIncludeTime).toString().toUpperCase() }}
                </label>
              </div>
              <input
                v-model="formattedDate"
                :type="dateSelectorType"
                class="inp-full"
                required="true"
              />
            </div>

            <fieldset class="fieldset">
              <label class="label">
                <span class="font-semibold">Description</span>
              </label>
              <textarea
                v-model="formData.desc"
                class="textarea textarea-bordered bg-base-content dark:bg-accent-content"
                placeholder="additional anniversary description..."
              ></textarea>
              <div class="label">Optional</div>
            </fieldset>

            <div class="card-actions justify-end mt-6">
              <!-- <button type="button" class="btn btn-ghost" @click="goBack">Back</button> -->
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div></DetailsPageLayout
  >
</template>

<script setup lang="ts">
import { type AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import type { CreateDoc } from "@/firebaseService/firestore/types/createDoc.types";
import DetailsPageLayout from "@/layouts/DetailsPageLayout.vue";
import { useUserStore } from "@/stores/user";
import { useAnniversaryStore } from "@/stores/anniversary";
import { useTitle } from "@vueuse/core";
import { computed, reactive, useTemplateRef } from "vue";
// import { useRouter } from "vue-router";

useTitle("New Anniversary - Annilovesary");
const anniversaryStore = useAnniversaryStore();
const userStore = useUserStore();
// const router = useRouter();

const formData = reactive<CreateDoc<AnniversaryEntity>>({
  partnerIds: [],
  anniversaryType: "custom",
  customTypeValue: null,
  isDateIncludeTime: null,
  date: new Date(),
  desc: null,
});

const formattedIncludeTime = computed({
  get: () => !!formData.isDateIncludeTime,
  set: (v) => (formData.isDateIncludeTime = v),
});

const dateSelectorType = computed(() => (formData.isDateIncludeTime ? "datetime-local" : "date"));

const formattedDate = computed({
  get: () => formData.date.toISOString().slice(0, 10),
  set: (val) => {
    formData.date = new Date(val);
  },
});

const handleSubmit = () => {
  createData();
  console.log("Form Submitted:", formData);
  alert("Submitted!");
  formRef.value?.reset();
};

async function createData() {
  if (userStore.authUser?.uid) {
    const result = await anniversaryStore.createNewAnniversary(formData);
    console.log("anniversary created", result);
  }
}

const formRef = useTemplateRef("newAnniversary");

// function goBack() {
//   router.back();
// }
</script>
