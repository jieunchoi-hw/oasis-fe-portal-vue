<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Back Navigation -->
        <div class="mb-6">
          <button
            @click="goBack"
            class="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            문서 저장소로 돌아가기
          </button>
        </div>

        <!-- Document Detail Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <!-- Document Header -->
          <div class="p-8 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-4">
                  <img
                    src="@/assets/icons/document-icon.svg"
                    alt="문서"
                    class="w-12 h-12 mr-4"
                  />
                  <div>
                    <h1
                      class="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                      {{ documentTitle }}
                    </h1>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      문서 ID: {{ documentId }}
                    </div>
                  </div>
                </div>

                <div
                  class="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div>
                    <span class="font-medium">작성자:</span>
                    {{ documentAuthor }}
                  </div>
                  <div>
                    <span class="font-medium">생성일:</span> {{ documentDate }}
                  </div>
                  <div>
                    <span class="font-medium">수정일:</span>
                    {{ documentModifiedDate }}
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center space-x-2 ml-4">
                <button
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  @click="handleEdit"
                >
                  수정
                </button>
                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  @click="handleShare"
                >
                  공유
                </button>
              </div>
            </div>
          </div>

          <!-- Document Content -->
          <div class="p-8">
            <div class="space-y-6">
              <!-- Description Section -->
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                >
                  문서 설명
                </h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ documentDescription }}
                </p>
              </div>

              <!-- Tags Section -->
              <div v-if="documentTags && documentTags.length > 0">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                >
                  태그
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in documentTags"
                    :key="tag"
                    class="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- File Information -->
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                >
                  파일 정보
                </h3>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="font-medium text-gray-700 dark:text-gray-300"
                        >파일 크기:</span
                      >
                      <span class="text-gray-600 dark:text-gray-400 ml-2">{{
                        documentSize
                      }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700 dark:text-gray-300"
                        >파일 형식:</span
                      >
                      <span class="text-gray-600 dark:text-gray-400 ml-2">{{
                        documentType
                      }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700 dark:text-gray-300"
                        >접근 권한:</span
                      >
                      <span class="text-gray-600 dark:text-gray-400 ml-2">{{
                        documentPermission
                      }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-700 dark:text-gray-300"
                        >상태:</span
                      >
                      <span class="text-gray-600 dark:text-gray-400 ml-2">{{
                        documentStatus
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Download/View Section -->
              <div>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white mb-3"
                >
                  작업
                </h3>
                <div class="flex flex-wrap gap-3">
                  <button
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    @click="handleDownload"
                  >
                    다운로드
                  </button>
                  <button
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    @click="handlePreview"
                  >
                    미리보기
                  </button>
                  <button
                    class="px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    @click="handleDelete"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Document ID from route params
const documentId = computed(() => route.params.id);

// Mock document data - 실제 구현 시 API에서 데이터를 가져와야 함
const documentData = ref({
  id: "",
  title: "",
  description: "",
  author: "",
  date: "",
  modifiedDate: "",
  tags: [],
  size: "",
  type: "",
  permission: "",
  status: "",
});

// Computed properties for document data
const documentTitle = computed(
  () => documentData.value.title || `문서 ${documentId.value}`
);
const documentDescription = computed(
  () => documentData.value.description || "이 문서에 대한 설명이 없습니다."
);
const documentAuthor = computed(
  () => documentData.value.author || "알 수 없음"
);
const documentDate = computed(() => documentData.value.date || "2024-01-01");
const documentModifiedDate = computed(
  () => documentData.value.modifiedDate || "2024-01-01"
);
const documentTags = computed(
  () => documentData.value.tags || ["문서", "저장소"]
);
const documentSize = computed(() => documentData.value.size || "1.2 MB");
const documentType = computed(() => documentData.value.type || "PDF");
const documentPermission = computed(
  () => documentData.value.permission || "읽기/쓰기"
);
const documentStatus = computed(() => documentData.value.status || "활성");

// Methods
const goBack = () => {
  router.push("/document-storage");
};

const handleEdit = () => {
  console.log("문서 수정:", documentId.value);
  // 실제 구현 시 문서 수정 로직 추가
};

const handleShare = () => {
  console.log("문서 공유:", documentId.value);
  // 실제 구현 시 문서 공유 로직 추가
};

const handleDownload = () => {
  console.log("문서 다운로드:", documentId.value);
  // 실제 구현 시 문서 다운로드 로직 추가
};

const handlePreview = () => {
  console.log("문서 미리보기:", documentId.value);
  // 실제 구현 시 문서 미리보기 로직 추가
};

const handleDelete = () => {
  console.log("문서 삭제:", documentId.value);
  // 실제 구현 시 문서 삭제 로직 추가
};

// Load document data on component mount
onMounted(() => {
  console.log("문서 상세보기 로드됨. 문서 ID:", documentId.value);
  // 실제 구현 시 API 호출로 문서 데이터 로드
  // loadDocumentData(documentId.value);
});

// Mock function to simulate loading document data
const loadDocumentData = (id) => {
  // 실제 구현 시 API 호출
  documentData.value = {
    id: id,
    title: `샘플 문서 ${id}`,
    description:
      "이것은 샘플 문서입니다. 실제 구현 시 API에서 데이터를 가져와야 합니다.",
    author: "홍길동",
    date: "2024-01-15",
    modifiedDate: "2024-01-20",
    tags: ["샘플", "문서", "테스트"],
    size: "2.5 MB",
    type: "PDF",
    permission: "읽기/쓰기",
    status: "활성",
  };
};
</script>
