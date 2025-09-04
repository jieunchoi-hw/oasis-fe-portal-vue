<template>
  <div class="min-h-screen flex flex-col">
    <!-- 상단 헤더 -->
    <AppHeader />

    <!-- 메인 컨테이너 -->
    <div class="flex flex-1 pt-16">
      <!-- 왼쪽 네비게이션 -->
      <aside
        class="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 z-40"
      >
        <AppNavigation />
      </aside>

      <!-- 메인 콘텐츠 -->
      <main class="flex-1 ml-75 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppNavigation from "@/components/AppNavigation.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<style scoped>
/* 기본 스타일링 */
</style>
