<template>
  <div
    class="min-h-screen bg-gray-50 pt-10 px-15"
    style="background-color: #f5f8fd"
  >
    <!-- 페이지 헤더 -->
    <div class="flex justify-between px-8 py-4">
      <div>
        <div class="mb-2">
          <h1 class="text-3xl font-semibold text-gray-900">
            AI 솔루션팀 <span class="text-gray-400 font-normal">(26)</span>
          </h1>
        </div>
        <p class="text-gray-600 mb-6">
          AI 비서에서 사용할 문서를 저장하고 관리할 수 있어요.
        </p>
      </div>

      <!-- 검색바와 새로운 박스 버튼 -->
      <div class="flex items-center gap-1.5">
        <!-- 검색바 -->
        <div class="relative">
          <input
            type="text"
            placeholder="문서 박스를 검색해보세요."
            class="w-90 h-11 pl-12 pr-4 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            style="
              border-color: #efefef;
              padding: 7px 16px;
              padding-left: 48px;
              color: #a7acb6;
            "
          />
          <img
            src="@/assets/icons/search-icon.svg"
            alt="검색"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>

        <!-- 새로운 박스 버튼 -->
        <button
          @click="openModal"
          class="flex items-center justify-center gap-1 h-10 text-white rounded-full hover:opacity-90 transition-opacity cursor-pointer"
          style="background-color: #658aef; padding: 10px 14px 10px 8px"
        >
          <div class="flex items-center justify-center w-6 h-6 px-1.5 py-1">
            <img
              src="@/assets/icons/plus-icon.svg"
              alt="추가"
              class="w-4 h-4"
            />
          </div>
          <span class="text-15px font-semibold">새로운 박스</span>
        </button>
      </div>
    </div>

    <!-- 카드 그리드 -->
    <div class="px-8 pb-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6"
      >
        <DocumentCard
          v-for="document in documents"
          :key="document.id"
          :document="document"
        />
      </div>
    </div>

    <!-- 하단 그라데이션 오버레이 - 뷰포트 고정 -->
    <div
      ref="overlay"
      class="fixed bottom-0 left-0 right-0 h-20 pointer-events-none transition-opacity duration-300 z-10"
      style="
        background: linear-gradient(
          180deg,
          rgba(245, 248, 253, 0) 0%,
          rgba(245, 248, 253, 1) 70%
        );
      "
    ></div>

    <!-- 모달 -->
    <CreateBoxModal
      :is-open="isModalOpen"
      @close="closeModal"
      @submit="handleModalSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DocumentCard from "@/components/DocumentCard.vue";
import CreateBoxModal from "@/components/CreateBoxModal.vue";

// 오버레이 ref
const overlay = ref(null);

// 모달 상태
const isModalOpen = ref(false);

// 모달 열기
const openModal = () => {
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};

// 모달 제출 핸들러
const handleModalSubmit = (formData) => {
  console.log("박스 생성 데이터:", formData);
  // 여기에 API 호출 로직 추가
  closeModal();
};

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  if (!overlay.value) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // 스크롤이 맨 아래에서 100px 이내에 있으면 오버레이를 서서히 사라지게 함
  const bottomDistance = documentHeight - (scrollTop + windowHeight);
  const fadeThreshold = 100; // 100px 이내에서 페이드 시작

  if (bottomDistance <= fadeThreshold) {
    const opacity = Math.max(0, bottomDistance / fadeThreshold);
    overlay.value.style.opacity = opacity.toString();
  } else {
    overlay.value.style.opacity = "1";
  }
};

// 컴포넌트 마운트/언마운트 시 이벤트 리스너 관리
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 문서 데이터
const documents = ref([
  {
    id: 1,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 2,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 3,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 4,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 5,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 6,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 7,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 8,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 9,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 10,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 11,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 12,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 13,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 14,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 15,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
  {
    id: 16,
    title: "구매업무 관련 문서",
    description: "문서 박스에 대한 설명문구가 작성되는 영역입니다.",
    author: "김한화",
    date: "2025.08.20",
  },
]);
</script>

<style scoped>
.text-15px {
  font-size: 15px;
}

.w-90 {
  width: 360px; /* Figma 디자인의 정확한 너비 */
}

/* 플레이스홀더 스타일 */
input::placeholder {
  color: #a7acb6;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.4;
}
</style>
