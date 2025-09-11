import { toast } from "vue3-toastify";
import { h } from "vue";

import successIcon from "../assets/icons/toast/success.svg";
import failIcon from "@/assets/icons/toast/fail.svg";
import warningIcon from "@/assets/icons/toast/warning.svg";

/**
 * SVG 아이콘을 Vue 컴포넌트로 변환하는 함수
 * @param {string} iconUrl - SVG 파일 URL
 * @param {Object} props - 아이콘 속성 (크기, 색상 등)
 * @returns {Function} Vue 컴포넌트 함수
 */
const createIconComponent = (iconUrl, props = {}) => {
  return () =>
    h("img", {
      src: iconUrl,
      alt: "toast-icon",
      style: {
        ...props.style,
      },
      ...props,
    });
};

/**
 * Toast 알림을 쉽게 사용할 수 있는 composable
 * @returns {Object} toast 메서드들을 포함한 객체
 */
export function useToast() {
  /**
   * 성공 메시지 표시
   * @param {string} title - 제목 메시지
   * @param {string} message - 상세 메시지 (선택사항)
   * @param {Object} options - 추가 옵션
   */
  const showSuccess = (title, message = "", options = {}) => {
    // message가 문자열이 아니고 options 객체인 경우 (기존 호출 방식 호환)
    if (
      typeof message === "object" &&
      message !== null &&
      !Array.isArray(message)
    ) {
      options = message;
      message = "";
    }

    const toastContent = message
      ? h("div", [
          h("div", { class: "toast-title" }, title),
          h("div", { class: "toast-message" }, message),
        ])
      : h("div", { class: "toast-title" }, title);

    toast.success(toastContent, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      icon: createIconComponent(successIcon),
      ...options,
    });
  };

  /**
   * 에러 메시지 표시
   * @param {string} title - 제목 메시지
   * @param {string} message - 상세 메시지 (선택사항)
   * @param {Object} options - 추가 옵션
   */
  const showError = (title, message = "", options = {}) => {
    // message가 문자열이 아니고 options 객체인 경우 (기존 호출 방식 호환)
    if (
      typeof message === "object" &&
      message !== null &&
      !Array.isArray(message)
    ) {
      options = message;
      message = "";
    }

    const toastContent = message
      ? h("div", [
          h("div", { class: "toast-title" }, title),
          h("div", { class: "toast-message" }, message),
        ])
      : h("div", { class: "toast-title" }, title);

    toast.error(toastContent, {
      autoClose: 5000,
      position: toast.POSITION.TOP_RIGHT,
      icon: createIconComponent(failIcon),
      ...options,
    });
  };

  /**
   * 정보 메시지 표시
   * @param {string} title - 제목 메시지
   * @param {string} message - 상세 메시지 (선택사항)
   * @param {Object} options - 추가 옵션
   */
  const showInfo = (title, message = "", options = {}) => {
    // message가 문자열이 아니고 options 객체인 경우 (기존 호출 방식 호환)
    if (
      typeof message === "object" &&
      message !== null &&
      !Array.isArray(message)
    ) {
      options = message;
      message = "";
    }

    const toastContent = message
      ? h("div", [
          h("div", { class: "toast-title" }, title),
          h("div", { class: "toast-message" }, message),
        ])
      : h("div", { class: "toast-title" }, title);

    toast.info(toastContent, {
      autoClose: 4000,
      position: toast.POSITION.TOP_RIGHT,
      icon: createIconComponent(warningIcon),
      ...options,
    });
  };

  /**
   * 경고 메시지 표시
   * @param {string} title - 제목 메시지
   * @param {string} message - 상세 메시지 (선택사항)
   * @param {Object} options - 추가 옵션
   */
  const showWarning = (title, message = "", options = {}) => {
    // message가 문자열이 아니고 options 객체인 경우 (기존 호출 방식 호환)
    if (
      typeof message === "object" &&
      message !== null &&
      !Array.isArray(message)
    ) {
      options = message;
      message = "";
    }

    const toastContent = message
      ? h("div", [
          h("div", { class: "toast-title" }, title),
          h("div", { class: "toast-message" }, message),
        ])
      : h("div", { class: "toast-title" }, title);

    toast.warning(toastContent, {
      autoClose: 4000,
      position: toast.POSITION.TOP_RIGHT,
      icon: createIconComponent(warningIcon),
      ...options,
    });
  };

  /**
   * 커스텀 토스트 표시
   * @param {string} message - 표시할 메시지
   * @param {string} type - 토스트 타입 (success, error, info, warning)
   * @param {Object} options - 추가 옵션
   */
  const showToast = (message, type = "info", options = {}) => {
    const defaultOptions = {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "warning":
        toast.warning(message, defaultOptions);
        break;
      case "info":
      default:
        toast.info(message, defaultOptions);
        break;
    }
  };

  /**
   * 프로미스와 함께 사용할 수 있는 토스트
   * @param {Promise} promise - 실행할 프로미스
   * @param {Object} messages - 성공/에러/로딩 메시지
   * @param {Object} options - 추가 옵션
   */
  const showPromiseToast = async (promise, messages = {}, options = {}) => {
    const defaultMessages = {
      pending: "처리 중...",
      success: "성공적으로 완료되었습니다!",
      error: "오류가 발생했습니다.",
      ...messages,
    };

    return toast.promise(promise, defaultMessages, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "auto",
      ...options,
    });
  };

  /**
   * 모든 토스트 닫기
   */
  const dismissAll = () => {
    toast.dismiss();
  };

  /**
   * 특정 토스트 닫기
   * @param {string} toastId - 닫을 토스트 ID
   */
  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    // 기본 메서드
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showToast,

    // 고급 메서드
    showPromiseToast,

    // 관리 메서드
    dismiss,
    dismissAll,

    // 원본 toast 객체 (필요한 경우)
    toast,

    // 위치 상수들
    POSITION: toast.POSITION,
  };
}
