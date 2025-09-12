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
        <!-- 메뉴 제목이 있는 경우 -->
        <div v-if="menuTitle" class="h-10 px-4 py-2">
          <div class="text-sm font-medium text-neutral-700 whitespace-nowrap">
            {{ menuTitle }}
          </div>
        </div>

        <!-- 구분선 (메뉴 제목이 있을 때만) -->
        <div
          v-if="menuTitle"
          class="mx-4 border-b border-neutral-200 whitespace-nowrap"
        ></div>

        <div>
          <MenuItem
            v-for="(item, index) in menuItems"
            :key="index"
            v-slot="{ active }"
            as="div"
          >
            <button
              :class="[
                'w-full h-[2.25rem] px-4 py-2 text-left text-sm font-medium text-neutral-700 transition-colors rounded-md flex items-center gap-2',
                active ? item.activeClass || 'bg-neutral-50' : '',
                item.class || '',
              ]"
              @click.stop="handleItemClick(item)"
              :disabled="item.disabled"
            >
              <img
                v-if="item.icon"
                :src="item.icon"
                :alt="item.label"
                class="w-4 h-4 flex-shrink-0"
              />
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
      "absolute right-0 top-full mt-2 px-1.5 pt-1.5 pb-2 w-38 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 py-1 focus:outline-none",
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
  // 메뉴 제목
  menuTitle: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["item-click"]);

// 계산된 메뉴 클래스 (위치에 따라 다름)
const computedMenuClass = computed(() => {
  // menuClass prop이 제공되면 그것을 사용, 아니면 기본 클래스 사용
  if (props.menuClass) {
    return props.menuClass;
  }

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
