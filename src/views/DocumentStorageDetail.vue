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
        <div class="relative">
          <input
            type="text"
            placeholder="문서나 파일을 검색해보세요."
            class="w-90 h-11 pl-12 pr-4 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            style="
              width: 360px;
              height: 44px;
              border-color: #efefef;
              padding: 7px 16px;
              padding-left: 48px;
              color: #a7acb6;
            "
          />
          <!-- 검색 아이콘 -->
          <div
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center"
          >
            <div class="relative w-5 h-5">
              <img
                src="@/assets/icons/search-icon.svg"
                alt="검색"
                class="absolute"
              />
            </div>
          </div>
        </div>

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
    <div class="mx-8 bg-white rounded-xl overflow-hidden">
      <table class="w-full">
        <!-- 테이블 헤더 -->
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="text-left border-b px-4 py-4 text-sm font-semibold text-gray-600 bg-white relative"
              :style="{
                width: header.getSize() + 'px',
                borderColor: '#EFEFEF',
              }"
            >
              <div class="flex items-center gap-3">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <!-- 정렬 아이콘 -->
                <div
                  v-if="header.column.getCanSort()"
                  class="cursor-pointer flex items-center ml-3"
                  @click="() => header.column.toggleSorting()"
                >
                  <img
                    v-if="header.column.getIsSorted() === 'asc'"
                    src="@/assets/icons/arrow-up.svg"
                    alt="정렬 오름차순"
                    class="w-3.5 h-3.5"
                  />
                  <img
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    src="@/assets/icons/arrow-down.svg"
                    alt="정렬 내림차순"
                    class="w-3.5 h-3.5"
                  />
                  <img
                    v-else
                    src="@/assets/icons/arrow-up-down.svg"
                    alt="정렬 가능"
                    class="w-3.5 h-3.5"
                  />
                </div>
              </div>
              <!-- 컬럼 구분선 -->
              <div
                v-if="!header.isLast"
                class="absolute right-0 top-4 bottom-4 w-px bg-gray-200"
                style="background-color: #efefef"
              ></div>
            </th>
          </tr>
        </thead>

        <!-- 테이블 바디 -->
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="group border-b last:border-b-0 transition-colors duration-150 hover:bg-gray-50"
            :style="{ borderColor: '#EFEFEF' }"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="text-sm"
              :class="{
                'px-4 py-4': cell.column.id !== 'name',
                'px-8 py-4': cell.column.id === 'name',
              }"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 파일 상세 패널 -->
    <FileDetailPanel
      :isVisible="isDetailPanelVisible"
      :fileData="selectedFileData"
      @close="closeDetailPanel"
    />
  </div>
</template>

<script setup>
import { computed, ref, h } from "vue";
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

// 파일 타입별 아이콘 import
import documentIcon from "@/assets/icons/document-icon.svg"; //임시 변경예정
import pdfIcon from "@/assets/icons/pdf-icon.svg";
import wordIcon from "@/assets/icons/word-icon.svg";
import excelIcon from "@/assets/icons/excel-icon.svg";

const route = useRoute();

// Document ID from route params
const documentId = computed(() => route.params.id);

// 파일 타입별 아이콘 매핑 함수
const getFileTypeIcon = (fileType) => {
  const iconMap = {
    document: documentIcon,
    pdf: pdfIcon,
    word: wordIcon,
    excel: excelIcon,
  };
  return iconMap[fileType] || pdfIcon; // 기본값으로 pdf 아이콘 사용
};

const handleFileNameClick = (fileData) => {
  console.log("파일 클릭됨:", fileData);
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

// 컬럼 정의
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => "이름",
    size: 400,
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
    size: 240,
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
</script>

<style scoped></style>
