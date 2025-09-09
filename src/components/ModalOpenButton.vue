<template>
  <button
    @click="handleClick"
    class="flex items-center justify-center gap-1 h-10 pl-2 pr-3.5 py-2.5 text-white rounded-full transition-colors"
    :class="[
      `bg-blue-400 hover:bg-blue-500`,
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
  >
    <div class="flex items-center justify-center w-6 h-6">
      <img src="@/assets/icons/plus-icon.svg" alt="추가" class="w-3 h-3" />
    </div>
    <span class="text-sm font-semibold">{{ text }}</span>
  </button>
</template>

<script setup>
// Props 정의
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// 이벤트 emit 정의
const emit = defineEmits(["click"]);

// 클릭 핸들러
const handleClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>
