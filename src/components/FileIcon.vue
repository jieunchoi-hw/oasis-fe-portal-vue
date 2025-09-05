<template>
  <div
    class="w-6 h-6 rounded flex items-center justify-center relative overflow-hidden"
    :class="iconBgClass"
  >
    <!-- PDF 아이콘 -->
    <template v-if="fileType === 'pdf'">
      <img src="@/assets/icons/pdf-icon.svg" alt="PDF" class="w-full h-full" />
    </template>

    <!-- word 아이콘 -->
    <template v-else-if="fileType === 'word'">
      <div class="absolute inset-0 rounded" :class="iconBgClass"></div>
      <div
        class="relative z-10 flex flex-col items-center justify-start gap-0.5"
      >
        <div class="w-3.5 h-0.5 bg-white"></div>
        <div class="w-2.5 h-0.5 bg-white"></div>
        <div class="w-2 h-0.5 bg-white"></div>
      </div>
    </template>

    <!-- excel 아이콘 -->
    <template v-else-if="fileType === 'excel'">
      <img
        src="@/assets/icons/excel-icon.svg"
        alt="File"
        class="w-full h-full"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
});

const iconBgClass = computed(() => {
  switch (props.fileType) {
    case "word":
      return "bg-blue-500";
    default:
      return "";
  }
});
</script>

<style scoped></style>
