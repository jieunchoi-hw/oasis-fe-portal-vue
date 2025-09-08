<template>
  <div>
    <div
      class="bg-white rounded-2xl hover:shadow-md transition-shadow cursor-pointer shadow-sm"
      :class="{ 'border-1 border-blue-300': isFavorite }"
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
              :class="{ 'bg-yellow-400': isFavorite }"
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

    <!-- Pin Confirm Dialog -->
    <AppConfirmDialog
      :is-visible="isPinConfirmDialogOpen"
      title="즐겨찾는 문서로 설정하시겠어요?"
      description="즐겨찾기로 설정된 문서는 상단에 고정됩니다."
      confirm-text="설정"
      @close="closePinConfirmDialog"
      @cancel="closePinConfirmDialog"
      @confirm="confirmPin"
    />

    <!-- Unpin Confirm Dialog -->
    <AppConfirmDialog
      :is-visible="isUnpinConfirmDialogOpen"
      title="즐겨찾기에서 해제하시겠어요?"
      description="해제된 문서는 즐겨찾기 목록에서 제거됩니다."
      confirm-text="해제"
      @close="closeUnpinConfirmDialog"
      @cancel="closeUnpinConfirmDialog"
      @confirm="confirmUnpin"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useRagStore } from "@/stores/rag";
import DeleteBoxModal from "./DeleteBoxModal.vue";
import AppConfirmDialog from "./AppConfirmDialog.vue";

const router = useRouter();
const ragStore = useRagStore();

const props = defineProps({
  document: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "edit",
  "delete",
  "privacy-settings",
  "pin",
  "favorite-updated",
]);

// Modal state
const isDeleteModalOpen = ref(false);
const isPinConfirmDialogOpen = ref(false);
const isUnpinConfirmDialogOpen = ref(false);

// 즐겨찾기 상태
const isFavorite = ref(false);

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

const handleCardClick = async () => {
  // 카드 클릭 시 문서 상세 페이지로 이동 (rag store에 document 정보 저장)
  ragStore.setSelectedRag(props.document);

  // 현재 라우트와 동일한 경우 강제로 새로고침
  const targetRoute = `/rag/${props.document.id}`;
  if (router.currentRoute.value.path === targetRoute) {
    // 같은 라우트인 경우 replace로 강제 업데이트
    await router.replace(targetRoute);
    // 다음 틱에서 다시 push하여 컴포넌트 재렌더링 강제
    await nextTick();
    await router.push(targetRoute);
  } else {
    // 다른 라우트인 경우 일반 push
    await router.push(targetRoute);
  }
};

const handleEdit = () => {
  emit("edit", props.document);
};

const handlePrivacySettings = () => {
  emit("privacy-settings", props.document);
};

const handlePin = () => {
  if (isFavorite.value) {
    // 이미 즐겨찾기인 경우 해제 다이얼로그 표시
    isUnpinConfirmDialogOpen.value = true;
  } else {
    // 즐겨찾기가 아닌 경우 설정 다이얼로그 표시
    isPinConfirmDialogOpen.value = true;
  }
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

const handleMenuItemClick = (_item) => {
  // console.log("Menu item clicked:", _item.label);
};

// Pin confirm dialog handlers
const closePinConfirmDialog = () => {
  isPinConfirmDialogOpen.value = false;
};

const confirmPin = () => {
  // localStorage에 즐겨찾기 문서 저장
  const existingFavorites = JSON.parse(
    localStorage.getItem("favoriteDocuments") || "[]"
  );

  // 이미 즐겨찾기에 있는지 확인
  const isAlreadyFavorite = existingFavorites.some(
    (fav) => fav.id === props.document.id
  );

  if (!isAlreadyFavorite) {
    existingFavorites.push(props.document);
    localStorage.setItem(
      "favoriteDocuments",
      JSON.stringify(existingFavorites)
    );

    // 즐겨찾기 상태 업데이트
    isFavorite.value = true;

    // 즐겨찾기 업데이트 이벤트 emit
    emit("favorite-updated");
  }

  emit("pin", props.document);
  closePinConfirmDialog();
};

// 즐겨찾기 상태 확인 함수
const checkFavoriteStatus = () => {
  const existingFavorites = JSON.parse(
    localStorage.getItem("favoriteDocuments") || "[]"
  );
  isFavorite.value = existingFavorites.some(
    (fav) => fav.id === props.document.id
  );
};

// Unpin confirm dialog handlers
const closeUnpinConfirmDialog = () => {
  isUnpinConfirmDialogOpen.value = false;
};

const confirmUnpin = () => {
  // localStorage에서 즐겨찾기 문서 제거
  const existingFavorites = JSON.parse(
    localStorage.getItem("favoriteDocuments") || "[]"
  );

  const updatedFavorites = existingFavorites.filter(
    (fav) => fav.id !== props.document.id
  );

  localStorage.setItem("favoriteDocuments", JSON.stringify(updatedFavorites));

  // 즐겨찾기 상태 업데이트
  isFavorite.value = false;

  // 즐겨찾기 업데이트 이벤트 emit
  emit("favorite-updated");

  emit("pin", props.document);
  closeUnpinConfirmDialog();
};

// 컴포넌트 마운트 시 즐겨찾기 상태 확인
onMounted(() => {
  checkFavoriteStatus();
});
</script>
