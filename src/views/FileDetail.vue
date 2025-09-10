<template>
  <div
    class="min-h-[calc(100vh-4rem)] pt-10 px-15"
    style="background-color: #f5f8fd"
  >
    <div class="flex justify-between px-8 py-4">
      <div>
        <div class="mb-2">
          <Breadcrumb :file-data="fileData" :parent-folders="parentFolders" />
        </div>
      </div>

      <!-- 검색바와 버튼 그룹 -->
      <div class="flex items-center gap-6">
        <!-- 버튼 그룹 -->
        <div class="flex items-center gap-1.5">
          <!-- 새로운 문장 버튼 -->
          <!-- 새로운 박스 버튼 -->
          <ModalOpenButton text="새로운 문장" />
        </div>
      </div>
    </div>

    <!-- 테이블 컨테이너 -->
    <AppTable
      :table="table"
      :clickable-columns="['content']"
      container-class="min-h-[40rem]"
      @cell-click="handleTableCellClick"
    />

    <!-- 버튼 그룹 -->
    <div class="flex justify-center gap-2 mt-6 mb-8">
      <BaseButton
        class="flex-1 max-w-[211px] !bg-background-neutral"
        text="취소"
        :primary="false"
        :shadow="false"
        size="default"
      />
      <BaseButton
        class="flex-1 max-w-[211px]"
        text="적용하기"
        :primary="true"
        :shadow="true"
        size="default"
      />
    </div>
  </div>

  <!-- 문장 상세 패널 -->
  <SentenceDetailPanel
    :isVisible="isSentenceDetailPanelVisible"
    :sentenceData="selectedSentence"
    @close="closeSentenceDetailPanel"
    @save="handleSentenceSave"
    @delete="handleSentenceDelete"
  />
</template>
<script setup>
import { ref, h } from "vue";
// import { useRoute } from "vue-router";
import Breadcrumb from "@/components/Breadcrumb.vue";
import SentenceDetailPanel from "@/components/SentenceDetailPanel.vue";
import BaseButton from "@/components/BaseButton.vue";
import AppTable from "@/components/AppTable.vue";

import {
  useVueTable,
  getCoreRowModel,
  createColumnHelper,
  getSortedRowModel,
} from "@tanstack/vue-table";

// const route = useRoute();

// 패널 상태
const isSentenceDetailPanelVisible = ref(false);
const selectedSentence = ref(null);

// 예시 데이터
const fileData = ref({
  name: "구매 업무 관련 문서",
  type: "folder",
});

const parentFolders = ref(["업무 관련 문서"]);

