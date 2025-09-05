<template>
  <div>
    <div
      class="bg-white rounded-2xl hover:shadow-md transition-shadow cursor-pointer shadow-sm"
    >
      <!-- 카드 헤더 -->
      <div class="p-6 pb-6.5">
        <div class="flex items-start justify-between mb-7">
          <!-- 문서 아이콘 -->
          <div class="flex-shrink-0">
            <img
              src="@/assets/icons/document-icon.svg"
              alt="문서"
              class="w-10.5 h-8.5"
            />
          </div>

          <!-- 액션 버튼들 -->
          <div class="flex items-center gap-1">
            <!-- 더보기 드롭다운 메뉴 -->
            <Menu as="div" class="relative">
              <MenuButton
                class="w-6.5 h-6.5 border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                <img
                  src="@/assets/icons/more-options.svg"
                  alt="더보기"
                  class="w-4.5 h-4.5"
                />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 top-full mt-1 w-38 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 py-1 focus:outline-none"
                  style="
                    box-shadow:
                      2px 6px 12px 2px rgba(0, 0, 0, 0.04),
                      0px 2px 2px 0px rgba(0, 0, 0, 0.02);
                  "
                >
                  <div class="px-1 py-2">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          'w-full text-left px-4 py-2 text-sm font-medium text-neutral-700 transition-colors rounded-md',
                          active ? 'bg-neutral-50' : '',
                        ]"
                        @click="handleEdit"
                      >
                        수정
                      </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          'w-full text-left px-4 py-2 text-sm font-medium text-neutral-700 transition-colors rounded-md',
                          active ? 'bg-blue-50' : '',
                        ]"
                        @click="handleDelete"
                      >
                        삭제
                      </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          'w-full text-left px-4 py-2 text-sm font-medium text-neutral-700 transition-colors rounded-md',
                          active ? 'bg-neutral-50' : '',
                        ]"
                        @click="handlePrivacySettings"
                      >
                        공개범위 설정
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button
              class="w-6.5 h-6.5 border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <img
                src="@/assets/icons/pin-icon.svg"
                alt="고정"
                class="w-4.5 h-4.5"
              />
            </button>
          </div>
        </div>

        <!-- 카드 컨텐츠 -->
        <div class="space-y-2">
          <div class="space-y-1">
            <h3 class="text-15px font-bold leading-tight text-neutral-900">
              {{ document.title }}
            </h3>
            <p
              class="text-xs leading-relaxed h-4.5 overflow-hidden text-neutral-600"
            >
              {{ document.description }}
            </p>
          </div>
          <p class="text-xs h-4.25 text-neutral-400">
            {{ document.author }} / {{ document.date }}
          </p>
        </div>
      </div>
    </div>

    <!-- Delete Box Modal -->
    <DeleteBoxModal
      :is-open="isDeleteModalOpen"
      :box-name="document.title"
      @close="closeDeleteModal"
      @delete="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import DeleteBoxModal from "./DeleteBoxModal.vue";

defineProps({
  document: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete", "privacy-settings"]);

// Modal state
const isDeleteModalOpen = ref(false);

const handleEdit = () => {
  emit("edit");
};

const handleDelete = () => {
  isDeleteModalOpen.value = true;
};

const handlePrivacySettings = () => {
  emit("privacy-settings");
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const confirmDelete = () => {
  emit("delete");
};
</script>
