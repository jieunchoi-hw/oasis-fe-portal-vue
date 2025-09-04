<template>
  <div class="min-h-screen flex flex-col">
    <!-- 상단 헤더 -->
    <header
      class="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50"
    >
      <!-- 로고 -->
      <div class="flex items-center">
        <div class="text-2xl font-bold text-black">OASIS</div>
      </div>

      <!-- 우측 메뉴 -->
      <div class="flex items-center space-x-4">
        <!-- 알림 아이콘 -->
        <button class="relative p-2 text-gray-500 hover:text-gray-700">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-2.5-2.5M9 3h2m0 0h2m-2 0v2m0-2V1m-6 8h2m0 0h2m-2 0V7m0 2v2"
            />
          </svg>
          <span
            class="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"
          ></span>
        </button>

        <!-- 사용자 프로필 -->
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-sm font-medium">AI</span>
          </div>
          <span class="text-sm text-gray-700">AI 솔루션팀</span>
          <svg
            class="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </header>

    <!-- 메인 컨테이너 -->
    <div class="flex flex-1 pt-16">
      <!-- 왼쪽 네비게이션 -->
      <aside
        class="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 z-40"
      >
        <AppNavigation />
      </aside>

      <!-- 메인 콘텐츠 -->
      <main class="flex-1 ml-64 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppNavigation from "@/components/AppNavigation.vue";
</script>

<style scoped>
/* 기본 스타일링 */
</style>
