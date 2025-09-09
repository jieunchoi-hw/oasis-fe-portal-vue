<template>
  <div class="flex w-full flex-col gap-2">
    <!-- Label -->
    <label
      v-if="label"
      class="text-neutral text-sm leading-tight font-medium"
      :for="inputId"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="flex flex-col gap-0.5">
      <input
        :id="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Error Message -->
      <div
        v-if="error"
        class="text-error px-1 text-left text-xs leading-none font-medium"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";

// Props 정의
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "텍스트를 입력해주세요.",
  },
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
    validator: (value) =>
      ["text", "email", "password", "number", "tel", "url"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
});

// Events 정의
const emit = defineEmits(["update:modelValue", "focus", "blur"]);

// Template ref
const inputRef = ref(null);

// 고유 ID 생성
const inputId = computed(() => {
  return `input-${Math.random().toString(36).substr(2, 9)}`;
});

// Input 클래스 계산
const inputClasses = computed(() => {
  const baseClasses = [
    "flex-1 outline-none",
    "placeholder:text-assistive",
    "text-normal text-[0.9375rem] leading-tight font-normal",
    "h-12 w-full rounded-lg border-[0.09rem] p-3",
    "focus-within:border-[0.09rem]",
    "bg-modal-background-alternative",
  ];

  // 에러 상태에 따른 border 색상
  if (props.error) {
    baseClasses.push("border-error focus:border-error");
  } else {
    baseClasses.push("border-line-alternative focus:border-primary-normal");
  }

  // disabled 상태
  if (props.disabled) {
    baseClasses.push("cursor-not-allowed opacity-50");
  }

  // 커스텀 클래스
  if (props.customClass) {
    baseClasses.push(props.customClass);
  }

  return baseClasses.join(" ");
});

// 이벤트 핸들러
const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleFocus = () => {
  emit("focus");
};

const handleBlur = () => {
  emit("blur");
};

// 외부에서 input에 접근할 수 있도록 expose
const focus = () => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

const blur = () => {
  if (inputRef.value) {
    inputRef.value.blur();
  }
};

const select = () => {
  if (inputRef.value) {
    inputRef.value.select();
  }
};

defineExpose({
  focus,
  blur,
  select,
  inputRef,
});
</script>
