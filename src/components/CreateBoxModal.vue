<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-[2px]" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative w-[65rem] bg-white rounded-2xl shadow-xl max-h-[90vh] transform text-left align-middle transition-all"
            >
              <!-- 모달 헤더 -->
              <div
                class="relative flex items-center justify-center px-10 py-10"
              >
                <h2 class="text-xl font-semibold text-gray-900">박스 만들기</h2>
                <button
                  @click="closeModal"
                  class="absolute right-10 top-8 p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src="@/assets/icons/close-modal-icon.svg"
                    alt="닫기"
                    class="w-5 h-5"
                  />
                </button>
              </div>

              <!-- 모달 컨텐츠 -->
              <div
                ref="contentAreaRef"
                class="px-10 max-h-[34rem] overflow-y-auto"
              >
                <!-- 구분선 -->
                <div class="w-full h-px bg-gray-200"></div>
                <div class="flex gap-8">
                  <!-- 좌측 컬럼 - 기본정보 -->
                  <div class="flex-1 py-8">
                    <!-- 기본정보 타이틀 -->
                    <h3 class="text-base font-semibold text-gray-900 mb-8">
                      기본정보
                    </h3>

                    <!-- 아바타 및 색상 선택기 -->
                    <div class="flex items-center justify-start gap-14 mb-12">
                      <div
                        class="relative w-30 h-30 rounded-full flex items-center justify-center bg-gray-100"
                      >
                        <!-- 3D 일러스트레이션 -->
                        <img
                          src="@/assets/icons/3d-illustration.svg"
                          alt="3D 일러스트"
                          class="absolute w-18 h-16 left-7"
                        />
                        <!-- 쓰기 아이콘 배경 -->
                        <div
                          class="absolute w-5.5 h-5.5 rounded-2xl flex items-center justify-center bg-blue-400 left-22 top-24"
                        >
                          <!-- 쓰기 아이콘 -->
                          <img
                            src="@/assets/icons/write-icon.svg"
                            alt="쓰기"
                            class="w-3 h-3"
                          />
                        </div>
                      </div>

                      <!-- 색상 선택기 -->
                      <div class="flex items-center gap-6">
                        <div
                          class="flex items-center gap-1 p-0.5 border border-blue-400 rounded-full"
                        >
                          <div class="w-4 h-4 bg-blue-400 rounded-full"></div>
                        </div>
                        <div
                          class="w-4 h-4 bg-teal-400 rounded-full cursor-pointer"
                        ></div>
                        <div
                          class="w-4 h-4 bg-red-400 rounded-full cursor-pointer"
                        ></div>
                        <div
                          class="w-4 h-4 bg-purple-400 rounded-full cursor-pointer"
                        ></div>
                        <div
                          class="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer"
                        ></div>
                      </div>
                    </div>

                    <!-- 박스 이름 -->
                    <div class="mb-5">
                      <AppInput
                        ref="boxNameInputRef"
                        v-model="formData.boxName"
                        label="박스 이름"
                        placeholder="박스 이름을 입력해주세요."
                        required
                      />
                    </div>

                    <!-- 박스 설명 -->
                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-900 mb-2 px-1"
                      >
                        박스 설명
                      </label>
                      <div class="relative">
                        <textarea
                          v-model="formData.boxDescription"
                          placeholder="박스에 대한 설명을 입력해주세요."
                          class="w-full h-20 px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm resize-none"
                          maxlength="50"
                        ></textarea>
                        <div
                          class="absolute bottom-3 right-3 text-xs text-gray-400"
                        >
                          {{ formData.boxDescription.length }}/50
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 구분선 -->
                  <div class="w-px bg-gray-200"></div>

                  <!-- 우측 컬럼 - 고급정보 -->
                  <div class="flex-1 py-8">
                    <h3 class="text-base font-semibold text-gray-900 mb-8">
                      고급정보
                    </h3>
                    <!-- 임베딩 모델 -->
                    <div class="mb-6">
                      <label
                        class="block text-sm font-medium text-gray-900 mb-2 px-1"
                      >
                        임베딩 모델
                      </label>
                      <div class="relative">
                        <Listbox v-model="selectedEmbeddingModel">
                          <ListboxButton
                            class="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white flex items-center justify-between"
                          >
                            <span>
                              {{
                                selectedEmbeddingModel
                                  ? selectedEmbeddingModel.label
                                  : "모델 종류 선택"
                              }}
                            </span>
                            <img
                              src="@/assets/icons/dropdown-arrow-icon.svg"
                              alt="드롭다운"
                              class="w-3 h-2 pointer-events-none"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            class="absolute z-[60] mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg"
                          >
                            <ListboxOption
                              v-for="model in embeddingModels"
                              :key="model.value"
                              :value="model"
                              :disabled="model.unavailable"
                              v-slot="{ active, selected }"
                              class="cursor-pointer select-none relative"
                            >
                              <div
                                :class="[
                                  active
                                    ? 'bg-blue-50 text-blue-900'
                                    : 'text-gray-900',
                                  'px-4 py-3 text-sm',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate',
                                  ]"
                                >
                                  {{ model.label }}
                                </span>
                              </div>
                            </ListboxOption>
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </div>

                    <!-- 텍스트 분할/중첩 크기 -->
                    <div class="flex gap-3 mb-6">
                      <div class="flex-1">
                        <AppInput
                          v-model="formData.textSplitSize"
                          label="텍스트 분할 크기"
                          placeholder="텍스트 분할 크기"
                          type="number"
                        />
                      </div>
                      <div class="flex-1">
                        <AppInput
                          v-model="formData.textOverlapSize"
                          label="텍스트 중첩 크기"
                          placeholder="텍스트 중첩 크기"
                          type="number"
                        />
                      </div>
                    </div>

                    <!-- 단어 대치 -->
                    <div class="mb-6">
                      <label
                        class="block text-sm font-medium text-gray-900 mb-2 px-1"
                      >
                        단어 대치 ({{ wordReplacements.length }})
                      </label>
                      <div class="space-y-2">
                        <div
                          v-for="(item, index) in wordReplacements"
                          :key="index"
                          class="flex items-start gap-2"
                        >
                          <div
                            class="flex-1 flex justify-center items-center gap-2"
                          >
                            <AppInput
                              v-model="item.from"
                              placeholder="From"
                              custom-class="mb-0"
                            />
                            <AppInput
                              v-model="item.to"
                              placeholder="To"
                              custom-class="mb-0"
                            />
                          </div>
                          <button
                            @click="removeWordReplacement(index)"
                            class="w-5 h-5 flex items-center justify-center mt-3"
                          >
                            <img
                              src="@/assets/icons/delete-icon.svg"
                              alt="삭제"
                              class="w-5 h-5"
                            />
                          </button>
                        </div>
                        <button
                          @click="addWordReplacement"
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

                    <!-- 금칙어 -->
                    <div class="mb-6">
                      <label
                        class="block text-sm font-medium text-gray-900 mb-2 px-1"
                      >
                        금칙어 ({{ forbiddenWords.length }})
                      </label>
                      <div class="space-y-2">
                        <div
                          v-for="(word, index) in forbiddenWords"
                          :key="index"
                          class="flex items-center gap-2"
                        >
                          <AppInput
                            v-model="forbiddenWords[index]"
                            placeholder="금칙어를 입력해주세요."
                            custom-class="flex-1 mb-0"
                          />
                          <button
                            @click="removeForbiddenWord(index)"
                            class="w-5 h-5 flex items-center justify-center"
                          >
                            <img
                              src="@/assets/icons/delete-icon-2.svg"
                              alt="삭제"
                              class="w-5 h-5"
                            />
                          </button>
                        </div>
                        <button
                          @click="addForbiddenWord"
                          class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src="@/assets/icons/plus-button-icon-2.svg"
                            alt="추가"
                            class="w-3 h-3"
                          />
                          추가
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 확인 버튼 -->
              <div class="px-10 pb-8">
                <!-- 구분선 -->
                <div class="w-full h-px bg-gray-200 mb-8"></div>

                <!-- 확인 버튼 -->
                <div class="flex justify-center">
                  <BaseButton @click="handleSubmit" size="default">
                    확인
                  </BaseButton>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["close", "submit"]);

