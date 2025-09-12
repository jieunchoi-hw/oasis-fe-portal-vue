import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./plugins/toast";

// Global Components Plugin
import globalComponents from "./plugins/global-components";

// Tailwind CSS
import "./styles/main.css";

// 앱 초기화 함수
const initializeApp = async () => {
  const app = createApp(App);

  app.use(globalComponents);
  app.use(pinia);
  app.use(router);

  // Pinia가 초기화된 후 useAuth 사용 가능
  const { useAuth } = await import("./composables/useAuth");

  try {
    const auth = useAuth();
    await auth.initializeApp();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Auth 초기화 실패:", error);
  }

  // 사용자 정보 초기화가 완료된 후 앱 마운트
  app.mount("#app");
};

// 앱 초기화 실행
initializeApp();
