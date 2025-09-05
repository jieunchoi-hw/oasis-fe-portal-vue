<template>
  <nav class="flex items-center gap-2.5">
    <template v-for="(item, index) in breadcrumbItems" :key="index">
      <span class="text-2xl font-semibold text-text-neutral leading-loose">
        {{ item.name }}
      </span>

      <!-- 마지막 아이템이 아닌 경우 화살표 표시 -->
      <img
        v-if="index < breadcrumbItems.length - 1"
        src="@/assets/icons/breadcrumb-arrow.svg"
        alt=">"
        class="w-6 h-6"
      />
    </template>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  fileData: {
    type: Object,
    default: () => ({}),
  },
  parentFolders: {
    type: Array,
    default: () => [],
  },
});

const breadcrumbItems = computed(() => {
  const items = [];

  // 부모 폴더들 추가
  if (props.parentFolders && props.parentFolders.length > 0) {
    items.push(
      ...props.parentFolders.map((folder) => ({
        name: folder.name || folder,
        type: "folder",
      }))
    );
  }

  // 현재 파일/폴더 추가
  if (props.fileData && props.fileData.name) {
    items.push({
      name: props.fileData.name,
      type: props.fileData.type || "file",
    });
  }

  return items;
});
</script>