// 임베딩 모델 리스트
const embeddingModels = [
  { value: "model1", label: "모델 1", unavailable: false },
  { value: "model2", label: "모델 2", unavailable: false },
  { value: "model3", label: "모델 3", unavailable: false },
];

// Listbox용 선택된 임베딩 모델
const selectedEmbeddingModel = ref(null);

// 폼 데이터
const formData = reactive({
  boxName: "",
  boxDescription: "",
  embeddingModel: "",
  textSplitSize: "",
  textOverlapSize: "",
});

// Listbox 선택 시 폼 데이터에 반영
watch(selectedEmbeddingModel, (val) => {
  formData.embeddingModel = val ? val.value : "";
});
// 모달이 열릴 때 박스 이름 입력에 포커스
const boxNameInputRef = ref(null);
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        if (boxNameInputRef.value) {
          boxNameInputRef.value.focus();
        }
      });
    }
  }
);
const contentAreaRef = ref(null);
const scrollToBottom = () => {
  // nextTick(() => {
  //   if (contentAreaRef.value) {
  //     contentAreaRef.value.scrollTo({
  //       top: contentAreaRef.value.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // });
};

// 단어 대치 배열
const wordReplacements = ref([{ from: "", to: "" }]);

// 금칙어 배열
const forbiddenWords = ref([""]);

// 단어 대치 추가
const addWordReplacement = () => {
  wordReplacements.value.push({ from: "", to: "" });
  scrollToBottom();
};

// 단어 대치 제거
const removeWordReplacement = (index) => {
  wordReplacements.value.splice(index, 1);
};

// 금칙어 추가
const addForbiddenWord = () => {
  forbiddenWords.value.push("");
  scrollToBottom();
};

// 금칙어 제거
const removeForbiddenWord = (index) => {
  forbiddenWords.value.splice(index, 1);
};

// 모달 닫기
const closeModal = () => {
  emit("close");
};

// 폼 제출
const handleSubmit = () => {
  const submitData = {
    ...formData,
    wordReplacements: wordReplacements.value,
    forbiddenWords: forbiddenWords.value,
  };
  emit("submit", submitData);
};
</script>
