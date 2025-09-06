<template>
  <Transition
    name="slide-panel"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <!-- 백드롭 오버레이 -->
    <div
      v-if="isVisible"
      class="fixed inset-0 z-40 backdrop-blur-[2px] bg-black/50"
      @click="$emit('close')"
    ></div>
  </Transition>

  <Transition
    name="panel"
    enter-active-class="duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="isVisible"
      class="fixed right-0 top-0 bg-white z-50 transform transition-transform border-l h-screen border-gray-200 flex flex-col"
      :style="{ width: panelWidth + 'px' }"
    >
      <!-- 드래그 핸들 -->
      <div
        class="absolute left-0 top-0 w-3 h-full cursor-col-resize flex items-center justify-center group transition-colors z-10 px-2 bg-gray-100"
        @mousedown="startResize"
      >
        <div
          class="flex items-center justify-center gap-0.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <div class="w-1 h-12 rounded-full bg-zinc-300"></div>
          <div class="w-1 h-12 rounded-full bg-zinc-300"></div>
        </div>
      </div>
      <!-- 헤더 -->
      <div
        class="flex justify-between items-center border-b border-gray-200 px-8 py-4 h-[68px] flex-shrink-0"
      >
        <div class="flex items-center gap-3">
          <img :src="getFileIcon()" alt="파일 아이콘" class="rounded w-6 h-6" />
          <span class="text-gray-900 font-medium text-sm leading-5">
            구매업무 관련 문서.docx
          </span>
        </div>
        <button
          @click="$emit('close')"
          class="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
        >
          <img
            src="@/assets/icons/close-modal-icon.svg"
            alt="닫기"
            class="w-3 h-3"
          />
        </button>
      </div>

      <!-- 스크롤 가능한 콘텐츠 영역 -->
      <div class="flex-1 overflow-y-auto min-h-0">
        <!-- 제목 -->
        <div class="px-10 pt-8 pb-4">
          <h2 class="text-gray-900 font-semibold text-sm leading-5">
            {{
              sentenceData
                ? `[${sentenceData.number}번] 문장 내용`
                : "[새로운] 문장 내용"
            }}
          </h2>
        </div>

        <!-- 메인 콘텐츠 영역 -->
        <div class="flex px-9 gap-2.5 flex-1">
          <!-- 왼쪽 텍스트 영역 -->
          <div
            class="bg-white border border-gray-300 rounded-xl p-5 overflow-y-auto min-h-[300px]"
            :style="{ width: panelWidth - 72 + 'px' }"
          >
            <div class="text-gray-900 text-sm font-medium leading-tight">
              <p class="mb-6">
                <strong>구매 관리 규정</strong>
              </p>

              <p class="mb-6">
                <strong>제1장 총칙</strong>
              </p>

              <p class="mb-4">
                <strong>제1조 (목적)</strong><br />
                이 규정은 회사의 구매 활동에 관한 기준과 절차를 정하여 비용
                절감, 품질 확보, 투명한 거래질서를 확립함을 목적으로 한다.
              </p>

              <p class="mb-4">
                <strong>제2조 (적용 범위)</strong><br />
                이 규정은 회사의 모든 부서가 수행하는 자재, 용역, 서비스 및 기타
                구매 행위에 적용한다.
              </p>

              <p class="mb-6">
                <strong>제3조 (용어 정의)</strong><br />
                구매라 함은 회사 운영에 필요한 물품, 서비스, 자산 등을 외부에서
                조달하는 행위를 말한다.<br />
                구매 요청 부서라 함은 구매 필요성을 제기하고 승인 절차를
                진행하는 부서를 말한다.<br />
                구매 담당 부서라 함은 구매 절차를 수행하고 공급업체와 계약을
                체결하는 부서를 말한다.
              </p>

              <p class="mb-6">
                <strong>제2장 구매 절차</strong>
              </p>

              <p class="mb-4">
                <strong>제4조 (구매 요청)</strong><br />
                구매 요청 부서는 구매 필요 시 구매 요청서를 작성하여 부서장
                승인을 득해야 한다.<br />
                요청서에는 품명, 규격, 수량, 필요 시기, 예산 코드 등을 명시한다.
              </p>

              <p class="mb-4">
                <strong>제5조 (구매 검토 및 승인)</strong><br />
                구매 요청은 예산 범위 내에서 집행되어야 하며, 예산 외 구매 시
                대표이사 승인을 받아야 한다.<br />
                구매 금액에 따른 승인 권한은 아래와 같다.<br />
                500만원 이하: 구매 담당 부서장 승인<br />
                500만원 초과 ~ 3,000만원 이하: 본부장 승인<br />
                3,000만원 초과: 대표이사 승인
              </p>

              <p class="mb-4">
                <strong>제6조 (업체 선정)</strong><br />
                동일 품목에 대해 2개 이상의 견적을 비교 검토해야 한다.<br />
                품질, 가격, 납기, A/S 조건 등을 종합적으로 고려하여 선정한다.
              </p>
            </div>
          </div>
        </div>

        <!-- 링크 섹션 -->
        <div class="px-9 pb-2 pt-8">
          <div class="flex flex-col gap-2">
            <!-- 링크 추가 라벨 -->
            <div class="px-1">
              <span class="text-gray-700 font-medium text-sm leading-5">
                링크 추가 (답변 시, 참조 링크로 제공돼요)
              </span>
            </div>

            <!-- 링크 입력 필드들 -->
            <div
              v-for="(link, index) in links"
              :key="index"
              class="flex items-center gap-2"
            >
              <!-- 링크 제목 입력 -->
              <div
                class="flex items-center border border-gray-300 rounded-lg px-3 h-12"
                :style="{
                  width: Math.min(280, (panelWidth - 100) * 0.35) + 'px',
                }"
              >
                <input
                  v-model="link.title"
                  type="text"
                  :placeholder="link.title || '링크 명을 입력해주세요.'"
                  class="w-full text-sm font-normal leading-5 outline-none"
                  :class="link.title ? 'text-gray-900' : 'text-gray-400'"
                />
              </div>

              <!-- 링크 URL 입력 -->
              <div
                class="flex items-center border border-gray-300 rounded-lg px-3 flex-1 h-12"
              >
                <input
                  v-model="link.url"
                  type="text"
                  :placeholder="link.url || '링크를 입력해주세요.'"
                  class="w-full text-sm font-normal leading-5 outline-none"
                  :class="link.url ? 'text-gray-900' : 'text-gray-400'"
                />
              </div>

              <!-- 삭제 버튼 -->
              <button
                @click="removeLink(index)"
                class="flex items-center justify-center w-5 h-5 hover:opacity-70 transition-opacity"
              >
                <div
                  class="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center relative"
                >
                  <div
                    class="absolute w-2 h-0.5 bg-white rounded-full transform rotate-45"
                  ></div>
                  <div
                    class="absolute w-2 h-0.5 bg-white rounded-full transform -rotate-45"
                  ></div>
                </div>
              </button>
            </div>

            <!-- 링크 추가 버튼 -->
            <button
              @click="addLink"
              class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <img
                src="@/assets/icons/plus-button-icon.svg"
                alt="추가"
                class="w-3 h-3"
              />
              추가
            </button>
          </div>
        </div>

        <!-- 스크롤 가능한 콘텐츠 영역 종료 -->
      </div>

      <!-- 하단 버튼 -->
      <div
        class="bg-white flex gap-2 px-8 pt-6 pb-11 border-t border-gray-200 flex-shrink-0"
      >
        <BaseButton
          @click="handleDelete"
          text="문장 삭제"
          :primary="false"
          :shadow="false"
        />
        <BaseButton @click="handleSave" text="저장하기" :primary="true" />
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import documentIcon from "@/assets/icons/document-icon.svg";

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  sentenceData: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(["close", "save", "delete"]);

