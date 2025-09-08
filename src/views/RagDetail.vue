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

    <div v-if="counts > 0" class="mx-8">
      <AppTable
        :data="filteredData"
        :columns="tableColumns"
        :empty-state-icon="documentEmptyIcon"
        empty-state-alt="Empty Document State"
        empty-state-title="검색된 문서가 없어요"
        empty-state-description="입력한 키워드를 다시 한 번 확인해보세요"
        :cell-class-config="cellClassConfig"
        @row-click="handleRowClick"
        @cell-click="handleCellClick"
      />
    </div>

    <div
      v-else
      class="bg-white rounded-xl overflow-hidden min-h-[43rem] justify-center flex items-center mx-8"
    >
      <div class="flex flex-col items-center gap-10">
        <!-- Document Illustration -->
        <div class="w-50 h-50 flex items-center justify-center">
          <img
            src="@/assets/icons/document.svg"
            alt="Empty Document State"
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
import { computed, ref, onMounted } from "vue";
import SearchInput from "@/components/SearchInput.vue";
import FileDetailPanel from "@/components/FileDetailPanel.vue";
import CreateFolderModal from "@/components/CreateFolderModal.vue";
import { useRoute } from "vue-router";
import { useTableColumns } from "@/composables/useTableColumns.js";
import documentEmptyIcon from "@/assets/icons/document.svg";

const route = useRoute();
const counts = ref(0);

// Document ID from route params
const documentId = computed(() => route.params.id);

// 테이블 컬럼 설정
const { createDocumentTableColumns } = useTableColumns();

// 파일 이름 클릭 핸들러
const handleFileNameClick = (fileData) => {
  console.log("파일 클릭됨:", fileData);
  selectedFileData.value = fileData;
  isDetailPanelVisible.value = true;
};

// 컨텍스트 메뉴 클릭 핸들러
const handleContextMenuClick = (action, fileData) => {
  console.log(`${action} 클릭됨:`, fileData);
  // 각 액션별 로직 처리
  switch (action) {
    case "rename":
      // 이름 변경 로직
      break;
    case "delete":
      // 삭제 로직
      break;
    default:
      break;
  }
};

// 테이블 컬럼 생성
const tableColumns = createDocumentTableColumns({
  onFileNameClick: handleFileNameClick,
  onContextMenuClick: handleContextMenuClick,
});

// 셀 클래스 설정
const cellClassConfig = {
  default: "px-4 py-4",
  name: "px-8 py-4",
};

// 테이블 이벤트 핸들러
const handleRowClick = (rowData) => {
  console.log("Row clicked:", rowData);
};

const handleCellClick = (cellData) => {
  console.log("Cell clicked:", cellData);
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
    name: "AI 솔루션팀 업무 분장표 (2025년).excel",
    fileType: "excel",
    modifiedDate: "2025.08.10",
    modifiedBy: "김종성(Jongsung Kim)",
    fileSize: "0개 항목",
    sharing: "비공개",
  },
  {
    id: 5,
    name: "AI 솔루션팀 업무 분장표 (2025년).excel",
    fileType: "excel",
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
</script>

<style scoped></style>
