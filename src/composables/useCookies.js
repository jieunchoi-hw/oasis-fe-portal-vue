import { setCookie, getCookie, deleteCookie } from '@/utils/cookie'

export function useCookies() {
  return {
    setCookie,
    getCookie,
    deleteCookie,
  }
}
