<template>
  <header
    class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-10 fixed top-0 left-0 right-0 z-50"
  >
    <!-- 왼쪽 영역: 로고 + 탭 네비게이션 -->
    <div class="flex items-center gap-12">
      <!-- OASIS 로고 -->
      <div class="flex items-center">
        <img src="@/assets/icons/oasis-logo.svg" alt="OASIS" class="h-6" />
      </div>

      <!-- 탭 네비게이션 -->
      <nav class="flex items-center gap-1">
        <router-link
          to="/ai-assistant"
          class="px-3 py-2 text-base font-semibold transition-colors h-9 flex items-center"
          :class="
            $route.path === '/ai-assistant' || $route.path === '/'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          "
        >
          AI 비서
        </router-link>
        <router-link
          to="/document-storage"
          class="px-3 py-2 text-base font-semibold transition-colors h-9 flex items-center"
          :class="
            $route.path === '/document-storage'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          "
        >
          문서 저장소
        </router-link>
      </nav>
    </div>

    <!-- 우측 메뉴 -->
    <div class="flex items-center gap-8">
      <!-- 사용자 프로필 드롭다운 -->
      <div
        class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 transition-colors h-9"
      >
        <div
          class="w-5 h-5 rounded-full flex items-center justify-center"
          style="background-color: #b173ea"
        >
          <span class="text-white text-xs font-semibold">A</span>
        </div>
        <span class="text-sm font-medium text-gray-900">AI 솔루션팀</span>
        <img
          src="@/assets/icons/down-arrow.svg"
          alt="드롭다운"
          class="w-3 h-2"
        />
      </div>

      <!-- 알림 및 사용자 아이콘 -->
      <div class="flex items-center gap-4">
        <button class="relative">
          <img
            src="@/assets/icons/notification-bell.svg"
            alt="알림"
            class="w-6 h-6"
          />
          <!-- 알림 배지 -->
          <span
            class="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
            style="background-color: #579bec"
          >
            6
          </span>
        </button>

        <!-- 사용자 아이콘 -->
        <button>
          <img
            src="@/assets/icons/user-profile.svg"
            alt="사용자"
            class="w-6 h-6"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
// 헤더 관련 로직이 필요한 경우 여기에 추가
</script>

<style scoped>
/* 헤더 관련 스타일링 */
</style>