// 테이블 데이터
const data = ref([
  {
    id: 1,
    number: 1,
    status: "삭제",
    statusType: "delete",
    content:
      "이 규정은 회사의 구매 활동에 관한 기준과 절차를 정하여 비용 절감, 품질 확보, 투명한 거래질서를 확립함을 목적으로 한다. 이 규정은 회사의 구매 활동에 관한 기준과 절차를 정하여 비용 절감, 품질 확보, 투명한 거래질서를 확립함을 목적으로 한다.",
  },
  {
    id: 2,
    number: 2,
    status: "수정",
    statusType: "modified",
    content:
      "이 규정은 회사의 모든 부서가 수행하는 자재, 용역, 서비스 및 기타 구매 행위에 적용한다. 이 규정은 회사의 모든 부서가 수행하는 자재, 용역, 서비스 및 기타 구매 행위에 적용한다.",
  },
  {
    id: 3,
    number: 3,
    status: "수정",
    statusType: "modified",
    content:
      "구매라 함은 회사 운영에 필요한 물품, 서비스, 자산 등을 외부에서 조달하는 행위를 말한다. 구매라 함은 회사 운영에 필요한 물품, 서비스, 자산 등을 외부에서 조달하는 행위를 말한다. 구매라 함은 회사 운영에 필요한 물품, 서비스, 자산 등을 외부에서 조달하는 행위를 말한다.",
  },
  {
    id: 4,
    number: 4,
    status: "변경없음",
    statusType: "unchanged",
    content:
      "구매 요청 부서라 함은 구매 필요성을 제기하고 승인 절차를 진행하는 부서를 말한다. 구매 요청 부서라 함은 구매 필요성을 제기하고 승인 절차를 진행하는 부서를 말한다.",
  },
  {
    id: 5,
    number: 5,
    status: "변경없음",
    statusType: "unchanged",
    content:
      "구매 담당 부서라 함은 구매 절차를 수행하고 공급업체와 계약을 체결하는 부서를 말한다. 구매 담당 부서라 함은 구매 절차를 수행하고 공급업체와 계약을 체결하는 부서를 말한다.",
  },
  {
    id: 6,
    number: 6,
    status: "변경없음",
    statusType: "unchanged",
    content:
      "구매 요청 부서는 구매 필요 시 구매 요청서를 작성하여 부서장 승인을 득해야 한다. 구매 요청 부서는 구매 필요 시 구매 요청서를 작성하여 부서장 승인을 득해야 한다. 구매 요청 부서는 구매 필요 시 구매 요청서를 작성하여 부서장 승인을 득해야 한다.",
  },
  {
    id: 7,
    number: 7,
    status: "변경없음",
    statusType: "unchanged",
    content:
      "요청서에는 품명, 규격, 수량, 필요 시기, 예산 코드 등을 명시한다. 요청서에는 품명, 규격, 수량, 필요 시기, 예산 코드 등을 명시한다. 요청서에는 품명, 규격, 수량, 필요 시기, 예산 코드 등을 명시한다.",
  },
  {
    id: 8,
    number: 8,
    status: "수정",
    statusType: "modified",
    content:
      "구매 금액에 따른 승인 권한은 아래와 같다. 500만원 이하: 구매 담당 부서장 승인 500만원 초과 ~ 3,000만원 이하: 본부장 승인 3,000만원 초과: 대표이사 승인",
  },
  {
    id: 9,
    number: 9,
    status: "수정",
    statusType: "modified",
    content:
      "모든 구매 활동은 전자시스템에 기록·보관하여야 한다. 모든 구매 활동은 전자시스템에 기록·보관하여야 한다. 모든 구매 활동은 전자시스템에 기록·보관하여야 한다. 모든 구매 활동은 전자시스템에 기록·보관하여야 한다.",
  },
  {
    id: 10,
    number: 10,
    status: "수정",
    statusType: "modified",
    content:
      "구매 담당자는 본인의 이해관계가 있는 업체와 거래할 수 없다. 위반 시 징계 및 손해배상 책임을 진다. 구매 담당자는 본인의 이해관계가 있는 업체와 거래할 수 없다. 위반 시 징계 및 손해배상 책임을 진다.",
  },
  {
    id: 11,
    number: 11,
    status: "수정",
    statusType: "modified",
    content:
      "구매 담당자는 본인의 이해관계가 있는 업체와 거래할 수 없다. 위반 시 징계 및 손해배상 책임을 진다. 구매 담당자는 본인의 이해관계가 있는 업체와 거래할 수 없다. 위반 시 징계 및 손해배상 책임을 진다.",
  },
  {
    id: 12,
    number: 12,
    status: "수정",
    statusType: "modified",
    content:
      "구매 담당자는 본인의 이해관계가 있는 업체와 거래할 수 없다. 위반 시 징계 및 손해배상 책임을 진다. 구매 담당자는 본인의 이해관계가 있는 업체와 거래할 수 없다. 위반 시 징계 및 손해배상 책임을 진다.",
  },
]);

// 상태 배지 컴포넌트 생성 함수
const createStatusBadge = (status, statusType) => {
  const badgeClasses = {
    delete: "bg-red-50 text-red-600",
    modified: "bg-blue-50 text-blue-600",
    unchanged: "text-gray-500",
  };

  if (statusType === "unchanged") {
    return h(
      "span",
      {
        class: `inline-block text-xs font-medium ${badgeClasses[statusType]}`,
      },
      status
    );
  }

  return h(
    "span",
    {
      class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${badgeClasses[statusType]}`,
    },
    status
  );
};

// 컬럼 정의
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("number", {
    header: () => "번호",
    size: 80,
    cell: (info) =>
      h("span", { class: "text-gray-900 font-normal" }, info.getValue()),
    enableSorting: false,
  }),
  columnHelper.accessor("status", {
    header: () => "상태",
    size: 80,
    cell: (info) => {
      const row = info.row.original;
      return createStatusBadge(info.getValue(), row.statusType);
    },
    enableSorting: false,
  }),
  columnHelper.accessor("content", {
    header: () => "내용",
    size: 1168,
    cell: (info) =>
      h(
        "div",
        {
          class:
            "text-gray-900 font-normal text-sm leading-5 line-clamp-1 transition-colors leading-tight",
        },
        info.getValue()
      ),
    enableSorting: false,
  }),
];

// 테이블 인스턴스 생성
const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  enableSorting: true,
});

// 패널 관련 함수들
const openSentenceDetailPanel = (sentenceData = null) => {
  selectedSentence.value = sentenceData;
  isSentenceDetailPanelVisible.value = true;
};

const closeSentenceDetailPanel = () => {
  isSentenceDetailPanelVisible.value = false;
  selectedSentence.value = null;
};

const handleSentenceSave = (_data) => {
  // console.log("문장 저장:", data);
  closeSentenceDetailPanel();
};

const handleSentenceDelete = () => {
  // console.log("문장 삭제");
  closeSentenceDetailPanel();
};

// 테이블 셀 클릭 핸들러
const handleTableCellClick = (event) => {
  if (event.columnId === "content") {
    openSentenceDetailPanel(event.row);
  }
};
</script>
