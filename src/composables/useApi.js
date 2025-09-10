import { ref, readonly } from 'vue';
import { useToast } from './useToast';

/**
 * 공통 API 호출 Composable
 * API 호출의 로딩 상태, 에러 처리, 데이터 관리를 담당
 */
export function useApi() {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);
  const { showSuccess, showError } = useToast();

  /**
   * API 호출 실행
   * @param {Function} apiCall - 실행할 API 함수
   * @param {Object} options - 옵션
   * @param {boolean} options.showLoading - 로딩 상태 표시 여부
   * @returns {Promise} API 응답 데이터
   */
  const execute = async (apiCall, options = {}) => {
    const { showLoading = true } = options;

    try {
      if (showLoading) {
        loading.value = true;
      }
      error.value = null;

      const response = await apiCall();
      data.value = response?.data || response;

      // showSuccess('작업이 완료되었습니다.');

      return response?.data || response;
    } catch (err) {
      error.value = err;

      console.error('API Error:', err);

      // 항상 에러 토스트 표시
      let finalErrorMessage = '오류가 발생했습니다.';
      if (err.response?.data?.message) {
        finalErrorMessage = err.response.data.message;
      } else if (err.message) {
        finalErrorMessage = err.message;
      }

      showError(finalErrorMessage);

      throw err;
    } finally {
      if (showLoading) {
        loading.value = false;
      }
    }
  };

  /**
   * 에러 초기화
   */
  const clearError = () => {
    error.value = null;
  };

  /**
   * 데이터 초기화
   */
  const clearData = () => {
    data.value = null;
  };

  /**
   * 모든 상태 초기화
   */
  const reset = () => {
    loading.value = false;
    error.value = null;
    data.value = null;
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    execute,
    clearError,
    clearData,
    reset,
  };
}

/**
 * 페이지네이션과 함께 사용하는 API Composable
 */
export function usePaginatedApi() {
  const { execute, loading, error } = useApi();
  const { showError } = useToast();

  const items = ref([]);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  /**
   * 페이지네이션된 데이터 로드
   * @param {Function} apiCall - API 호출 함수
   * @param {Object} params - 추가 파라미터
   * @param {Object} options - API 호출 옵션
   */
  const loadPage = async (apiCall, params = {}, options = {}) => {
    const queryParams = {
      page: pagination.value.page,
      limit: pagination.value.limit,
      ...params,
    };

    try {
      const response = await execute(() => apiCall(queryParams), {
        showError: false, // 여기서는 직접 처리
        ...options,
      });

      items.value = response.items || response.data || [];
      pagination.value = {
        ...pagination.value,
        total: response.total || 0,
        totalPages:
          response.totalPages ||
          Math.ceil((response.total || 0) / pagination.value.limit),
      };

      return response;
    } catch (err) {
      // 페이지네이션 에러 처리
      const errorMessage =
        err.response?.data?.message ||
        '데이터를 불러오는 중 오류가 발생했습니다.';
      showError(errorMessage);
      throw err;
    }
  };

  /**
   * 다음 페이지로 이동
   */
  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page++;
    }
  };

  /**
   * 이전 페이지로 이동
   */
  const previousPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page--;
    }
  };

  /**
   * 특정 페이지로 이동
   * @param {number} page - 페이지 번호
   */
  const goToPage = page => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page;
    }
  };

  /**
   * 페이지 크기 변경
   * @param {number} limit - 페이지 크기
   */
  const changePageSize = limit => {
    pagination.value.limit = limit;
    pagination.value.page = 1;
  };

  return {
    loading,
    error,
    items: readonly(items),
    pagination: readonly(pagination),
    loadPage,
    nextPage,
    previousPage,
    goToPage,
    changePageSize,
  };
}
