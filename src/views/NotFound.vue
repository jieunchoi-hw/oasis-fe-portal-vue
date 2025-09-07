<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full text-center">
      <!-- 404 애니메이션 -->
      <div class="mb-8">
        <div class="text-6xl font-bold text-blue-600 mb-4 animate-bounce">
          404
        </div>
        <MagnifyingGlassIcon
          class="h-24 w-24 text-gray-400 mx-auto animate-pulse"
        />
      </div>

      <!-- 에러 메시지 -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        페이지를 찾을 수 없습니다
      </h1>

      <p class="text-gray-600 dark:text-gray-300 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>

      <!-- 제안사항 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          이런 것들을 시도해보세요
        </h3>

        <ul class="space-y-3 text-left">
          <li class="flex items-center text-gray-600 dark:text-gray-300">
            <HomeIcon class="h-5 w-5 mr-3 text-blue-600" />
            홈페이지로 돌아가기
          </li>
          <li class="flex items-center text-gray-600 dark:text-gray-300">
            <ArrowLeftIcon class="h-5 w-5 mr-3 text-blue-600" />
            이전 페이지로 이동
          </li>
          <li class="flex items-center text-gray-600 dark:text-gray-300">
            <MagnifyingGlassIcon class="h-5 w-5 mr-3 text-blue-600" />
            검색을 통해 원하는 페이지 찾기
          </li>
          <li class="flex items-center text-gray-600 dark:text-gray-300">
            <ArrowPathIcon class="h-5 w-5 mr-3 text-blue-600" />
            페이지 새로고침
          </li>
        </ul>
      </div>

      <!-- 액션 버튼들 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <HomeIcon class="h-5 w-5 mr-2" />
          홈으로 이동
        </router-link>

        <button
          @click="goBack"
          class="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          이전 페이지
        </button>

        <button
          @click="refresh"
          class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <ArrowPathIcon class="h-5 w-5 mr-2" />
          새로고침
        </button>
      </div>

      <!-- 빠른 링크 -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          빠른 링크
        </h3>

        <div class="flex flex-wrap justify-center gap-2">
          <router-link
            v-for="link in quickLinks"
            :key="link.name"
            :to="link.to"
            class="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            <component :is="link.icon" class="h-4 w-4 mr-2" />
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const appStore = useAppStore();

const quickLinks = ref([
  { name: "홈", to: "/", icon: HomeIcon },
  { name: "AI 비서", to: "/ai-assistant", icon: RocketLaunchIcon },
  { name: "RAG", to: "/rag", icon: FolderIcon },
]);

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push("/");
  }
  appStore.showInfo("이전 페이지로 이동합니다");
};

const refresh = () => {
  window.location.reload();
};
</script>
