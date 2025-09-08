<template>
  <TransitionRoot appear :show="isVisible" as="template">
    <Dialog as="div" @close="handleClose" class="relative z-50">
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
              class="relative bg-white rounded-2xl w-110 px-5 pt-6 pb-7 transform overflow-hidden text-left align-middle shadow-xl transition-all"
            >
              <!-- Header with close button -->
              <div class="relative flex items-center justify-center px-0 py-2">
                <h2 class="text-xl font-semibold text-text-normal text-center">
                  {{ title }}
                </h2>
                <button
                  @click="handleClose"
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
              <div class="space-y-8.5 mt-2">
                <p
                  class="text-base font-normal text-alternative text-center leading-tight mb-12"
                >
                  {{ description }}
                </p>

                <!-- Action buttons -->
                <div class="flex gap-2">
                  <BaseButton
                    @click="handleCancel"
                    :text="cancelText"
                    :primary="false"
                    :shadow="false"
                    size="default"
                  />
                  <BaseButton
                    @click="handleConfirm"
                    :text="confirmText"
                    size="default"
                  />
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
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import BaseButton from "./BaseButton.vue";

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

// Remove handleBackdropClick as Headless UI handles backdrop clicks automatically
</script>
