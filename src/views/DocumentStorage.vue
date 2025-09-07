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
        <button
          @click="openModal"
          class="flex items-center justify-center gap-1 h-10 text-white rounded-full hover:opacity-90 transition-opacity"
          style="background-color: #658aef; padding: 10px 14px 10px 8px"
        >
          <div class="flex items-center justify-center w-6 h-6 px-1.5 py-1">
            <img
              src="@/assets/icons/plus-icon.svg"
              alt="추가"
              class="w-3 h-3"
            />
          </div>
          <span class="text-sm font-semibold">새로운 박스</span>
        </button>
      </div>
    </div>

    <!-- 카드 그리드 -->
    <div class="px-8 pb-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6"
      >
        <DocumentCard
          v-for="document in filteredDocuments"
          :key="document.id"
          :document="document"
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
import DocumentCard from "@/components/DocumentCard.vue";
import CreateBoxModal from "@/components/CreateBoxModal.vue";

// 오버레이 ref
const overlay = ref(null);
const scrollHost = inject("scrollHost", null);

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
const documents = ref([
  {
    id: 1,
    title: "AI 모델 학습 가이드",
    description: "AI 학습 프로세스를 정리한 기본 가이드 문서입니다.",
    author: "이수민",
    date: "2025.07.15",
  },
  {
    id: 2,
    title: "데이터 전처리 규칙",
    description: "데이터 클리닝 및 전처리 규칙 모음집입니다.",
    author: "박지훈",
    date: "2025.06.30",
  },
  {
    id: 3,
    title: "NLP 프로젝트 회의록",
    description: "자연어 처리 프로젝트 주간 회의록 요약본입니다.",
    author: "최민지",
    date: "2025.08.01",
  },
  {
    id: 4,
    title: "AI 윤리 가이드라인",
    description: "AI 개발 및 활용 시 지켜야 할 윤리 기준을 정리했습니다.",
    author: "정우성",
    date: "2025.05.20",
  },
  {
    id: 5,
    title: "클라우드 리소스 관리 방안",
    description: "클라우드 서버 비용 최적화 및 운영 가이드입니다.",
    author: "김민주",
    date: "2025.07.22",
  },
  {
    id: 6,
    title: "보안 점검 체크리스트",
    description: "서비스 보안 점검을 위한 체크리스트 문서입니다.",
    author: "한지혜",
    date: "2025.08.05",
  },
  {
    id: 7,
    title: "챗봇 응답 개선 보고서",
    description: "최근 고객 피드백을 반영한 챗봇 응답 개선 보고서입니다.",
    author: "오세훈",
    date: "2025.08.18",
  },
  {
    id: 8,
    title: "UI 디자인 시스템",
    description: "플랫폼 UI 디자인 규칙과 컴포넌트 정의 문서입니다.",
    author: "김다은",
    date: "2025.07.09",
  },
  {
    id: 9,
    title: "LLM 활용 사례 모음",
    description: "대규모 언어모델 활용 사례와 벤치마킹 자료입니다.",
    author: "박서준",
    date: "2025.06.14",
  },
  {
    id: 10,
    title: "AI 번역기 개선안",
    description: "번역 정확도 향상을 위한 개선 아이디어 제안서입니다.",
    author: "이지현",
    date: "2025.08.03",
  },
  {
    id: 11,
    title: "데이터 시각화 매뉴얼",
    description: "효과적인 데이터 시각화를 위한 가이드라인입니다.",
    author: "최현우",
    date: "2025.05.28",
  },
  {
    id: 12,
    title: "업무 자동화 프로세스",
    description: "RPA와 AI를 활용한 자동화 절차를 설명합니다.",
    author: "윤아름",
    date: "2025.06.18",
  },
  {
    id: 13,
    title: "AI 학습 데이터셋 관리",
    description: "대규모 데이터셋 관리 및 버전 관리 방법론입니다.",
    author: "강준호",
    date: "2025.07.12",
  },
  {
    id: 14,
    title: "프로젝트 일정표",
    description: "AI 솔루션팀 3분기 주요 일정 및 마일스톤입니다.",
    author: "정지원",
    date: "2025.07.25",
  },
  {
    id: 15,
    title: "코드 리뷰 가이드",
    description: "효율적인 코드 리뷰 진행을 위한 기준과 체크포인트입니다.",
    author: "김하늘",
    date: "2025.08.02",
  },
  {
    id: 16,
    title: "데이터 보안 정책",
    description: "사내 데이터 보안 및 접근 제어 정책 문서입니다.",
    author: "박예진",
    date: "2025.06.05",
  },
  {
    id: 17,
    title: "AI 서비스 아키텍처",
    description: "현재 운영 중인 AI 서비스의 시스템 아키텍처 다이어그램입니다.",
    author: "이도현",
    date: "2025.08.10",
  },
  {
    id: 18,
    title: "신규 인턴 온보딩 자료",
    description: "인턴십 프로그램 참여자를 위한 온보딩 자료입니다.",
    author: "김유나",
    date: "2025.07.03",
  },
  {
    id: 19,
    title: "고객사 기술 지원 FAQ",
    description: "자주 묻는 질문과 답변을 정리한 기술 지원 문서입니다.",
    author: "송지호",
    date: "2025.08.07",
  },
  {
    id: 20,
    title: "AI 모델 성능 평가표",
    description: "각 모델별 성능 지표와 벤치마크 테스트 결과입니다.",
    author: "홍서연",
    date: "2025.08.20",
  },
]);

// 검색어에 따라 필터링된 문서 목록
const filteredDocuments = computed(() => {
  if (!search.value.trim()) return documents.value;
  const keyword = search.value.trim().toLowerCase();
  return documents.value.filter(
    (doc) =>
      doc.title.toLowerCase().includes(keyword) ||
      doc.description.toLowerCase().includes(keyword) ||
      doc.author.toLowerCase().includes(keyword)
  );
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
