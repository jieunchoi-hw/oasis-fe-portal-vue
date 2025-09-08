<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click="handleBackdropClick"
    >
      <div class="bg-white rounded-2xl p-6 mx-5 max-w-sm w-full" @click.stop>
        <!-- Header with close button -->
        <div class="flex justify-end mb-10">
          <button
            @click="handleClose"
            class="flex items-center justify-center w-5 h-5 p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="#47484C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex flex-col items-center gap-2 mb-10">
          <div class="flex justify-center px-2.5">
            <h2
              class="text-xl font-semibold text-center text-[#211C32] leading-[1.4]"
            >
              {{ title }}
            </h2>
          </div>
          <p
            class="text-[15px] font-normal text-[#858588] leading-[1.4] text-center"
          >
            {{ description }}
          </p>
        </div>

        <!-- Action buttons -->
        <div class="flex justify-center gap-2">
          <button
            @click="handleCancel"
            class="flex items-center justify-center w-[180px] h-[54px] px-44 py-[18px] bg-[#F2F5FA] rounded-xl text-[#A7ACB6] font-semibold text-base leading-[1.4] hover:bg-[#E8EBF0] transition-colors"
          >
            {{ cancelText }}
          </button>
          <button
            @click="handleConfirm"
            class="flex items-center justify-center w-[180px] h-[54px] px-44 py-[18px] bg-[#376AF6] rounded-xl text-white font-semibold text-base leading-[1.4] hover:bg-[#2E5AE5] transition-colors"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "대화를 삭제하시겠어요?",
  },
  description: {
    type: String,
    default: "카테고리에서 삭제해도 모든 채팅목록에는 남아있어요.",
  },
  cancelText: {
    type: String,
    default: "취소",
  },
  confirmText: {
    type: String,
    default: "삭제하기",
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close", "cancel", "confirm"]);

const handleClose = () => {
  emit("close");
};

const handleCancel = () => {
  emit("cancel");
};

const handleConfirm = () => {
  emit("confirm");
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    handleClose();
  }
};
</script>
