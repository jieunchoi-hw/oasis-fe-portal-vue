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
            <span class="text-sm font-semibold">새로운 문장</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 페이지 헤더 -->
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "@/components/Breadcrumb.vue";

const route = useRoute();

// 예시 데이터
const fileData = ref({
  name: "구매 업무 관련 문서",
  type: "folder",
});

const parentFolders = ref(["업무 관련 문서"]);
</script>
