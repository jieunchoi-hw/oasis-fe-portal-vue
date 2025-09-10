import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Global Components Plugin
import globalComponents from "./plugins/global-components";

// Tailwind CSS
import "./styles/main.css";

const app = createApp(App);
// Register Vue3Toastify
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: "auto",
  pauseOnHover: true,
  closeOnClick: false,
  style: {
    opacity: 0.97,
    userSelect: "initial",
  },
});

app.use(globalComponents);
app.use(pinia);
app.use(router);

app.mount("#app");
