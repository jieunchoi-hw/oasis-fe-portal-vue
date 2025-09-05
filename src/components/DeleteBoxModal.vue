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
              class="relative bg-white rounded-2xl w-[510px] px-10 pt-8 pb-11 transform overflow-hidden text-left align-middle shadow-xl transition-all"
            >
              <!-- Header with close button -->
              <div class="relative flex items-center justify-center px-0 py-2">
                <h2 class="text-xl font-semibold text-[#211C32] text-center">
                  박스를 삭제하시겠어요?
                </h2>
                <button
                  @click="closeModal"
                  class="absolute right-0 top-0 p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src="@/assets/icons/close-modal-icon.svg"
                    alt="닫기"
                    class="w-5 h-5"
                  />
                </button>
              </div>

              <!-- Content -->
              <div class="space-y-8.5 mt-9">
                <!-- Warning section -->
                <div class="space-y-3">
                  <!-- Warning box -->
                  <div
                    class="bg-[#F8FAFD] border border-[#EFEFEF] rounded-md p-3"
                  >
                    <div class="flex items-center gap-2">
                      <!-- Info icon -->
                      <div class="w-4 h-4 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8.75 11.75C8.75 12.1642 8.41421 12.5 8 12.5C7.58579 12.5 7.25 12.1642 7.25 11.75V7.25C7.25 6.83579 7.58579 6.5 8 6.5C8.41421 6.5 8.75 6.83579 8.75 7.25V11.75ZM8 5.5C7.44772 5.5 7 5.05228 7 4.5C7 3.94772 7.44772 3.5 8 3.5C8.55228 3.5 9 3.94772 9 4.5C9 5.05228 8.55228 5.5 8 5.5Z"
                            fill="#658AEF"
                          />
                        </svg>
                      </div>
                      <p
                        class="text-[15px] font-normal text-[#376AF6] leading-[1.4em]"
                      >
                        삭제 후에는 박스를 복구할 수 없어요.<br />
                        계속 진행하려면 삭제하려는 박스명을 입력해주세요.
                      </p>
                    </div>
                  </div>

                  <!-- Input field -->
                  <div
                    class="bg-white border border-[#DFDFE0] rounded-lg px-3 h-12 flex items-center"
                  >
                    <input
                      :value="boxNameInput"
                      @input="onInputChange"
                      type="text"
                      placeholder="박스 명을 입력해주세요."
                      class="w-full text-[15px] font-normal text-[#A7ACB6] placeholder:text-[#A7ACB6] focus:outline-none focus:text-gray-900"
                    />
                  </div>
                </div>

                <!-- Action buttons -->
                <div class="flex gap-2">
                  <button
                    @click="closeModal"
                    class="flex-1 h-[54px] bg-[#F2F5FA] rounded-xl flex items-center justify-center text-base font-semibold text-[#A7ACB6] hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    @click="handleDelete"
                    :disabled="!isDeleteEnabled"
                    :class="[
                      'flex-1 h-[54px] rounded-xl flex items-center justify-center text-base font-semibold transition-colors',
                      isDeleteEnabled
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                    ]"
                  >
                    삭제하기
                  </button>
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
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  boxName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "delete"]);

const boxNameInput = ref("");

const isDeleteEnabled = computed(() => {
  const input = boxNameInput.value?.trim() || "";
  const target = props.boxName?.trim() || "";
  console.log("비교:", { input, target, equal: input === target });
  return input === target;
});

const closeModal = () => {
  boxNameInput.value = "";
  emit("close");
};

const onInputChange = (event) => {
  boxNameInput.value = event.target.value;
};

const handleDelete = () => {
  if (isDeleteEnabled.value) {
    emit("delete");
    closeModal();
  }
};
</script>
