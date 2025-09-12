import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./plugins/toast";

// Global Components Plugin
import globalComponents from "./plugins/global-components";

// Tailwind CSS
import "./styles/main.css";

const app = createApp(App);

app.use(globalComponents);
app.use(pinia);
app.use(router);

app.mount("#app");
