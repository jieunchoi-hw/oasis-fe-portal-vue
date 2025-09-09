import { defineStore } from "pinia";
import { ref } from "vue";

export const useRagStore = defineStore("rag", () => {
  // State
  const selectedRag = ref(null);
  const ragCounts = ref(0);
  const ragData = ref([
    {
      id: 1,
      title: "AI 모델 학습 가이드",
      description: "AI 학습 프로세스를 정리한 기본 가이드 문서입니다.",
      author: "이수민",
      counts: 11,
      date: "2025.07.15",
    },
    {
      id: 2,
      title: "데이터 전처리 규칙",
      description: "데이터 클리닝 및 전처리 규칙 모음집입니다.",
      author: "박지훈",
      counts: 11,
      date: "2025.06.30",
    },
    {
      id: 3,
      title: "NLP 프로젝트 회의록",
      description: "자연어 처리 프로젝트 주간 회의록 요약본입니다.",
      author: "최민지",
      counts: 0,
      date: "2025.08.01",
    },
    {
      id: 4,
      title: "AI 윤리 가이드라인",
      description: "AI 개발 및 활용 시 지켜야 할 윤리 기준을 정리했습니다.",
      author: "정우성",
      counts: 0,
      date: "2025.05.20",
    },
    {
      id: 5,
      title: "클라우드 리소스 관리 방안",
      description: "클라우드 서버 비용 최적화 및 운영 가이드입니다.",
      author: "김민주",
      counts: 0,
      date: "2025.07.22",
    },
    {
      id: 6,
      title: "보안 점검 체크리스트",
      description: "서비스 보안 점검을 위한 체크리스트 문서입니다.",
      author: "한지혜",
      counts: 0,
      date: "2025.08.05",
    },
    {
      id: 7,
      title: "챗봇 응답 개선 보고서",
      description: "최근 고객 피드백을 반영한 챗봇 응답 개선 보고서입니다.",
      author: "오세훈",
      counts: 0,
      date: "2025.08.18",
    },
    {
      id: 8,
      title: "UI 디자인 시스템",
      description: "플랫폼 UI 디자인 규칙과 컴포넌트 정의 문서입니다.",
      author: "김다은",
      counts: 0,
      date: "2025.07.09",
    },
    {
      id: 9,
      title: "LLM 활용 사례 모음",
      description: "대규모 언어모델 활용 사례와 벤치마킹 자료입니다.",
      author: "박서준",
      counts: 0,
      date: "2025.06.14",
    },
    {
      id: 10,
      title: "AI 번역기 개선안",
      description: "번역 정확도 향상을 위한 개선 아이디어 제안서입니다.",
      author: "이지현",
      counts: 0,
      date: "2025.08.03",
    },
    {
      id: 11,
      title: "데이터 시각화 매뉴얼",
      description: "효과적인 데이터 시각화를 위한 가이드라인입니다.",
      author: "최현우",
      counts: 0,
      date: "2025.05.28",
    },
    {
      id: 12,
      title: "업무 자동화 프로세스",
      description: "RPA와 AI를 활용한 자동화 절차를 설명합니다.",
      author: "윤아름",
      counts: 0,
      date: "2025.06.18",
    },
    {
      id: 13,
      title: "AI 학습 데이터셋 관리",
      description: "대규모 데이터셋 관리 및 버전 관리 방법론입니다.",
      author: "강준호",
      counts: 0,
      date: "2025.07.12",
    },
    {
      id: 14,
      title: "프로젝트 일정표",
      description: "AI 솔루션팀 3분기 주요 일정 및 마일스톤입니다.",
      author: "정지원",
      counts: 0,
      date: "2025.07.25",
    },
    {
      id: 15,
      title: "코드 리뷰 가이드",
      description: "효율적인 코드 리뷰 진행을 위한 기준과 체크포인트입니다.",
      author: "김하늘",
      counts: 0,
      date: "2025.08.02",
    },
    {
      id: 16,
      title: "데이터 보안 정책",
      description: "사내 데이터 보안 및 접근 제어 정책 문서입니다.",
      author: "박예진",
      counts: 0,
      date: "2025.06.05",
    },
    {
      id: 17,
      title: "AI 서비스 아키텍처",
      description:
        "현재 운영 중인 AI 서비스의 시스템 아키텍처 다이어그램입니다.",
      author: "이도현",
      counts: 0,
      date: "2025.08.10",
    },
    {
      id: 18,
      title: "신규 인턴 온보딩 자료",
      description: "인턴십 프로그램 참여자를 위한 온보딩 자료입니다.",
      author: "김유나",
      counts: 0,
      date: "2025.07.03",
    },
    {
      id: 19,
      title: "고객사 기술 지원 FAQ",
      description: "자주 묻는 질문과 답변을 정리한 기술 지원 문서입니다.",
      author: "송지호",
      counts: 0,
      date: "2025.08.07",
    },
    {
      id: 20,
      title: "AI 모델 성능 평가표",
      description: "각 모델별 성능 지표와 벤치마크 테스트 결과입니다.",
      author: "홍서연",
      counts: 0,
      date: "2025.08.20",
    },
  ]);

  // Actions
  const setSelectedRag = (rag) => {
    selectedRag.value = rag;
    // counts 정보도 함께 저장
    if (rag && rag.counts !== undefined) {
      ragCounts.value = rag.counts;
    }
  };

  const clearSelectedRag = () => {
    selectedRag.value = null;
    ragCounts.value = 0;
  };

  const getSelectedRag = () => {
    return selectedRag.value;
  };

  const getRagCounts = () => {
    return ragCounts.value;
  };

  return {
    // State
    selectedRag,
    ragCounts,
    ragData,

    // Actions
    setSelectedRag,
    clearSelectedRag,
    getSelectedRag,
    getRagCounts,
  };
});
