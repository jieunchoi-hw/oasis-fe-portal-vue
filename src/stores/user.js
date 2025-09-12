import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 로컬 스토리지에서 사용자 정보와 역할 읽기
const getSavedState = () => {
  try {
    const savedRole = localStorage.getItem("userRole");
    const savedUserData = localStorage.getItem("userData");

    return {
      role: savedRole || null,
      user: savedUserData ? JSON.parse(savedUserData) : null,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("로컬 스토리지에서 사용자 정보를 읽는 중 오류:", error);
    return {
      role: null,
      user: null,
    };
  }
};

export const useUserStore = defineStore("user", () => {
  // State - 로컬 스토리지에서 상태 복원 또는 기본값 사용
  const savedState = getSavedState();
  const user = ref(savedState.user);
  const role = ref(savedState.role);
  const currentAccountType = ref(
    localStorage.getItem("currentAccountType") || null
  );
  const isAuthenticated = computed(() => !!user.value);

  // Helper function to decode Base64 strings with UTF-8 support
  const decodeBase64UTF8 = (str) => {
    if (!str || typeof str !== "string") return str;
    try {
      const bytes = Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Base64 UTF-8 decoding failed for:", str, error);
      return str; // 디코딩 실패 시 원본 반환
    }
  };

  // Actions
  const setUser = (apiResponse) => {
    // API 응답에서 data 부분만 추출하여 저장
    const rawUserData = apiResponse?.data || apiResponse;

    if (rawUserData) {
      // 역할 설정
      if (rawUserData.is_system_admin) {
        role.value = "system";
        localStorage.setItem("userRole", "system");
        setAccountType("System");
      } else if (rawUserData.is_tenant_admin) {
        role.value = "tenant";
        localStorage.setItem("userRole", "tenant");
        setAccountType("Tenant");
      } else {
        logout();
        return;
      }

      // Base64 UTF-8 디코딩
      const decodedCompanyName = decodeBase64UTF8(rawUserData.company_name);
      const decodedUserName = decodeBase64UTF8(rawUserData.user_name);
      const decodedPositionTitle = decodeBase64UTF8(rawUserData.position_title);
      const decodedWorkspaces =
        rawUserData.workspaces?.map((workspace) => ({
          ...workspace,
          workspace_name: decodeBase64UTF8(workspace.workspace_name),
        })) || [];

      // 최종 사용자 데이터 생성
      const finalUserData = {
        ...rawUserData,
        company_name: decodedCompanyName,
        user_name: decodedUserName,
        position_title: decodedPositionTitle,
        workspaces: decodedWorkspaces,
        time: new Date().getTime(),
      };

      // 사용자 데이터를 상태와 로컬 스토리지에 저장
      user.value = finalUserData;
      localStorage.setItem("userData", JSON.stringify(finalUserData));
    }
  };

  // 계정 타입 변경 (System, Tenant)
  const setAccountType = (accountType) => {
    currentAccountType.value = accountType;
    localStorage.setItem("currentAccountType", accountType);
  };

  const logout = () => {
    user.value = null;
    role.value = null;
    currentAccountType.value = null;
    // 로컬 스토리지 정리
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    localStorage.removeItem("currentAccountType");
  };

  const updateUser = (userData) => {
    if (user.value) {
      const updatedData = { ...user.value, ...userData };
      user.value = updatedData;
      localStorage.setItem("userData", JSON.stringify(updatedData));
    }
  };

  // Computed getters for easy access to user properties
  const userData = computed(() => user.value);
  const userRole = computed(() => role.value);
  const userInfo = computed(() => user.value);
  const accountId = computed(() => user.value?.account_id || null);
  const userName = computed(() => user.value?.user_name || null);
  const userEmail = computed(() => user.value?.user_email || null);
  const companyName = computed(() => user.value?.company_name || null);
  const companyCode = computed(() => user.value?.company_code || null);
  const positionTitle = computed(() => user.value?.position_title || null);
  const tenantId = computed(() => user.value?.tenant_id || null);
  const tenantCode = computed(() => user.value?.tenant_code || null);
  const tenantUuid = computed(() => user.value?.tenant_uuid || null);
  const userUuid = computed(() => user.value?.user_uuid || null);
  const userSeqId = computed(() => user.value?.user_seq_id || null);
  const employeeId = computed(() => user.value?.employee_id || null);
  const isSystemAdmin = computed(() => user.value?.is_system_admin || false);
  const isTenantAdmin = computed(() => user.value?.is_tenant_admin || false);
  const workspaces = computed(() => user.value?.workspaces || []);
  const failLogin = computed(() => user.value?.fail_login || 0);
  const metadata = computed(() => user.value?.metadata || null);

  // Legacy getters for backward compatibility
  const getUserInfo = () => user.value;
  const getIsAuthenticated = () => isAuthenticated.value;

  return {
    // State
    user,
    role,
    currentAccountType,
    isAuthenticated,

    // Actions
    setUser,
    setAccountType,
    logout,
    updateUser,

    // Computed getters
    userData,
    userRole,
    userInfo,
    accountId,
    userName,
    userEmail,
    companyName,
    companyCode,
    positionTitle,
    tenantId,
    tenantCode,
    tenantUuid,
    userUuid,
    userSeqId,
    employeeId,
    isSystemAdmin,
    isTenantAdmin,
    workspaces,
    failLogin,
    metadata,

    // Legacy getters
    getUserInfo,
    getIsAuthenticated,
  };
});
