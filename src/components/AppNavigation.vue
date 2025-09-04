<template>
  <div class="h-full flex flex-col bg-white">
    <!-- 네비게이션 메뉴 -->
    <nav class="flex-1 px-4 py-6">
      <!-- AI 솔루션팀 섹션 -->
      <div class="mb-6">
        <div
          class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-900 bg-blue-50 rounded-lg"
        >
          <div
            class="w-6 h-6 bg-purple-500 rounded flex items-center justify-center"
          >
            <span class="text-white text-xs font-bold">AI</span>
          </div>
          <span>AI 솔루션팀</span>
        </div>
      </div>

      <!-- 메뉴 항목들 -->
      <div class="space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.to"
          class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
          :class="[
            $route.path === item.to
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
          ]"
        >
          <component
            :is="item.icon"
            class="mr-3 h-5 w-5 flex-shrink-0"
            :class="[
              $route.path === item.to
                ? 'text-blue-500'
                : 'text-gray-400 group-hover:text-gray-500',
            ]"
          />
          {{ item.title }}
        </router-link>
      </div>

      <!-- 하위 메뉴 - 한국어만 저장 -->
      <div class="mt-6 space-y-1">
        <div
          class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
        >
          한국어만 저장 (D)
        </div>
        <div class="space-y-1">
          <router-link
            to="/korean-storage"
            class="group flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            한국어만 저장하기
          </router-link>

          <router-link
            to="/ai-chat"
            class="group flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            AI와 채팅하기
          </router-link>

          <router-link
            to="/memo-app"
            class="group flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            메모 앱 기능
          </router-link>

          <router-link
            to="/naver-search"
            class="group flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            네이버 웹 검색하기
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  HomeIcon,
  RocketLaunchIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";

const navigationItems = computed(() => [
  {
    name: "home",
    title: "AI 서비",
    icon: HomeIcon,
    to: "/",
  },
  {
    name: "ai-assistant",
    title: "한국어만 입출력",
    icon: RocketLaunchIcon,
    to: "/ai-assistant",
  },
  {
    name: "document-storage",
    title: "한국어만 대조하기",
    icon: FolderIcon,
    to: "/document-storage",
  },
]);
</script>
