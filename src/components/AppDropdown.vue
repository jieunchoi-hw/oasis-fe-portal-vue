<template>
  <div class="relative">
    <Listbox v-model="selectedValue">
      <ListboxButton
        class="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white flex items-center justify-between"
      >
        <span class="app-dropdown-text">
          {{ selectedValue.label }}
        </span>
        <img
          src="@/assets/icons/dropdown-arrow.svg"
          alt="드롭다운"
          class="w-4 h-4 pointer-events-none"
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
          class="absolute right-0 mt-1 bg-dropdown-background-normal border border-neutral-200 rounded-xl shadow-lg z-[9999] focus:outline-none min-w-full"
          @open="isOpen = true"
          @close="isOpen = false"
        >
          <div class="p-1.5">
            <ListboxOption
              v-for="option in options"
              :key="option.value"
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
                  {{ option.label }}
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
