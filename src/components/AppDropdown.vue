<template>
  <div class="relative">
    <Listbox v-model="selectedValue">
      <ListboxButton class="app-dropdown-button">
        <span class="app-dropdown-text">
          {{ selectedValue.name }}
        </span>
        <img
          src="@/assets/icons/down-arrow.svg"
          alt="드롭다운"
          class="w-5 h-5 transition-transform duration-200 flex-shrink-0"
          :class="{ 'rotate-180': isOpen }"
        />
      </ListboxButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute right-0 mt-2 bg-dropdown-background-normal border border-neutral-200 rounded-xl shadow-lg z-[9999] focus:outline-none min-w-full"
          @open="isOpen = true"
          @close="isOpen = false"
        >
          <div class="p-1.5">
            <ListboxOption
              v-for="option in options"
              :key="option.id"
              :value="option"
              :disabled="option.unavailable"
              v-slot="{ active, selected }"
              class="cursor-pointer select-none relative"
            >
              <li
                :class="[
                  active ? 'bg-blue-50' : '',
                  selected ? '' : '',
                  option.unavailable ? 'opacity-50 cursor-not-allowed' : '',
                  'relative flex items-center gap-2.5 px-4 py-2 rounded-md h-10 ',
                ]"
              >
                <span
                  class="text-sm font-medium flex-1"
                  :class="[
                    selected
                      ? 'text-blue-600 font-semibold'
                      : 'text-neutral-700 font-medium',
                    option.unavailable ? 'text-neutral-400' : '',
                  ]"
                >
                  {{ option.name }}
                </span>
              </li>
            </ListboxOption>
          </div>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

// Props 정의
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: null,
  },
});

// Emits 정의
const emit = defineEmits(["update:modelValue"]);

// 드롭다운 상태 관리
const isOpen = ref(false);

// 선택된 값 (v-model 지원)
const selectedValue = computed({
  get: () => props.modelValue || props.options[0],
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped>
/* AppDropdown 버튼 스타일 */
.app-dropdown-button {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 7px 20px;
  background-color: #ffffff;
  border: 1px solid #efefef;
  border-radius: 50px;
  cursor: pointer;
  height: 48px;
  transition: background-color 0.2s ease;
}

.app-dropdown-button:hover {
  background-color: #f9fafb;
}

.app-dropdown-text {
  color: #47484c;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  height: 22px;
  flex: 1;
}
</style>
