<template>
  <Menu as="div" class="relative">
    <MenuButton :class="buttonClass" @click.stop>
      <img :src="iconSrc" :alt="iconAlt" :class="iconClass" />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems :class="computedMenuClass" :style="menuStyle">
        <div class="px-1 py-2">
          <MenuItem
            v-for="(item, index) in menuItems"
            :key="index"
            v-slot="{ active }"
          >
            <button
              :class="[
                'w-full text-left px-4 py-2 text-sm font-medium text-neutral-700 transition-colors rounded-md',
                active ? item.activeClass || 'bg-neutral-50' : '',
                item.class || '',
              ]"
              @click.stop="handleItemClick(item)"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { computed } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import moreOptionsIcon from "@/assets/icons/more-options.svg";

const props = defineProps({
  // 메뉴 아이템들
  menuItems: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) =>
          typeof item === "object" &&
          typeof item.label === "string" &&
          typeof item.action === "function"
      );
    },
  },
  // 버튼 스타일 클래스
  buttonClass: {
    type: String,
    default:
      "w-6.5 h-6.5 border border-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-colors",
  },
  // 아이콘 관련
  iconSrc: {
    type: String,
    default: moreOptionsIcon,
  },
  iconAlt: {
    type: String,
    default: "더보기",
  },
  iconClass: {
    type: String,
    default: "w-4.5 h-4.5",
  },
  // 메뉴 스타일 클래스
  menuClass: {
    type: String,
    default:
      "absolute right-0 top-full mt-1 w-38 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 py-1 focus:outline-none",
  },
  // 메뉴 추가 스타일
  menuStyle: {
    type: String,
    default:
      "box-shadow: 2px 6px 12px 2px rgba(0, 0, 0, 0.04), 0px 2px 2px 0px rgba(0, 0, 0, 0.02);",
  },
  // 메뉴 위치
  menuPosition: {
    type: String,
    default: "right", // "right" | "left" | "top-right" | "top-left" | "center"
    validator: (value) => {
      return ["right", "left", "top-right", "top-left", "center"].includes(
        value
      );
    },
  },
});

const emit = defineEmits(["item-click"]);

// 계산된 메뉴 클래스 (위치에 따라 다름)
const computedMenuClass = computed(() => {
  const baseClass =
    "absolute w-38 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 py-1 focus:outline-none";

  let positionClass = "";
  switch (props.menuPosition) {
    case "left":
      positionClass = "left-full top-0 ml-1";
      break;
    case "top-right":
      positionClass = "bottom-full right-0 mb-1";
      break;
    case "top-left":
      positionClass = "bottom-full left-0 mb-1";
      break;
    case "center":
      positionClass = "top-full mt-1 left-1/2 transform -translate-x-1/2";
      break;
    default: // "right"
      positionClass = "top-full right-0 mt-1";
      break;
  }

  return `${baseClass} ${positionClass}`;
});

const handleItemClick = (item) => {
  if (item.disabled) return;

  // 아이템의 action 함수 실행
  if (typeof item.action === "function") {
    item.action();
  }

  // 상위 컴포넌트에 이벤트 전달
  emit("item-click", item);
};
</script>
