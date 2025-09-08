<template>
  <div
    class="min-h-[calc(100vh-4rem)] bg-background-neutral pt-10 px-15"
    style="background-color: #f5f8fd"
  >
    <!-- 페이지 헤더 -->
    <div class="flex justify-between px-8 py-4">
      <div>
        <div class="mb-2">
          <h1 class="text-2xl text-text-neutral font-semibold leading-loose">
            업무 관련 문서
          </h1>
        </div>
      </div>

      <!-- 검색바와 버튼 그룹 -->
      <div class="flex items-center gap-6">
        <!-- 검색바 -->
        <SearchInput
          v-model="search"
          placeholder="문서나 파일을 검색해보세요."
        />

        <!-- 버튼 그룹 -->
        <div class="flex items-center gap-1.5">
          <!-- 업로드 버튼 -->
          <button
            class="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            style="border-color: #efefef"
          >
            <div class="flex items-center justify-center w-5 h-5">
              <img src="@/assets/icons/upload-icon.svg" alt="업로드" class="" />
            </div>
          </button>

          <!-- 박스정보 버튼 -->
          <button
            class="flex items-center justify-center gap-1 h-10 px-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            style="border-color: #efefef; padding: 10px 16px 10px 12px"
          >
            <div class="flex items-center justify-center w-6 h-6">
              <img
                src="@/assets/icons/mailbox-icon.svg"
                alt="박스정보"
                class="w-4 h-3"
                style="width: 13.87px; height: 11.9px"
              />
            </div>
            <span class="text-sm font-semibold text-gray-700">박스정보</span>
          </button>

          <!-- 새로운 폴더 버튼 -->
          <button
            @click="openCreateFolderModal"
            class="flex items-center justify-center gap-1 h-10 px-3 text-white rounded-full hover:opacity-90 transition-opacity"
            style="background-color: #658aef; padding: 10px 16px 10px 12px"
          >
            <div class="flex items-center justify-center w-6 h-6">
              <img
                src="@/assets/icons/plus-icon.svg"
                alt="추가"
                class="w-3 h-3"
              />
            </div>
            <span class="text-sm font-semibold">새로운 폴더</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 테이블 컨테이너 -->
    <AppTable
      :table="table"
      container-class="min-h-[43rem]"
      :show-scroll-container="false"
      header-class=""
      :show-empty-state="counts === 0"
    />

    <!-- 파일 상세 패널 -->
    <FileDetailPanel
      :isVisible="isDetailPanelVisible"
      :fileData="selectedFileData"
      @close="closeDetailPanel"
    />

    <!-- 폴더 생성 모달 -->
    <CreateFolderModal
      :isOpen="isCreateFolderModalOpen"
      @close="closeCreateFolderModal"
      @create="handleCreateFolder"
    />
  </div>
</template>

<script setup>
import { computed, ref, h, onMounted } from "vue";
import SearchInput from "@/components/SearchInput.vue";
import { useRoute } from "vue-router";
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  createColumnHelper,
  getSortedRowModel,
} from "@tanstack/vue-table";
import ContextMenu from "@/components/ContextMenu.vue";
import FileDetailPanel from "@/components/FileDetailPanel.vue";
import CreateFolderModal from "@/components/CreateFolderModal.vue";
import AppTable from "@/components/AppTable.vue";

// 파일 타입별 아이콘 import
import documentIcon from "@/assets/icons/document-icon.svg"; //임시 변경예정
import pdfIcon from "@/assets/icons/pdf-icon.svg";
import wordIcon from "@/assets/icons/word-icon.svg";
import excelIcon from "@/assets/icons/excel-icon.svg";
import hwpIcon from "@/assets/icons/hwp-icon.svg";

const route = useRoute();
const counts = ref(0);

// Document ID from route params
const documentId = computed(() => route.params.id);

// 파일 타입별 아이콘 매핑 함수
const getFileTypeIcon = (fileType) => {
  const iconMap = {
    document: documentIcon,
    pdf: pdfIcon,
    word: wordIcon,
    excel: excelIcon,
    hwp: hwpIcon,
  };
  return iconMap[fileType] || pdfIcon; // 기본값으로 pdf 아이콘 사용
};

const handleFileNameClick = (fileData) => {
  selectedFileData.value = fileData;
  isDetailPanelVisible.value = true;
};

// 패널 상태 관리
const isDetailPanelVisible = ref(false);
const selectedFileData = ref(null);

const closeDetailPanel = () => {
  isDetailPanelVisible.value = false;
  selectedFileData.value = null;
};

// 폴더 생성 모달 상태 관리
const isCreateFolderModalOpen = ref(false);

const openCreateFolderModal = () => {
  isCreateFolderModalOpen.value = true;
};

