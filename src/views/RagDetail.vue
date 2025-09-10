<template>
  <div
    class="min-h-[calc(100vh-4rem)] bg-background-neutral pt-10 px-15"
    style="background-color: #f5f8fd"
  >
    <input
      ref="fileInput"
      type="file"
      multiple
      style="display: none"
      @change="handleFileSelect"
    />

    <!-- 페이지 헤더 -->
    <div class="flex justify-between px-8 py-4">
      <div>
        <div class="mb-2">
          <h1 class="text-2xl text-text-neutral font-semibold leading-loose">
            {{ ragStore.selectedRag.title }}
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
            @click="openFileDialog"
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
          <ModalOpenButton text="새로운 문서" @click="openCreateFolderModal" />
        </div>
      </div>
    </div>

    <!-- 파일 인풋 영역 -->
    <div
      class="relative"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- 드래그 오버레이 -->
      <div
        v-if="isDragOver"
        class="absolute inset-0 z-50 flex items-center justify-center bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-300 rounded-xl mx-8 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-70': isDragOver, 'opacity-0': !isDragOver }"
      >
        <div class="flex flex-col items-center gap-4 text-blue-600">
          <div
            class="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-lg font-semibold">파일을 여기에 드롭하세요</p>
            <!-- subtitle -->
            <!-- <p class="text-sm text-blue-500">
            </p> -->
          </div>
        </div>
      </div>

      <!-- 기존 테이블/빈 상태 영역 -->
      <div :class="{ 'pointer-events-none': isDragOver }">
        <AppTable
          v-if="ragStore.selectedRag.counts > 0"
          :table="table"
          container-class="min-h-[43rem]"
          :show-scroll-container="false"
          header-class=""
          :show-empty-state="counts === 0"
        />
        <!-- [임시] 빈 상태 표시 -->
        <div
          v-else
          class="bg-white rounded-xl overflow-hidden min-h-[43rem] justify-center flex items-center mx-8 transition-all duration-300 ease-in-out"
          :class="{ 'opacity-50': isDragOver }"
        >
          <div class="flex flex-col items-center gap-10">
            <!-- Rag Illustration -->
            <div class="w-50 h-50 flex items-center justify-center">
              <img
                src="@/assets/icons/document.svg"
                alt="Empty Rag State"
                class="w-50 h-50"
              />
            </div>

            <!-- Text Content -->
            <div class="flex flex-col items-center gap-3">
              <h3 class="text-lg font-medium text-neutral text-center">
                아직 문서가 없어요
              </h3>
              <p class="text-sm text-assistive text-center">
                파일을 끌어다 놓거나 상단 버튼을 눌러 문서를 업로드 해보세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
import { computed, ref, h, onMounted, watch } from "vue";
import SearchInput from "@/components/SearchInput.vue";
import { useRoute } from "vue-router";
import { useRagStore } from "@/stores/rag";
import {
  useVueTable,
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
const ragStore = useRagStore();
const counts = ref(0);

// 파일 입력 ref
const fileInput = ref(null);

// 드래그 앤 드롭 상태 관리
const isDragOver = ref(false);
let dragCounter = 0;

// 파일 업로드 관련 함수들
const openFileDialog = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    uploadFiles(files);
  }
  // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
  event.target.value = "";
};

const uploadFiles = (files) => {
  console.log("업로드할 파일들:", files);

  files.forEach((file) => {
    console.log(`파일명: ${file.name}, 크기: ${file.size}, 타입: ${file.type}`);

    // 파일 검증 (선택사항)
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      alert(`${file.name}은(는) 파일 크기가 너무 큽니다. (최대 10MB)`);
      return;
    }

    // 여기에 실제 파일 업로드 API 호출 로직을 추가하세요
    // 예: uploadFileToServer(file);
  });

  // 업로드 성공 후 UI 업데이트나 알림 등의 로직을 추가할 수 있습니다
};

// 드래그 앤 드롭 이벤트 핸들러
const handleDragEnter = (e) => {
  e.preventDefault();
  dragCounter++;
  if (dragCounter === 1) {
    isDragOver.value = true;
  }
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragLeave = (e) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    isDragOver.value = false;
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  dragCounter = 0;
  isDragOver.value = false;

  const files = Array.from(e.dataTransfer.files);
  if (files.length > 0) {
    uploadFiles(files);
  }
};

// 라우트 파라미터 변경 감지
const updateSelectedRag = (id) => {
  const selectedRag = ragStore.ragData.find((rag) => rag.id === parseInt(id));
  if (selectedRag) {
    ragStore.setSelectedRag(selectedRag);
  }
};

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
  if (route.params.id) {
    updateSelectedRag(route.params.id);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      updateSelectedRag(newId);
    }
  }
);

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
