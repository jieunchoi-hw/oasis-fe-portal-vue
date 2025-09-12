<template>
  <div class="min-h-screen flex flex-col">
    <!-- 상단 헤더 -->
    <AppHeader />

    <!-- 메인 컨테이너 -->
    <div
      class="grid h-screen pt-16 transition-all duration-300"
      :style="{
        gridTemplateColumns: isSidebarCollapsed ? '4rem 1fr' : '18.75rem 1fr',
      }"
    >
      <!-- 왼쪽 네비게이션 -->
      <aside
        class="bg-neutral z-0 border-r border-gray-200 overflow-hidden shadow-[0.25rem_0.25rem_1.5rem_0rem_rgba(0,0,0,0.1)]"
      >
        <AppNavigation
          ref="appNavigation"
          @toggle-sidebar="handleSidebarToggle"
        />
      </aside>

      <!-- 메인 콘텐츠 -->
      <main
        ref="main"
        class="bg-gray-50 overflow-auto overflow-y-auto overflow-x-hidden min-w-[1200px]"
      >
        <router-view />
      </main>
    </div>

    <!-- 로그인 모달 -->
    <LoginModal v-if="isLoginModal" />
  </div>
</template>

<script setup>
import { getUserInfo } from "@/api/index.js";
import { ref, provide, onMounted } from "vue";
import { useUserStore } from "@/stores/user.js";
import AppNavigation from "@/components/AppNavigation.vue";
import AppHeader from "@/components/AppHeader.vue";
import LoginModal from "@/components/LoginModal.vue";

// 사이드바 접힘 상태 관리
const isSidebarCollapsed = ref(false);

// 사이드바 토글 핸들러
const handleSidebarToggle = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

// 자식에게 넘길 스크롤 호스트
const main = ref(null);
provide("scrollHost", main);

// AppNavigation ref
const appNavigation = ref(null);

// 즐겨찾기 새로고침 함수를 자식에게 제공
const refreshFavorites = () => {
  if (appNavigation.value) {
    appNavigation.value.refreshFavorites();
  }
};

provide("refreshFavorites", refreshFavorites);

const isLoginModal = ref(false);

// User store 사용
const userStore = useUserStore();

onMounted(async () => {
  try {
    const result = await getUserInfo();
    // 사용자 정보 조회 성공 시 user 스토어에 저장
    userStore.setUser(result);
  } catch (error) {
    isLoginModal.value = true;
  }
});
</script>

<style scoped>
/* 기본 스타일링 */
</style>