// 패널 너비 관련 상태
const panelWidth = ref(800); // 기본 너비
const minWidth = 800; // 최소 너비
const isResizing = ref(false);
const startX = ref(0);
const startWidth = ref(0);

// 링크 데이터
const links = ref([
  { title: "복지 포인트 안내", url: "http://chatcI-elmas-labs.app.prd.honec" },
  { title: "", url: "" },
]);

// 리사이징 시작
const startResize = (e) => {
  isResizing.value = true;
  startX.value = e.clientX;
  startWidth.value = panelWidth.value;
  document.addEventListener("mousemove", doResize);
  document.addEventListener("mouseup", stopResize);
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
};

// 리사이징 중
const doResize = (e) => {
  if (!isResizing.value) return;

  const deltaX = startX.value - e.clientX; // 마우스가 왼쪽으로 이동하면 패널이 커짐
  const newWidth = startWidth.value + deltaX;

  // 최소 너비 제한
  panelWidth.value = Math.max(minWidth, newWidth);
};

// 리사이징 종료
const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener("mousemove", doResize);
  document.removeEventListener("mouseup", stopResize);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
};

// 컴포넌트 마운트/언마운트 시 이벤트 리스너 정리
onMounted(() => {
  // 이미 startResize에서 추가하므로 여기서는 필요 없음
});

onUnmounted(() => {
  document.removeEventListener("mousemove", doResize);
  document.removeEventListener("mouseup", stopResize);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

// 파일 아이콘 함수
const getFileIcon = () => {
  return documentIcon;
};

// 링크 추가 함수
const addLink = () => {
  links.value.push({ title: "", url: "" });
};

// 링크 제거 함수
const removeLink = (index) => {
  if (links.value.length > 1) {
    links.value.splice(index, 1);
  }
};

// 문장 삭제 핸들러
const handleDelete = () => {
  emit("delete");
};

// 저장하기 핸들러
const handleSave = () => {
  emit("save", { links: links.value });
};
</script>

<style scoped>
/* 스크롤바 스타일링 */
div::-webkit-scrollbar {
  width: 4px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* placeholder 스타일링 */
input::placeholder {
  color: #a7acb6;
  font-weight: 400;
}

/* 삭제 버튼 X 아이콘 */
.delete-icon {
  position: relative;
}

.delete-icon::before,
.delete-icon::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 2px;
  background-color: white;
  border-radius: 1px;
}

.delete-icon::before {
  transform: rotate(45deg);
}

.delete-icon::after {
  transform: rotate(-45deg);
}
</style>
