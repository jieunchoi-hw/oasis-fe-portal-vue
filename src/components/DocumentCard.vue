<template>
  <div
    class="bg-white rounded-2xl hover:shadow-md transition-shadow duration-200 cursor-pointer"
    style="box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.04)"
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
            class="w-6.5 h-6.5 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            style="border-color: #dfdfe0"
          >
            <img
              src="@/assets/icons/more-options.svg"
              alt="더보기"
              class="w-4.5 h-4.5"
            />
          </button>
          <button
            class="w-6.5 h-6.5 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            style="border-color: #dfdfe0"
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
          <h3 class="text-15px font-bold leading-tight" style="color: #211c32">
            {{ document.title }}
          </h3>
          <p
            class="text-xs leading-relaxed h-4.5 overflow-hidden"
            style="color: #636367"
          >
            {{ document.description }}
          </p>
        </div>
        <p class="text-xs h-4.25" style="color: #a7acb6">
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

<style scoped>
.h-4\.5 {
  height: 1.125rem; /* 18px */
}

.h-4\.25 {
  height: 1.0625rem; /* 17px */
}

.pb-6\.5 {
  padding-bottom: 1.625rem; /* 26px */
}

.w-10\.5 {
  width: 2.625rem; /* 42px */
}

.h-8\.5 {
  height: 2.125rem; /* 34px */
}

.w-6\.5 {
  width: 1.625rem; /* 26px */
}

.h-6\.5 {
  height: 1.625rem; /* 26px */
}

.w-4\.5 {
  width: 1.125rem; /* 18px */
}

.text-15px {
  font-size: 15px;
}
</style>
