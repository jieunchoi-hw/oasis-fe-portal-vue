<template>
  <div
    v-if="isVisible"
    class="fixed right-0 bg-white z-50 transform transition-transform duration-300 ease-in-out border-l"
    :class="isVisible ? 'translate-x-0' : 'translate-x-full'"
    style="
      width: 500px;
      top: 4rem;
      height: calc(100vh - 4rem);
      border-color: #efefef;
      box-shadow:
        -40px 0px 40px 0px rgba(245, 248, 253, 0.24),
        -8px 4px 16px 0px rgba(0, 0, 0, 0.04);
    "
  >
    <!-- 헤더 -->
    <div
      class="flex justify-between items-center border-b h-17"
      style="border-color: #efefef; padding: 16px 28px 16px 32px"
    >
      <div class="flex items-center gap-3">
        <img
          :src="getFileTypeIcon(fileData?.fileType)"
          alt="파일 아이콘"
          class="w-6 rounded"
          style="width: 24px; height: 25.92px; border-radius: 3.84px"
        />
        <span class="text-gray-900 font-medium text-sm leading-5">
          {{ fileData?.name }}
        </span>
      </div>
      <button
        @click="$emit('close')"
        class="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
      >
        <img
          src="@/assets/icons/close-modal-icon.svg"
          alt="닫기"
          class="w-3 h-3"
        />
      </button>
    </div>

    <!-- 제목 -->
    <div class="px-9 py-6">
      <h2 class="text-gray-900 font-bold text-xl leading-7">구매 관리 규정</h2>
    </div>

    <!-- 본문 내용 -->
    <div class="px-9 overflow-y-auto" style="height: calc(100% - 244px)">
      <div class="text-gray-900 leading-5">
        <p class="mb-6">
          <strong>제1장 총칙</strong>
        </p>

        <p class="mb-4">
          <strong>제1조 (목적)</strong><br />
          이 규정은 회사의 구매 활동에 관한 기준과 절차를 정하여 비용 절감, 품질
          확보, 투명한 거래질서를 확립함을 목적으로 한다.
        </p>

        <p class="mb-4">
          <strong>제2조 (적용 범위)</strong><br />
          이 규정은 회사의 모든 부서가 수행하는 자재, 용역, 서비스 및 기타 구매
          행위에 적용한다.
        </p>

        <p class="mb-6">
          <strong>제3조 (용어 정의)</strong><br />
          구매라 함은 회사 운영에 필요한 물품, 서비스, 자산 등을 외부에서
          조달하는 행위를 말한다.<br />
          구매 요청 부서라 함은 구매 필요성을 제기하고 승인 절차를 진행하는
          부서를 말한다.<br />
          구매 담당 부서라 함은 구매 절차를 수행하고 공급업체와 계약을 체결하는
          부서를 말한다.
        </p>

        <p class="mb-6">
          <strong>제2장 구매 절차</strong>
        </p>

        <p class="mb-4">
          <strong>제4조 (구매 요청)</strong><br />
          구매 요청 부서는 구매 필요 시 구매 요청서를 작성하여 부서장 승인을
          득해야 한다.<br />
          요청서에는 품명, 규격, 수량, 필요 시기, 예산 코드 등을 명시한다.
        </p>

        <p class="mb-4">
          <strong>제5조 (구매 검토 및 승인)</strong><br />
          구매 요청은 예산 범위 내에서 집행되어야 하며, 예산 외 구매 시 대표이사
          승인을 받아야 한다.<br />
          구매 금액에 따른 승인 권한은 아래와 같다.
        </p>

        <ul class="mb-4 ml-4">
          <li>• 500만원 이하: 구매 담당 부서장 승인</li>
          <li>• 500만원 초과 ~ 3,000만원 이하: 본부장 승인</li>
          <li>• 3,000만원 초과: 대표이사 승인</li>
        </ul>

        <p class="mb-4">
          <strong>제6조 (업체 선정)</strong><br />
          동일 품목에 대해 2개 이상의 견적을 비교 검토해야 한다.<br />
          품질, 가격, 납기, A/S 조건 등을 종합적으로 고려하여 선정한다.<br />
          구매 요청 부서는 구매 필요 시 구매 요청서를 작성하여 부서장 승인을
          득해야 한다.<br />
          요청서에는 품명, 규격, 수량, 필요 시기, 예산 코드 등을 명시한다.
        </p>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="absolute bottom-0 left-0 right-0 bg-white button-container">
      <button
        class="w-full bg-primary-normal text-white font-semibold py-4 rounded-xl hover:bg-primary-strong transition-color text-base h-14"
      >
        상세보기
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
// 파일 타입별 아이콘 import
import documentIcon from "@/assets/icons/document-icon.svg"; //임시 변경예정
import pdfIcon from "@/assets/icons/pdf-icon.svg";
import wordIcon from "@/assets/icons/word-icon.svg";
import excelIcon from "@/assets/icons/excel-icon.svg";

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  fileData: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(["close"]);

// 파일 타입별 아이콘 매핑 함수
const getFileTypeIcon = (fileType) => {
  const iconMap = {
    document: documentIcon,
    pdf: pdfIcon,
    word: wordIcon,
    excel: excelIcon,
  };
  return iconMap[fileType] || "@/assets/icons/document-icon.svg";
};
</script>

<style scoped>
/* 하단 버튼 컨테이너 */
.button-container {
  padding: 26px 34px;
}

/* 스크롤바 스타일링 */
div::-webkit-scrollbar {
  width: 4px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
