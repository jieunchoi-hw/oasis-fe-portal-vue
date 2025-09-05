<template>
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
          <button
            class="w-6.5 h-6.5 border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <img
              src="@/assets/icons/more-options.svg"
              alt="더보기"
              class="w-4.5 h-4.5"
            />
          </button>
          <button
            class="w-6.5 h-6.5 border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
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
</template>

<script setup>
defineProps({
  document: {
    type: Object,
    required: true,
  },
});
</script>
