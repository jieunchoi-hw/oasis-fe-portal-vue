import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from "@/views/Home.vue";
import AiAssistant from "@/views/AiAssistant.vue";
import Rag from "@/views/Rag.vue";
import RagDetail from "@/views/RagDetail.vue";
import FileDetail from "@/views/FileDetail.vue";
import NotFound from "@/views/NotFound.vue";
import { useRagStore } from "@/stores/rag";

const routes = [
  {
    path: "/",
    redirect: "/rag",
  },
  {
    path: "/home",
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
    path: "/rag",
    name: "Rag",
    component: Rag,
    meta: {
      title: "RAG",
      requiresAuth: false,
    },
  },
  {
    path: "/rag/:id",
    name: "RagDetail",
    component: RagDetail,
    meta: {
      title: "RAG 상세보기",
      requiresAuth: false,
    },
    beforeEnter(to, from, next) {
      const ragStore = useRagStore();
      ragStore.setSelectedRag(
        ragStore.ragData.find((rag) => rag.id === parseInt(to.params.id))
      );
      next();
    },
  },
  {
    path: "/rag/:id/file/:fileId",
    name: "FileDetail",
    component: FileDetail,
    meta: {
      title: "파일 상세보기",
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
    document.title = `${to.meta.title} - OASIS Portal`;
  }

  next();
});

export default router;
