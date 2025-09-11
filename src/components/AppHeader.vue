<template>
  <header
    class="bg-white border-b border-neutral-200 h-16 px-10 flex items-center justify-between fixed top-0 left-0 right-0 z-50"
  >
    <!-- 왼쪽 영역: 로고 + 탭 네비게이션 -->
    <div class="flex items-center gap-12">
      <!-- OASIS 로고 -->
      <div class="flex items-center">
        <img src="@/assets/icons/oasis-logo.svg" alt="OASIS" class="w-28 h-7" />
      </div>

      <!-- 탭 네비게이션 -->
      <nav class="flex items-center gap-1">
        <!-- <router-link
          to="/ai-assistant"
          class="px-3 py-2 text-base font-semibold transition-colors h-9 flex items-center"
          :class="
            $route.path === '/ai-assistant' || $route.path === '/'
              ? 'text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-700'
          "
        >
          AI 비서
        </router-link> -->

        <a
          href="https://oasis.haiqv.ai/portal"
          rel="noopener noreferrer"
          class="px-3 py-2 text-base font-semibold transition-colors h-9 flex items-center text-neutral-500"
        >
          AI 비서
        </a>
        <router-link
          to="/rag"
          class="px-3 py-2 text-base font-semibold transition-colors h-9 flex items-center"
          :class="
            $route.path.startsWith('/rag')
              ? 'text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-700'
          "
        >
          문서 저장소
        </router-link>
      </nav>
    </div>

    <!-- 우측 메뉴 -->
    <div class="flex items-center gap-8">
      <!-- 사용자 프로필 드롭다운 -->
      <div class="relative">
        <Listbox v-model="selectedTeam">
          <ListboxButton
            class="w-60 flex items-center gap-2.5 px-4 py-2 bg-background-neutral border border-neutral-200 rounded-full cursor-pointer hover:bg-neutral-50 transition-colors h-9"
          >
            <div
              class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              :class="selectedTeam.colorClass"
            >
              <span class="text-white text-xs font-semibold leading-none">
                {{ selectedTeam.initial }}
              </span>
            </div>
            <span class="text-sm font-medium text-neutral-900">
              {{ selectedTeam.name }}
            </span>
            <img
              src="@/assets/icons/down-arrow.svg"
              alt="드롭다운"
              class="w-3 h-2 transition-transform duration-200 flex-shrink-0 ml-auto"
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
              class="w-60 absolute right-0 mt-2 bg-dropdown-background-normal border border-neutral-200 rounded-xl shadow-lg z-[9999] focus:outline-none"
              @open="isOpen = true"
              @close="isOpen = false"
            >
              <div class="p-1.5">
                <ListboxOption
                  v-for="team in teams"
                  :key="team.id"
                  :value="team"
                  :disabled="team.unavailable"
                  v-slot="{ active, selected }"
                  class="cursor-pointer select-none relative"
                >
                  <li
                    :class="[
                      active ? 'bg-blue-50' : '',
                      selected ? '' : '',
                      team.unavailable ? 'opacity-50 cursor-not-allowed' : '',
                      'relative flex items-center gap-2.5 px-4 py-2 rounded-md h-10 ',
                    ]"
                  >
                    <div
                      class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      :class="team.colorClass"
                    >
                      <span
                        class="text-white text-xs font-medium leading-tight"
                      >
                        {{ team.initial }}
                      </span>
                    </div>
                    <span
                      class="text-sm font-medium flex-1"
                      :class="[
                        selected
                          ? 'text-blue-600 font-semibold'
                          : 'text-neutral-700 font-medium',
                        team.unavailable ? 'text-neutral-400' : '',
                      ]"
                    >
                      {{ team.name }}
                    </span>
                  </li>
                </ListboxOption>
              </div>
            </ListboxOptions>
          </transition>
        </Listbox>
      </div>

      <!-- 알림 및 사용자 아이콘 -->
      <div class="flex items-center gap-4">
        <!-- 알림 메뉴 -->
        <div class="relative">
          <AppNotificationMenu
            :notifications="notifications"
            :button-class="'relative w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity'"
            :icon-src="notificationIcon"
            icon-alt="알림"
            :icon-class="'w-6 h-6'"
            :menu-class="'absolute right-0 top-full mt-3 w-[22.5rem] bg-white border border-neutral-200 rounded-xl shadow-lg z-10 focus:outline-none'"
            menu-position="right"
            menu-title="알림"
            @notification-click="handleNotificationClick"
          />
          <!-- 알림 배지 -->
          <span
            class="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center bg-primary-neutral leading-none pointer-events-none"
          >
            {{ notifications.length }}
          </span>
        </div>

        <!-- 사용자 프로필 메뉴 -->
        <AppMenu
          :menu-items="userMenuItems"
          :button-class="'relative w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity'"
          :icon-src="userProfileIcon"
          icon-alt="사용자 프로필"
          :icon-class="'w-6 h-6'"
          :menu-class="'absolute right-0 top-full mt-3 px-1.5 pt-1.5 pb-2 w-60 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 focus:outline-none user-profile-menu'"
          menu-position="right"
          :menu-style="'box-shadow: 2px 6px 12px 2px rgba(0, 0, 0, 0.04), 0px 2px 2px 0px rgba(0, 0, 0, 0.02);'"
          menu-title="김한화 / kim@hanwha.com"
          @item-click="handleUserMenuClick"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import AppNotificationMenu from "@/components/AppNotificationMenu.vue";
