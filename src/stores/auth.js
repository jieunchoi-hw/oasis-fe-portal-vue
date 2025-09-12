import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getUserInfo } from "../api/index.js";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const isLoading = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const userName = computed(() => user.value?.name || "");
  const userEmail = computed(() => user.value?.email || "");

  const initializeAuth = () => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData };
    // localStorage 저장 제거 - 보안상 이유로 메모리에만 저장
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    isLoading.value = true;
    try {
      const userData = await getUserInfo();
      user.value = userData;
      return { success: true, data: userData };
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    user,
    token,
    isLoading,

    // Getters
    isAuthenticated,
    userName,
    userEmail,

    // Actions
    initializeAuth,
    updateUser,
    fetchUserInfo,
  };
});
