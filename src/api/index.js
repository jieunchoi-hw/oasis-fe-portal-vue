import axios from "axios";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 사용자 정보 가져오기
export const getUserInfo = async () => {
  const response = await apiClient.post("/auth/user/my");
  return response.data;
};

export const login = async (account_id, password) => {
  const response = await apiClient.post("/auth/user/login", {
    account_id,
    password,
  });
  return response;
};

export default apiClient;
