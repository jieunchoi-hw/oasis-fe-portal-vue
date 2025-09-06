<template>
  <div>
    <div
      class="bg-white rounded-2xl hover:shadow-md transition-shadow cursor-pointer shadow-sm"
      @click="handleCardClick"
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
            <!-- 더보기 컨텍스트 메뉴 -->
            <ContextMenu
              :menu-items="menuItems"
              @item-click="handleMenuItemClick"
            />

            <button
              class="w-6.5 h-6.5 border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
              @click.stop="handlePin"
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import DeleteBoxModal from "./DeleteBoxModal.vue";

const router = useRouter();

const props = defineProps({
  document: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete", "privacy-settings", "pin"]);

// Modal state
const isDeleteModalOpen = ref(false);

// 메뉴 아이템들 정의
const menuItems = computed(() => [
  {
    label: "수정",
    action: handleEdit,
    activeClass: "bg-neutral-50",
  },
  {
    label: "삭제",
    action: openDeleteModal,
    activeClass: "bg-blue-50",
  },
  {
    label: "공개범위 설정",
    action: handlePrivacySettings,
    activeClass: "bg-neutral-50",
  },
]);

const handleCardClick = () => {
  // 카드 클릭 시 문서 상세 페이지로 이동
  router.push(`/document-storage/${props.document.id}`);
};

const handleEdit = () => {
  emit("edit", props.document);
};

const handlePrivacySettings = () => {
  emit("privacy-settings", props.document);
};

const handlePin = () => {
  emit("pin", props.document);
};

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};

const confirmDelete = () => {
  emit("delete", props.document);
  closeDeleteModal();
};

const handleMenuItemClick = (item) => {
  // 추가적인 처리가 필요한 경우 여기에 구현
  console.log("Menu item clicked:", item.label);
};
</script>
