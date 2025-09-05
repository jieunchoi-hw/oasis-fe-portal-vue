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
              class="relative bg-white rounded-2xl transform overflow-hidden text-left align-middle shadow-xl transition-all w-128 px-10 pt-8 pb-11"
            >
              <!-- Header with close button -->
              <div class="flex flex-col items-stretch gap-9">
                <div
                  class="relative flex items-center justify-center px-0 py-2"
                >
                  <h2 class="text-xl font-semibold text-center text-gray-900">
                    폴더 추가
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
                <div class="flex flex-col items-stretch space-y-8">
                  <!-- Form section -->
                  <div class="flex flex-col items-stretch gap-5">
                    <div class="flex flex-col items-stretch gap-2">
                      <!-- Label -->
                      <div class="flex justify-stretch items-stretch px-1">
                        <span
                          class="text-sm font-medium text-gray-700 leading-tight"
                        >
                          폴더 명
                        </span>
                      </div>

                      <!-- Input field -->
                      <div
                        class="flex items-center bg-white border rounded-lg gap-1 px-3 h-12"
                        style="border-color: #dfdfe0"
                      >
                        <input
                          v-model="folderName"
                          type="text"
                          placeholder="폴더 명을 입력해주세요."
                          class="w-full text-sm font-normal text-gray-400 placeholder:text-gray-400 focus:outline-none focus:text-gray-900"
                          @keyup.enter="handleCreate"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Action button -->
                  <div class="flex justify-center">
                    <button
                      @click="handleSubmit"
                      class="w-full bg-blue-500 text-white font-semibold px-44 py-4 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      확인
                    </button>
                  </div>
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
});

const emit = defineEmits(["close", "create"]);

const folderName = ref("");

const isFolderNameValid = computed(() => {
  return folderName.value.trim().length > 0;
});

const closeModal = () => {
  folderName.value = "";
  emit("close");
};

const handleCreate = () => {
  if (isFolderNameValid.value) {
    emit("create", folderName.value.trim());
    closeModal();
  }
};
</script>
