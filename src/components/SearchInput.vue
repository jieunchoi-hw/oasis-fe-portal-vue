<template>
  <div class="relative">
    <input
      type="text"
      :placeholder="placeholder"
      class="w-96 h-11 px-4 py-1.5 pl-12 bg-background-neutral border-line-neutral border-solid inline-flex border rounded-full focus:outline-none placeholder:text-gray-400 placeholder:text-base placeholder:font-normal placeholder:leading-tight"
      :style="inputStyle"
      v-model="modelValue"
      @input="$emit('update:modelValue', modelValue)"
    />
    <img
      src="@/assets/icons/search-icon.svg"
      alt="검색"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  inputStyle: {
    type: [String, Object],
  },
});
const modelValue = ref(props.modelValue);
</script>
