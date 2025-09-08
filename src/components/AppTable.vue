<template>
  <div class="bg-white rounded-xl overflow-hidden min-h-[43rem]">
    <table v-if="data.length > 0" class="w-full">
      <!-- 테이블 헤더 -->
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="text-left border-b border-line-neutral px-4 py-4 text-sm font-semibold text-gray-600 bg-white relative"
            :style="{
              width: header.getSize() + 'px',
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
          class="group border-b border-line-neutral last:border-b-0 transition-colors duration-150 hover:bg-gray-50"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="text-sm"
            :class="getCellClass(cell.column.id)"
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
    <div v-else class="flex items-center justify-center min-h-[43rem]">
      <div class="flex flex-col items-center gap-10">
        <!-- Empty State Icon -->
        <div class="w-50 h-50 flex items-center justify-center">
          <img :src="emptyStateIcon" :alt="emptyStateAlt" class="w-50 h-50" />
        </div>

        <!-- Text Content -->
        <div class="flex flex-col items-center gap-3">
          <h3 class="text-lg font-medium text-neutral text-center">
            {{ emptyStateTitle }}
          </h3>
          <p class="text-sm text-assistive text-center">
            {{ emptyStateDescription }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";

// Props 정의
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  emptyStateIcon: {
    type: String,
    default: "@/assets/icons/document.svg",
  },
  emptyStateAlt: {
    type: String,
    default: "Empty State",
  },
  emptyStateTitle: {
    type: String,
    default: "데이터가 없습니다",
  },
  emptyStateDescription: {
    type: String,
    default: "표시할 데이터가 없습니다",
  },
  cellClassConfig: {
    type: Object,
    default: () => ({
      default: "px-4 py-4",
      name: "px-8 py-4",
    }),
  },
});

// Events 정의
const emit = defineEmits(["row-click", "cell-click"]);

// 셀 클래스 계산 (일반 테이블용)
const getCellClass = (columnId) => {
  return props.cellClassConfig[columnId] || props.cellClassConfig.default;
};

// 헤더 클래스 계산 (문장 테이블용)
const getHeaderClass = (columnId) => {
  return props.headerClassConfig[columnId] || props.headerClassConfig.default;
};

// 바디 셀 클래스 계산 (문장 테이블용)
const getBodyCellClass = (columnId) => {
  return (
    props.bodyCellClassConfig[columnId] || props.bodyCellClassConfig.default
  );
};

// 테이블 인스턴스 생성
const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  enableSorting: true,
});
</script>

<style scoped>
/* 테이블 관련 스타일은 여기에 추가 */
</style>
