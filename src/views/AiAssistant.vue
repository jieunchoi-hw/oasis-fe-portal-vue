<template>
  <div class="p-8">
    <!-- 페이지 헤더 -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            AI 솔루션팀 (28)
          </h1>
          <p class="text-gray-600">
            AI 비서에서 사용할 솔루션 저장되어 관리할 수 있어요.
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="키워드를 검색해보세요"
              class="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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
          </div>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            새로운 생성
          </button>
        </div>
      </div>
    </div>

    <!-- 솔루션 그리드 -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="(solution, index) in solutions"
        :key="index"
        class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      >
        <!-- 솔루션 아이콘 -->
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-blue-600"
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
          </div>
          <div class="flex items-center space-x-2">
            <!-- 즐겨찾기 버튼 -->
            <button class="text-gray-400 hover:text-yellow-500">
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
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
            <!-- 더보기 메뉴 -->
            <button class="text-gray-400 hover:text-gray-600">
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 솔루션 정보 -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ solution.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ solution.description }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>{{ solution.category }}</span>
            <span>{{ solution.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const solutions = ref([
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
  {
    title: "구매요구 관련 분석",
    description: "2차 복수의 업무 관리로 구성한 업무를 처리하는 업무입니다.",
    category: "업무분",
    date: "2024.05.06",
  },
]);
</script>

<style lang="scss" scoped>
// 추후 AI 비서 관련 스타일 추가 예정
</style>
