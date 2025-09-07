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
      <aside class="bg-white border-r border-gray-200 overflow-hidden">
        <AppNavigation @toggle-sidebar="handleSidebarToggle" />
      </aside>

      <!-- 메인 콘텐츠 -->
      <main
        ref="main"
        class="bg-gray-50 overflow-auto overflow-y-auto overflow-x-hidden min-w-[1200px]"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import AppNavigation from "@/components/AppNavigation.vue";
import AppHeader from "@/components/AppHeader.vue";

// 사이드바 접힘 상태 관리
const isSidebarCollapsed = ref(false);

// 사이드바 토글 핸들러
const handleSidebarToggle = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

// 자식에게 넘길 스크롤 호스트
const main = ref(null);
provide("scrollHost", main);
</script>

<style scoped>
/* 기본 스타일링 */
</style>
