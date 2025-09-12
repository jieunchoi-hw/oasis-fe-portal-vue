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

// 앱 마운트 후 사용자 정보 초기화
app.mount("#app");

// 앱이 마운트된 후에 useAuth 사용 (Pinia가 초기화된 후)
import { useAuth } from "./composables/useAuth";

// 앱 초기화
const initializeApp = async () => {
  try {
    const auth = useAuth();

    const result = await auth.initializeApp();

    if (result.success) {
      console.log("앱 초기화 완료 - 사용자 정보 로드됨");
    } else {
      console.warn("사용자 정보 로드 실패:", result.error);
    }
  } catch (error) {
    console.error("앱 초기화 중 오류:", error);
  }
};

// Vue 앱이 마운트된 후 초기화 실행
setTimeout(initializeApp, 0);
