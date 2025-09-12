/**
 * 날짜 관련 유틸리티 함수들
 */

/**
 * ISO 날짜 문자열을 YYYY-MM-DD HH:MM:SS 형식으로 변환
 * @param {string} isoString - ISO 형식의 날짜 문자열 (예: "2025-08-01T05:16:16.434915Z")
 * @param {Object} options - 옵션
 * @param {boolean} options.includeTime - 시간 포함 여부 (기본값: true)
 * @param {boolean} options.includeSeconds - 초 포함 여부 (기본값: true)
 * @returns {string} 포맷된 날짜 문자열
 */
export function formatDate(isoString, options = {}) {
  if (!isoString) return '';

  const { includeTime = true, includeSeconds = true } = options;

  try {
    const date = new Date(isoString);

    // 유효하지 않은 날짜인 경우
    if (isNaN(date.getTime())) {
      return isoString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let formatted = `${year}-${month}-${day}`;

    if (includeTime) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      formatted += ` ${hours}:${minutes}`;

      if (includeSeconds) {
        const seconds = String(date.getSeconds()).padStart(2, '0');
        formatted += `:${seconds}`;
      }
    }

    return formatted;
  } catch (error) {
    console.error('Date formatting error:', error);
    return isoString;
  }
}

/**
 * 날짜만 표시 (시간 제외)
 * @param {string} isoString - ISO 형식의 날짜 문자열
 * @returns {string} YYYY-MM-DD 형식의 날짜
 */
export function formatDateOnly(isoString) {
  return formatDate(isoString, { includeTime: false });
}

/**
 * 시간까지만 표시 (초 제외)
 * @param {string} isoString - ISO 형식의 날짜 문자열
 * @returns {string} YYYY-MM-DD HH:MM 형식의 날짜
 */
export function formatDateTime(isoString) {
  return formatDate(isoString, { includeTime: true, includeSeconds: false });
}

/**
 * 상대적 시간 표시 (예: "2시간 전", "3일 전")
 * @param {string} isoString - ISO 형식의 날짜 문자열
 * @returns {string} 상대적 시간 문자열
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';

  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return '방금 전';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return formatDateOnly(isoString);
    }
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return isoString;
  }
}
