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

  // Actions
  const login = async (credentials) => {
    isLoading.value = true;
    try {
      // 실제 API 호출로 교체하세요
      const response = await mockLogin(credentials);

      user.value = response.user;
      token.value = response.token;

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isAuthenticated", "true");

      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

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
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    isLoading.value = true;
    try {
      const userData = await getUserInfo();
      user.value = userData;
      localStorage.setItem("user", JSON.stringify(userData));
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
    login,
    logout,
    initializeAuth,
    updateUser,
    fetchUserInfo,
  };
});

// Mock API function - 실제 API로 교체하세요
async function mockLogin(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === "admin@example.com" &&
        credentials.password === "password"
      ) {
        resolve({
          user: {
            id: 1,
            name: "관리자",
            email: "admin@example.com",
            avatar: null,
          },
          token: "mock-jwt-token-" + Date.now(),
        });
      } else {
        reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
      }
    }, 1000);
  });
}
