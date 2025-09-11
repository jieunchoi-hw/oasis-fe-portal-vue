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
        <!-- 메뉴 제목 -->
        <div v-if="menuTitle" class="px-5 pt-4">
          <h3 class="text-base font-semibold text-neutral-900">
            {{ menuTitle }}
          </h3>
        </div>

        <div class="relative">
          <div
            ref="scrollContainer"
            class="px-1 py-2 max-h-90 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent"
          >
            <MenuItem
              v-for="(item, index) in notifications"
              :key="index"
              v-slot="{ active }"
              as="div"
            >
              <button
                :class="[
                  'w-full text-left px-5 py-3 transition-colors rounded-md',
                  active ? 'bg-neutral-50' : '',
                  item.class || '',
                ]"
                @click.stop="handleNotificationClick(item)"
                :disabled="item.disabled"
              >
                <div class="flex items-start gap-4">
                  <!-- 알림 아이콘 -->
                  <div class="flex-shrink-0 w-5 h-5 mt-0.5">
                    <div
                      class="w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <img :src="item.icon" :alt="item.type" class="w-5 h-5" />
                    </div>
                  </div>

                  <!-- 알림 내용 -->
                  <div class="flex-1 min-w-0">
                    <div
                      class="flex flex-col items-start justify-between gap-0.5"
                    >
                      <h4 class="text-sm font-bold text-neutral-700">
                        {{ item.label }}
                      </h4>
                      <p class="text-sm text-neutral-700 leading-relaxed">
                        {{ item.message }}
                      </p>
                      <p
                        class="text-xs font-medium text-neutral-400 flex-shrink-0"
                      >
                        {{ item.time }}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </MenuItem>
          </div>

          <!-- 하단 그라데이션 -->
          <div
            ref="overlay"
            v-if="notifications.length > 0"
            class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-xl transition-opacity duration-300"
          ></div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { computed, ref, onUnmounted, watch } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import notificationBellIcon from "@/assets/icons/notification-bell.svg";

const props = defineProps({
  // 알림 아이템들
  notifications: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) =>
          typeof item === "object" &&
          typeof item.label === "string" &&
          typeof item.message === "string" &&
          typeof item.type === "string" &&
          typeof item.time === "string" &&
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
    default: notificationBellIcon,
  },
  iconAlt: {
    type: String,
    default: "알림",
  },
  iconClass: {
    type: String,
    default: "w-4.5 h-4.5",
  },
  // 메뉴 스타일 클래스
  menuClass: {
    type: String,
    default: "",
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
    default: "right",
    validator: (value) => {
      return ["right", "left", "top-right", "top-left", "center"].includes(
        value
      );
    },
  },
  // 메뉴 제목
  menuTitle: {
    type: String,
    default: "알림",
  },
});

const emit = defineEmits(["notification-click"]);

const overlay = ref(null);
const scrollContainer = ref(null);

// 스크롤 이벤트 핸들러
const FADE_THRESHOLD = 100;

const handleScroll = () => {
  if (!overlay.value || !scrollContainer.value) return;

  const el = scrollContainer.value;
  const scrollTop = el.scrollTop;
  const clientHeight = el.clientHeight;
  const scrollHeight = el.scrollHeight;
  const bottomDistance = scrollHeight - (scrollTop + clientHeight);

  const targetOpacity =
    bottomDistance <= FADE_THRESHOLD
      ? Math.max(0, bottomDistance / FADE_THRESHOLD)
      : 1;

  overlay.value.style.opacity = String(targetOpacity);
};

let scrollListenerAdded = false;

// 스크롤 컨테이너가 준비되었을 때 이벤트 리스너 추가
const setupScrollListener = () => {
  if (scrollContainer.value && !scrollListenerAdded) {
    scrollContainer.value.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    scrollListenerAdded = true;
  }
};

watch(scrollContainer, (newValue) => {
  if (newValue) {
    setupScrollListener();
  }
});

onUnmounted(() => {
  if (scrollContainer.value && scrollListenerAdded) {
    scrollContainer.value.removeEventListener("scroll", handleScroll);
  }
});

// 계산된 메뉴 클래스 (위치에 따라 다름)
const computedMenuClass = computed(() => {
  if (props.menuClass) {
    return props.menuClass;
  }

  const baseClass =
    "absolute w-80 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 py-1 focus:outline-none";

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

const handleNotificationClick = (notification) => {
  if (notification.disabled) return;

  // 알림의 action 함수 실행
  if (typeof notification.action === "function") {
    notification.action();
  }

  // 상위 컴포넌트에 이벤트 전달
  emit("notification-click", notification);
};
</script>
