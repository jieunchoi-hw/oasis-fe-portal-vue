import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from "@/views/Home.vue";
import AiAssistant from "@/views/AiAssistant.vue";
import DocumentStorage from "@/views/DocumentStorage.vue";
import DocumentStorageDetail from "@/views/DocumentStorageDetail.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "홈",
      requiresAuth: false,
    },
  },
  {
    path: "/ai-assistant",
    name: "AiAssistant",
    component: AiAssistant,
    meta: {
      title: "AI 비서",
      requiresAuth: false,
    },
  },
  {
    path: "/document-storage",
    name: "DocumentStorage",
    component: DocumentStorage,
    meta: {
      title: "문서 저장소",
      requiresAuth: false,
    },
  },
  {
    path: "/document-storage/:id",
    name: "DocumentStorageDetail",
    component: DocumentStorageDetail,
    meta: {
      title: "문서 상세보기",
      requiresAuth: false,
    },
  },
  // 404 페이지
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "페이지를 찾을 수 없습니다",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // 페이지 타이틀 설정
  if (to.meta.title) {
    document.title = `${to.meta.title} - Oasis Portal`;
  }

  next();
});

export default router;
