import axios from "axios";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? "" : import.meta.env.VITE_API_BASE_URL, // 개발 환경에서는 proxy 사용
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 전송을 위해 추가
});

// 쿠키에서 토큰 가져오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// 요청 인터셉터 - OASIS_TOKEN 쿠키를 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("OASIS_TOKEN");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 사용자 정보 가져오기
export const getUserInfo = async () => {
  const response = await apiClient.post("/api/auth/user/my");
  return response.data;
};

export default apiClient;
