<template>
  <div class="mx-8 bg-white rounded-xl overflow-hidden" :class="containerClass">
    <!-- 테이블 스크롤 컨테이너: 헤더 고정, 바디 스크롤 -->
    <div
      v-if="showScrollContainer"
      class="table-scroll-container max-h-[42rem] overflow-auto"
    >
      <table class="w-full">
        <!-- 테이블 헤더 -->
        <thead
          :class="[headerClass, 'sticky top-0 z-10']"
          style="position: sticky; top: 0; z-index: 10; background: white"
        >
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="getHeaderCellClass(header)"
              :style="{
                width: header.getSize() + 'px',
                borderColor: '#EFEFEF',
              }"
            >
              <!-- 번호 컬럼은 중앙 정렬로 단순하게 표시 -->
              <div
                v-if="header.column.id === 'number'"
                class="flex justify-center"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </div>
              <!-- 다른 컬럼들은 기존 레이아웃 유지 -->
              <div v-else class="flex items-center gap-3">
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
            :class="getRowClass(row)"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="getCellClass(cell)"
              @click="handleCellClick(cell, row)"
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

    <!-- 스크롤 컨테이너가 없는 경우 -->
    <table v-else class="w-full">
      <!-- 테이블 헤더 -->
      <thead
        :class="[headerClass, 'sticky top-0 z-10']"
        style="position: sticky; top: 0; z-index: 10; background: white"
      >
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :class="getHeaderCellClass(header)"
            :style="{
              width: header.getSize() + 'px',
              borderColor: '#EFEFEF',
            }"
          >
            <!-- 번호 컬럼은 중앙 정렬로 단순하게 표시 -->
            <div
              v-if="header.column.id === 'number'"
              class="flex justify-center"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </div>
            <!-- 다른 컬럼들은 기존 레이아웃 유지 -->
            <div v-else class="flex items-center gap-3">
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
                  class="w-3 h-2"
                />
                <img
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  src="@/assets/icons/arrow-down.svg"
                  alt="정렬 내림차순"
                  class="w-3 h-2"
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
          :class="getRowClass(row)"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :class="getCellClass(cell)"
            @click="handleCellClick(cell, row)"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Empty State -->
    <div
      v-if="showEmptyState && table.getRowModel().rows.length === 0"
      class="bg-white rounded-xl overflow-hidden min-h-[43rem] justify-center flex items-center mx-8"
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
            {{ emptyStateTitle || "검색된 데이터가 없어요" }}
          </h3>
          <p class="text-sm text-assistive text-center">
            {{
              emptyStateDescription ||
              "검색어를 확인하거나 상단 버튼을 눌러 문서를 업로드 해보세요"
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { computed } from "vue";
import { FlexRender } from "@tanstack/vue-table";

const props = defineProps({
  table: {
    type: Object,
    required: true,
  },
  containerClass: {
    type: String,
    default: "max-h-[42rem] flex flex-col",
  },
  showScrollContainer: {
    type: Boolean,
    default: true,
  },
  headerClass: {
    type: String,
    default: "sticky top-0 bg-white z-10",
  },
  showEmptyState: {
    type: Boolean,
    default: false,
  },
  emptyStateTitle: {
    type: String,
    default: "",
  },
  emptyStateDescription: {
    type: String,
    default: "",
  },
  // 셀 클릭 이벤트를 위한 설정
  clickableColumns: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["cellClick"]);

// 헤더 셀 클래스 계산
const getHeaderCellClass = (header) => {
  const baseClass =
    "border-b px-4 py-4 text-sm font-semibold text-gray-600 bg-white relative";
  const alignmentClass =
    header.column.id === "number" ? "text-center" : "text-left";
  return [baseClass, alignmentClass];
};

// 행 클래스 계산
const getRowClass = (_row) => {
  return "group border-b border-line-neutral last:border-b-0 transition-colors duration-150 hover:bg-gray-50";
};

// 셀 클래스 계산
const getCellClass = (cell) => {
  const baseClass = "text-sm";
  const alignmentClass = cell.column.id === "number" ? "text-center" : "";
  const clickableClass = props.clickableColumns.includes(cell.column.id)
    ? "cursor-pointer group-hover:underline"
    : "";

  // RagDetail의 특별한 패딩 처리
  const paddingClass = cell.column.id === "name" ? "px-8 py-4" : "px-4 py-4";

  return [baseClass, alignmentClass, clickableClass, paddingClass];
};

// 셀 클릭 핸들러
const handleCellClick = (cell, row) => {
  if (props.clickableColumns.includes(cell.column.id)) {
    emit("cellClick", {
      cell,
      row: row.original,
      columnId: cell.column.id,
    });
  }
};
</script>
