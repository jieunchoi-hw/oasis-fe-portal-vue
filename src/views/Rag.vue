<template>
  <div class="min-h-screen px-15 bg-gray-50">
    <!-- 페이지 헤더 -->
    <div
      class="sticky top-0 z-20 flex justify-between px-8 py-4 pt-14 bg-gray-50"
    >
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
        <SearchInput v-model="search" placeholder="문서 박스를 검색해보세요." />

        <!-- 새로운 박스 버튼 -->
        <ModalOpenButton text="새로운 박스" @click="openModal" />
      </div>
    </div>

    <!-- 카드 그리드 -->
    <div class="px-8 pb-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6"
      >
        <RagCard
          v-for="document in filteredRags"
          :key="document.id"
          :document="document"
          @favorite-updated="handleFavoriteUpdated"
        />
      </div>
    </div>

    <!-- 하단 그라데이션 오버레이 - 뷰포트 고정 -->
    <div
      ref="overlay"
      class="fixed bottom-0 left-0 right-0 h-20 pointer-events-none duration-300 z-10 bg-gradient-to-b from-slate-50/0 to-slate-50 transition-opacity"
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
import {
  ref,
  watchEffect,
  inject,
  onMounted,
  onUnmounted,
  computed,
} from "vue";
import RagCard from "@/components/RagCard.vue";
import CreateBoxModal from "@/components/CreateBoxModal.vue";
import { useRagStore } from "@/stores/rag";

// 오버레이 ref
const overlay = ref(null);
const scrollHost = inject("scrollHost", null);

const refreshFavorites = inject("refreshFavorites", null);

// RAG 스토어
const ragStore = useRagStore();

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

// 즐겨찾기 업데이트 핸들러
const handleFavoriteUpdated = () => {
  if (refreshFavorites) {
    refreshFavorites();
  }
  // 문서 데이터 강제 갱신 (정렬 트리거)
  rags.value = [...ragStore.ragData];
};

// 스크롤 이벤트 핸들러
const FADE_THRESHOLD = 100;

const handleScroll = () => {
  if (!overlay.value) return;

  // 호스트 결정
  const el = scrollHost?.value ?? null;

  // 호스트 기준으로 bottomDistance 계산
  let bottomDistance;
  if (el) {
    const scrollTop = el.scrollTop;
    const clientHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;
    bottomDistance = scrollHeight - (scrollTop + clientHeight);
  } else {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    bottomDistance = scrollHeight - (scrollTop + clientHeight);
  }

  const targetOpacity =
    bottomDistance <= FADE_THRESHOLD
      ? Math.max(0, bottomDistance / FADE_THRESHOLD)
      : 1;

  overlay.value.style.opacity = String(targetOpacity);
};

// 컴포넌트 마운트/언마운트 시 이벤트 리스너 관리
onMounted(() => {
  const stop = watchEffect(() => {
    if (scrollHost?.value) {
      scrollHost.value.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }
  });
});

onUnmounted(() => {
  stop();
  if (scrollHost?.value) {
    scrollHost.value.removeEventListener("scroll", handleScroll);
  }
});

// 검색어 상태
const search = ref("");

// 문서 데이터
const rags = ref(ragStore.ragData);

// 검색어에 따라 필터링된 문서 목록
const filteredRags = computed(() => {
  // 검색어 필터링
  let docs = [];
  if (!search.value.trim()) {
    docs = rags.value.slice();
  } else {
    const keyword = search.value.trim().toLowerCase();
    docs = rags.value.filter(
      (doc) =>
        doc.title.toLowerCase().includes(keyword) ||
        doc.description.toLowerCase().includes(keyword) ||
        doc.author.toLowerCase().includes(keyword)
    );
  }

  // 즐겨찾기 문서 id 목록 가져오기
  const favoriteIds = JSON.parse(
    localStorage.getItem("favoriteRags") || "[]"
  ).map((doc) => doc.id);

  // 즐겨찾기 우선 정렬
  docs.sort((a, b) => {
    const aFav = favoriteIds.includes(a.id) ? 0 : 1;
    const bFav = favoriteIds.includes(b.id) ? 0 : 1;
    return aFav - bFav;
  });

  return docs;
});
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
