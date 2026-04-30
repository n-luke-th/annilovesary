<template>
  <div class="flex items-center justify-center my-5">
    <div class="card w-full max-w-lg shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-4">Anniversary Details</h2>
        <div>
          <b>ID: </b><code>{{ data.id }}</code>
        </div>

        <form class="space-y-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-semibold">Anniversary Type</span>
            </label>
            <select
              style="pointer-events: none"
              :value="data.anniversaryType"
              class="select select-bordered w-full input-field-bg"
            >
              <option disabled value="">Pick an anniversary type</option>
              <option value="first_met">First Met</option>
              <option value="annual">Annual</option>
              <option value="marry">Marry</option>
              <option value="birthday">Birthday</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div class="form-control w-full" v-if="data.anniversaryType === 'custom'">
            <label class="label">
              <span class="label-text font-semibold">Custom Type value</span>
            </label>
            <input
              :value="data.customTypeValue"
              type="text"
              placeholder="no custom type value yet..."
              class="input-field-bg select-all"
              readonly="true"
            />
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-semibold">Anniversary Date</span>
            </label>
            <input
              :value="convertedDate"
              type="text"
              class="input-field-bg select-all"
              readonly="true"
            />
          </div>

          <fieldset class="fieldset">
            <label class="label">
              <span class="font-semibold">Description</span>
            </label>
            <textarea
              :value="data.desc"
              class="textarea textarea-bordered bg-base-content dark:bg-accent-content"
              placeholder="no description yet..."
              readonly="true"
            ></textarea>
          </fieldset>
          <div class="card-actions justify-end mt-6">
            <button class="btn btn-primary" @click="toDetailPage">More Details</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  data: AnniversaryEntity;
}>();
const router = useRouter();
const d = ref(new Date());

const convertedDate = computed({
  get: () => {
    const date = props.data.date;
    if (date instanceof Date) {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${props.data.isDateIncludeTime === true ? `@${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} hrs` : ""}`;
    }
    return "unknown";
  },
  set: (val) => {
    d.value = new Date(val);
  },
});

function toDetailPage() {
  if (!props.data?.id) {
    console.error("Cannot navigate: docId is missing");
    return;
  }

  // console.warn("redirect to anniversary detail page with id:", docId);

  router.push({
    name: "anniversaryDetail",
    // params: { docId: "izwS39E68mWwJFa1yqxo" },
    params: {
      docId: props.data?.id,
    },
  });
}
</script>

<style scoped></style>
