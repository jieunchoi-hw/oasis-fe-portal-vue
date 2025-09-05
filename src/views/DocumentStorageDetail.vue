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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/vue-table";

const route = useRoute();

// Document ID from route params
const documentId = computed(() => route.params.id);

// 샘플 데이터
const data = ref([
  {
    id: 1,
    name: "문서1.pdf",
    type: "PDF",
    size: "2.1MB",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "문서2.docx",
    type: "Word",
    size: "1.5MB",
    date: "2024-01-16",
  },
]);

// 컬럼 정의
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: () => "파일명",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: () => "타입",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("size", {
    header: () => "크기",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: () => "수정일",
    cell: (info) => info.getValue(),
  }),
];

// 테이블 인스턴스 생성
const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<style scoped></style>