const closeCreateFolderModal = () => {
  isCreateFolderModalOpen.value = false;
};

const handleCreateFolder = (folderName) => {
  console.log("새 폴더 생성:", folderName);
  // 여기에 폴더 생성 로직 추가
  // 예: API 호출, 데이터 업데이트 등
};

// 검색어 상태
const search = ref("");

// 샘플 데이터
const data = ref([
  {
    id: 1,
    name: "ISO 심사 규정 모음집",
    fileType: "document",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
    isFolder: true,
  },
  {
    id: 2,
    name: "하도급법 관련 규정 모음집",
    fileType: "document",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
    isFolder: true,
  },
  {
    id: 3,
    name: "구매업무 관련 문서.word",
    fileType: "word",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 4,
    name: "TEST 문서.pdf",
    fileType: "pdf",
    modifiedDate: "2025.08.10",
    modifiedBy: "최지은(Jieun Choi)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 5,
    name: "AI 솔루션팀 업무 분장표 (2025년).hwp",
    fileType: "hwp",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 6,
    name: "구매업무 관련 문서.word",
    fileType: "word",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 7,
    name: "구매업무 관련 문서.word",
    fileType: "word",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 8,
    name: "AI 솔루션팀 업무 분장표 (2025년).excel",
    fileType: "excel",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 9,
    name: "AI 솔루션팀 업무 분장표 (2025년).excel",
    fileType: "excel",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 10,
    name: "AI 솔루션팀 업무 분장표 (2025년).excel",
    fileType: "excel",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 11,
    name: "AI 솔루션팀 업무 분장표 (2025년).excel",
    fileType: "excel",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
]);

onMounted(() => {
  // sessionStorage에서 document 정보 가져오기
  const storedDocument = sessionStorage.getItem("selectedDocument");
  if (storedDocument) {
    const document = JSON.parse(storedDocument);
    counts.value = document.counts || 0;
  } else {
    // fallback: sessionStorage에 데이터가 없는 경우 기본값 설정
    counts.value = 0;
    console.warn("Document information not found in sessionStorage");
  }
});

// 컬럼 정의
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => "이름",
    size: 450,
    cell: (info) => {
      const row = info.row.original;
      return h("div", { class: "flex items-center justify-between gap-4" }, [
        h("div", { class: "flex items-center gap-4" }, [
          h("img", {
            src: getFileTypeIcon(row.fileType),
            alt: `${row.fileType} 파일`,
            class: "w-6 h-6",
          }),
          h(
            "span",
            {
              class:
                "text-gray-900 font-medium group-hover:text-blue-500 group-hover:underline group-hover:font-semibold cursor-pointer",
              onClick: () => handleFileNameClick(row),
            },
            info.getValue()
          ),
        ]),
        h(ContextMenu, {
          menuItems: [
            {
              label: "이름바꾸기",
              action: () => {
                console.log("이름바꾸기", info.row.original);
              },
              activeClass: "bg-neutral-50",
            },
            {
              label: "삭제",
              action: () => {
                console.log("삭제", info.row.original);
              },
              activeClass: "bg-blue-50",
            },
          ],
          buttonClass:
            "opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all",
          iconClass: "w-4 h-4",
          menuPosition: "left",
          onItemClick: (item) => {
            console.log("Table menu item clicked:", item.label);
          },
        }),
      ]);
    },
    enableSorting: true,
  }),
  columnHelper.accessor("modifiedDate", {
    header: () => "수정된 날짜",
    size: 200,
    cell: (info) =>
      h("span", { class: "text-gray-900 font-normal" }, info.getValue()),
    enableSorting: true,
  }),
  columnHelper.accessor("modifiedBy", {
    header: () => "수정한 사람",
    size: 240,
    cell: (info) =>
      h("span", { class: "text-gray-900 font-normal" }, info.getValue()),
    enableSorting: true,
  }),
  columnHelper.accessor("fileSize", {
    header: () => "파일 크기",
    size: 218,
    cell: (info) =>
      h("span", { class: "text-gray-600 font-normal" }, info.getValue()),
    enableSorting: false,
  }),
  columnHelper.accessor("sharing", {
    header: () => "공유",
    size: 218,
    cell: (info) => {
      return h("span", { class: "text-gray-900 font-normal" }, info.getValue());
    },
    enableSorting: false,
  }),
];

// 검색어에 따라 필터링된 데이터
const filteredData = computed(() => {
  if (!search.value.trim()) return data.value;
  const keyword = search.value.trim().toLowerCase();
  return data.value.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      (item.modifiedBy && item.modifiedBy.toLowerCase().includes(keyword))
  );
});

// 테이블 인스턴스 생성
const table = useVueTable({
  get data() {
    return filteredData.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  enableSorting: true,
});
</script>

<style scoped></style>
