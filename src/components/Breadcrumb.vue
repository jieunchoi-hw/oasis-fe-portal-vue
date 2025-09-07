<template>
  <nav class="flex items-center gap-2.5">
    <template v-for="(item, index) in breadcrumbItems" :key="index">
      <!-- 클릭 가능: 마지막이 아니면 router.push -->
      <span
        :aria-current="
          index === breadcrumbItems.length - 1 ? 'page' : undefined
        "
        @click="onCrumbClick(index)"
        class="text-2xl leading-loose"
        :class="[
          index === breadcrumbItems.length - 1
            ? 'font-semibold text-text-neutral leading-loose' // 현재 위치
            : 'font-semibold text-text-neutral/80 cursor-pointer hover:underline hover:font-semibold', // 클릭 가능 + 호버 스타일
        ]"
      >
        {{ item.name }}
      </span>

      <!-- 화살표 -->
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
import { useRouter } from "vue-router";

const props = defineProps({
  fileData: { type: Object, default: () => ({}) },
  parentFolders: { type: Array, default: () => [] },
  /** 라우팅 시작 경로 (예: '/docs' 또는 '/files') */
  basePath: { type: String, default: "/" },
});

const router = useRouter();

const breadcrumbItems = computed(() => {
  const items = [];

  if (props.parentFolders?.length) {
    items.push(
      ...props.parentFolders.map((folder) => ({
        name: folder.name || folder,
        type: "folder",
      }))
    );
  }

  if (props.fileData?.name) {
    items.push({
      name: props.fileData.name,
      type: props.fileData.type || "file",
    });
  }

  return items;
});

/** index까지의 조각을 조인해 경로 생성 */
const pathForIndex = (idx) => {
  // const parts = breadcrumbItems.value
  //   .slice(0, idx + 1)
  //   .map((i) => encodeURIComponent(i.name));
  // // basePath 뒤의 슬래시 중복 방지
  // const base = props.basePath.endsWith("/")
  //   ? props.basePath.slice(0, -1)
  //   : props.basePath;
  // return `${base}/${parts.join("/")}`;

  return router.back(); // 임시로 뒤로가기 처리
};

const onCrumbClick = (index) => {
  const lastIdx = breadcrumbItems.value.length - 1;
  if (index === lastIdx) return; // 현재 위치는 비활성

  const target = pathForIndex(index);
  router.push(target);
};
</script>
