// import "@/assets/main.css";
import "@/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import pkg from "@/../package.json";

import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
console.info(
  `running '${pkg.name}' app version '${pkg.version}' as '${import.meta.env.MODE}' mode...`,
);
