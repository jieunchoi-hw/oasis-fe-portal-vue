// src/composables/useAuth.js
import { useCookies } from "./useCookies";
import { useToken } from "./useToken";
import { useAuthStore } from "../stores/auth.js";

export function useAuth() {
  const cookies = useCookies();
  const token = useToken();

  function getToken() {
    return token.getToken ? token.getToken() : cookies.getCookie("token");
  }

  function isAuthenticated() {
    return !!getToken();
  }

  // 사용자 정보 가져오기
  async function fetchUser() {
    const authStore = useAuthStore(); // 함수 내부에서 호출
    return await authStore.fetchUserInfo();
  }

  // 현재 사용자 정보 반환
  function getCurrentUser() {
    const authStore = useAuthStore(); // 함수 내부에서 호출
    return authStore.user;
  }

  // store의 computed 값들을 반환하는 함수들
  function getUser() {
    const authStore = useAuthStore();
    return authStore.user;
  }

  function getUserName() {
    const authStore = useAuthStore();
    return authStore.userName;
  }

  function getUserEmail() {
    const authStore = useAuthStore();
    return authStore.userEmail;
  }

  function getLoadingState() {
    const authStore = useAuthStore();
    return authStore.isLoading;
  }

  // 토큰 설정 (쿠키에 저장)
  function setToken(tokenValue) {
    cookies.setCookie("OASIS_TOKEN", tokenValue, 30); // 30일 유효
    if (token.setToken) {
      token.setToken(tokenValue);
    }
  }

  // 앱 초기화 (토큰 설정 후 사용자 정보 가져오기)
  async function initializeApp(
    tokenValue = "choijieun:59973834-ca1b-4432-90f3-dcf9a0551a92"
  ) {
    try {
      // 토큰 설정
      setToken(tokenValue);

      // 사용자 정보 가져오기
      const result = await fetchUser();

      if (result.success) {
        console.log("앱 초기화 성공 - 사용자 정보:", result.data);
        return { success: true, data: result.data };
      } else {
        console.error("사용자 정보 가져오기 실패:", result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("앱 초기화 중 오류:", error);
      return { success: false, error: error.message };
    }
  }

  return {
    getToken,
    isAuthenticated,
    fetchUser,
    getCurrentUser,
    getUser,
    getUserName,
    getUserEmail,
    getLoadingState,
    setToken,
    initializeApp,
  };
}
