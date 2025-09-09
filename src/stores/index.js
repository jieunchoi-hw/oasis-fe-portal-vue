import { createPinia } from "pinia";

const pinia = createPinia({});

// Pinia 개발자 모드 로그 비활성화
if (process.env.NODE_ENV === "production") {
  // 프로덕션에서는 로그 완전 비활성화
  pinia._p = [];
} else {
  pinia._p = [];
}

export default pinia;