import AppMenu from "@/components/AppMenu.vue";
import notificationBellIcon from "@/assets/icons/notification-bell.svg";
import userProfileIcon from "@/assets/icons/user-profile.svg";
import settingIcon from "@/assets/icons/setting-icon.svg";
import logoutIcon from "@/assets/icons/logout-icon.svg";

import infoIcon from "@/assets/icons/alram/info.svg";
import successIcon from "@/assets/icons/alram/success.svg";
import warningIcon from "@/assets/icons/alram/warning.svg";
import errorIcon from "@/assets/icons/alram/error.svg";

// 드롭다운 상태 관리
const isOpen = ref(false);

// 팀 데이터 (피그마 디자인 기준)
const teams = [
  {
    id: 1,
    name: "AI 솔루션팀",
    initial: "A",
    colorClass: "figma-purple", // #B173EA
    unavailable: false,
  },
  {
    id: 2,
    name: "공통솔루션팀",
    initial: "공",
    colorClass: "figma-blue", // #82B3FF
    unavailable: false,
  },
  {
    id: 3,
    name: "제조솔루션팀",
    initial: "제",
    colorClass: "figma-yellow", // #FFBB33
    unavailable: false,
  },
  {
    id: 4,
    name: "금융솔루션팀",
    initial: "금",
    colorClass: "figma-teal", // #66CBB8
    unavailable: false,
  },
  {
    id: 5,
    name: "금융사업 1팀",
    initial: "금",
    colorClass: "figma-gray", // #5F6368
    unavailable: false,
  },
];

// 선택된 팀 (기본값: AI 솔루션팀)
const selectedTeam = ref(teams[0]);

// 알림 아이콘
const notificationIcon = notificationBellIcon;

// 사용자 프로필 메뉴 아이템들
const userMenuItems = ref([
  {
    label: "설정",
    icon: settingIcon,
    action: () => handleUserAction("settings"),
    class: "h-[2.625rem]",
  },
  {
    label: "로그아웃",
    icon: logoutIcon,
    action: () => handleUserAction("logout"),
    class: "h-[2.625rem]",
  },
]);

// 알림 데이터
const notifications = ref([
  {
    label: "Info",
    message: "다른 팀원이 공유한 비서를 활용할 수 있어요.",
    time: "3일 전",
    icon: infoIcon,
    type: "info",
    action: () => handleNotificationClick("info"),
  },
  {
    label: "Success",
    message: "새로운 비서가 성공적으로 생성됐어요!",
    time: "2시간 전",
    icon: successIcon,
    type: "success",
    action: () => handleNotificationClick("success"),
  },
  {
    label: "Warning",
    message:
      "아직 저장되지 않은 대화가 있어요. 페이지를 나가기 전에 비서와의 대화를 확인해주세요.",
    time: "2시간 전",
    icon: warningIcon,
    type: "warning",
    action: () => handleNotificationClick("warning"),
  },
  {
    label: "Error",
    message: "비서 생성에 실패했어요.",
    time: "3일 전",
    icon: errorIcon,
    type: "error",
    action: () => handleNotificationClick("error"),
  },
  {
    label: "Error",
    message: "비서 생성에 실패했어요.",
    time: "3일 전",
    icon: errorIcon,
    type: "error",
    action: () => handleNotificationClick("error"),
  },
  {
    label: "Error",
    message: "비서 생성에 실패했어요.",
    time: "3일 전",
    icon: errorIcon,
    type: "error",
    action: () => handleNotificationClick("error"),
  },
  {
    label: "Error",
    message: "비서 생성에 실패했어요.",
    time: "3일 전",
    icon: errorIcon,
    type: "error",
    action: () => handleNotificationClick("error"),
  },
]);

const handleNotificationClick = (type) => {
  // eslint-disable-next-line no-console
  console.log(`알림 클릭: ${type}`);
  // 여기에 알림별 액션 처리 로직 추가
};

// 사용자 메뉴 액션 핸들러
const handleUserAction = (action) => {
  switch (action) {
    case "settings":
      // eslint-disable-next-line no-console
      console.log("설정 페이지로 이동");
      // 설정 페이지로 라우팅 로직 추가
      break;
    case "logout":
      // eslint-disable-next-line no-console
      console.log("로그아웃 처리");
      // 로그아웃 로직 추가
      break;
    default:
      break;
  }
};

// 사용자 메뉴 클릭 핸들러
const handleUserMenuClick = (item) => {
  // eslint-disable-next-line no-console
  console.log(`사용자 메뉴 클릭: ${item.label}`);
};
</script>

<style scoped>
/* 피그마 디자인 색상 정의 - 컬러칩 컴포넌트화 추후 반영*/
.figma-purple {
  background-color: #b173ea;
}

.figma-blue {
  background-color: #82b3ff;
}

.figma-yellow {
  background-color: #ffbb33;
}

.figma-teal {
  background-color: #66cbb8;
}

.figma-gray {
  background-color: #5f6368;
}
</style>
