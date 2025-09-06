<template>
  <button
    :type="type"
    :class="[
      'w-full py-4.5',
      size === 'default' ? 'h-[3.375rem] text-base' : 'h-17 text-xl',
      'flex items-center justify-center rounded-xl',
      primary
        ? 'bg-primary-normal focus:ring-primary-normal text-common-0 hover:bg-primary-strong'
        : 'focus:ring-modal-background-neutral bg-modal-background-neutral dark:text-gray-250 hover:bg-gray-150 text-gray-300 dark:hover:bg-gray-500',
      'leading-[140%] font-semibold',
      'focus:ring-2 focus:ring-offset-2 focus:outline-none',
      'transition-all duration-200 ease-in-out',
      !disabled && 'cursor-pointer',
      disabled && 'cursor-not-allowed opacity-50',
      shadow && 'shadow-[0px_10px_24px_4px_rgba(68,97,242,0.2)]',
      {
        'base-button--loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="base-button__spinner">
      <!-- Simple loading spinner -->
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="31.416"
          stroke-dashoffset="31.416"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-15.708;-31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
    <span v-if="!loading" class="base-button__content">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  /**
   * Button text content
   */
  text: {
    type: String,
    default: "",
  },
  /**
   * Button type attribute
   */
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * Button size - 'default' matches TSX default size, 'big' matches TSX big size
   */
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "big"].includes(value),
  },
  /**
   * Primary button style - true for primary, false for secondary
   */
  primary: {
    type: Boolean,
    default: true,
  },
  /**
   * Apply shadow effect
   */
  shadow: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>
