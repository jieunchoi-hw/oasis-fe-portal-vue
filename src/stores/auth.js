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

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData };
    // localStorage 저장 제거 - 보안상 이유로 메모리에만 저장
  };

  // Base64 디코딩 함수 (UTF-8 지원)
  const decodeBase64 = (encodedString) => {
    try {
      const bytes = Uint8Array.from(atob(encodedString), (c) =>
        c.charCodeAt(0)
      );
      return new TextDecoder().decode(bytes);
    } catch (error) {
      return encodedString; // 디코딩 실패시 원본 반환
    }
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    isLoading.value = true;
    try {
      const userData = await getUserInfo();

      // Base64 디코딩이 필요한 필드들 처리
      const decodedData = { ...userData.data };

      if (decodedData.user_name) {
        decodedData.user_name = decodeBase64(decodedData.user_name);
      }

      if (decodedData.user_email) {
        decodedData.user_email = decodeBase64(decodedData.user_email);
      }

      if (decodedData.company_name) {
        decodedData.company_name = decodeBase64(decodedData.company_name);
      }

      user.value = decodedData;
      return { success: true, data: decodedData };
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
    updateUser,
    fetchUserInfo,
  };
});
