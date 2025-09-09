<template>
  <div
    class="h-full flex flex-col bg-white shadow-lg relative transition-all duration-300 overflow-hidden"
  >
    <!-- 팀 섹션들 -->
    <div
      class="space-y-2 mt-6"
      :class="{ 'px-5': !isCollapsed, 'px-2': isCollapsed }"
    >
      <!-- AI 솔루션팀 -->
      <div class="flex items-center gap-1.5 px-0 h-11">
        <div
          v-if="!isCollapsed"
          class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center p-1 flex-shrink-0"
        >
          <img
            src="@/assets/icons/bookmark-icon.svg"
            alt="북마크"
            class="w-3.5 h-3.5"
          />
        </div>
        <span
          v-if="!isCollapsed"
          class="text-base font-medium text-gray-700 flex-1 whitespace-nowrap transition-opacity duration-300"
          >AI 솔루션팀</span
        >
        <button
          @click="toggleSidebar"
          class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-150 transition-colors duration-200"
          :class="{ 'mx-auto': isCollapsed }"
        >
          <img
            src="@/assets/icons/sidebar-toggle.svg"
            alt="사이드바 토글"
            class="w-4 h-4 transition-transform duration-300"
            :class="{ 'rotate-180': isCollapsed }"
          />
        </button>
      </div>

      <!-- 한화시스템/ICT -->
      <div v-if="!isCollapsed" class="flex items-center gap-1.5 px-0 h-11">
        <div
          class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center p-1"
        >
          <img
            src="@/assets/icons/folder-icon.svg"
            alt="폴더"
            class="w-4 h-4"
          />
        </div>
        <span
          class="text-base font-medium text-gray-700 flex-1 whitespace-nowrap"
          >한화시스템/ICT</span
        >
      </div>
    </div>

    <!-- 즐겨찾는 문서 저장소 섹션 -->
    <div v-if="!isCollapsed" class="mt-6 px-5">
      <!-- 섹션 헤더 -->
      <div class="flex items-center gap-1.5 px-0 h-11 mb-0">
        <div
          class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center p-1"
        >
          <img
            src="@/assets/icons/message-icon.svg"
            alt="메시지"
            class="w-6 h-6"
          />
        </div>
        <span
          class="text-base font-medium text-gray-700 flex-1 whitespace-nowrap"
          >즐겨찾는 문서 저장소 ({{ favoriteDocuments.length }})</span
        >
        <img
          v-if="favoriteDocuments.length > 0"
          src="@/assets/icons/dropdown-arrow.svg"
          alt="드롭다운"
          class="w-3.5 h-3.5"
        />
      </div>

      <!-- 문서 목록 -->
      <div class="space-y-0">
        <div
          v-for="document in favoriteDocuments"
          :key="document.id"
          class="flex items-center pl-8 pr-6 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
          style="height: 42px"
          @click="handleFavoriteDocumentClick(document)"
        >
          {{ document.title }}
        </div>

        <!-- 즐겨찾기 문서가 없을 때 -->
        <div
          v-if="favoriteDocuments.length === 0"
          class="flex items-center pl-8 pr-6 text-sm text-gray-400 whitespace-nowrap"
          style="height: 42px"
        >
          즐겨찾는 문서를 추가하세요.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 이벤트 emit 정의
const emit = defineEmits(["toggle-sidebar"]);

// 사이드바 접힘 상태
const isCollapsed = ref(false);

// 사이드바 토글 함수
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("toggle-sidebar", isCollapsed.value);
};

// 즐겨찾는 문서 목록
const favoriteDocuments = ref([]);

// localStorage에서 즐겨찾기 문서 로드
const loadFavoriteDocuments = () => {
  const storedFavorites = localStorage.getItem("favoriteDocuments");
  if (storedFavorites) {
    favoriteDocuments.value = JSON.parse(storedFavorites);
  }
};
// 즐겨찾기 문서 클릭 핸들러
const handleFavoriteDocumentClick = (document) => {
  router.push(`/rag/${document.id}`);
};

// 컴포넌트 마운트 시 즐겨찾기 문서 로드
onMounted(() => {
  loadFavoriteDocuments();
});

// 외부에서 즐겨찾기 리스트를 새로고침할 수 있도록 expose
defineExpose({
  refreshFavorites: loadFavoriteDocuments,
});
</script>
