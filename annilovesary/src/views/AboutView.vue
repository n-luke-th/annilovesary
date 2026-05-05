<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <b>Version:</b> <code>{{ appVersion }}</code>
    </p>
    <div>
      <div>
        <h2>Dependencies</h2>
        <div v-for="(value, name, index) in deps" :key="index">
          <u
            ><code>{{ name }}</code></u
          >
          : <code>{{ value }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import pkg from "@/../package.json";
import { useTitle } from "@vueuse/core";

useTitle("About - Annilovesary");

const appVersion = pkg.version;
const deps = pkg.dependencies;
</script>

<style>
h1 {
  font-size: x-large;
}
h2 {
  font-size: larger;
}
.about {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: calc(10vh);
}
</style>
