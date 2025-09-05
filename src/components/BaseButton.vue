<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--disabled': disabled,
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
   * Button variant style
   */
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "outline", "ghost"].includes(value),
  },
  /**
   * Button size
   */
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
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
   * Button type attribute
   */
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  border: 0;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  outline: none;

  /* Figma 디자인 기본 스타일 */
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    sans-serif;
  font-size: 20px;
  line-height: 1.4em;
  box-shadow: 0px 10px 24px 4px rgba(68, 97, 242, 0.2);
}

.base-button:focus {
  box-shadow:
    0 0 0 2px var(--color-blue-500),
    0px 10px 24px 4px rgba(68, 97, 242, 0.2);
}

/* Primary variant (기본 피그마 디자인) */
.base-button--primary {
  background-color: var(--color-blue-500);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-blue-600);
  transform: translateY(-1px);
  box-shadow: 0px 12px 28px 6px rgba(68, 97, 242, 0.25);
}

.base-button--primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0px 8px 20px 2px rgba(68, 97, 242, 0.15);
}

/* Secondary variant */
.base-button--secondary {
  background-color: var(--color-gray-600);
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-gray-700);
  transform: translateY(-1px);
}

/* Outline variant */
.base-button--outline {
  background-color: transparent;
  border: 2px solid var(--color-blue-500);
  color: var(--color-blue-500);
  box-shadow: none;
}

.base-button--outline:hover:not(:disabled) {
  background-color: var(--color-blue-500);
  color: white;
  box-shadow: 0px 10px 24px 4px rgba(68, 97, 242, 0.2);
}

/* Ghost variant */
.base-button--ghost {
  background-color: transparent;
  color: var(--color-blue-500);
  box-shadow: none;
}

.base-button--ghost:hover:not(:disabled) {
  background-color: var(--color-gray-50);
}

/* Size variants */
.base-button--small {
  padding: 12px 24px;
  font-size: 14px;
}

.base-button--medium {
  /* 피그마 디자인 기본 사이즈 */
  padding: 18px 176px;
  min-width: 540px;
  height: 68px;
}

.base-button--large {
  padding: 24px 200px;
  font-size: 24px;
  min-width: 600px;
  height: 80px;
}

/* Disabled state */
.base-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Loading state */
.base-button--loading {
  cursor: wait;
}

.base-button__spinner {
  margin-right: 8px;
}

.base-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animation for loading spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .base-button--medium {
    padding: 16px 32px;
    min-width: auto;
    width: 100%;
    font-size: 18px;
  }

  .base-button--large {
    padding: 20px 40px;
    min-width: auto;
    width: 100%;
    font-size: 20px;
  }
}
</style>
