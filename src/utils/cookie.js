// utils/cookie.js

export function setCookie(name, value, options = {}) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.exp != null) {
    const now = Math.floor(Date.now() / 1000)
    const maxAge = options.exp - now
    cookie += `; Max-Age=${maxAge}`
  } else if (options.maxAge != null) {
    cookie += `; Max-Age=${options.maxAge}`
  } else if (options.days != null) {
    const date = new Date()
    date.setDate(date.getDate() + options.days)
    cookie += `; Expires=${date.toUTCString()}`
  }

  cookie += `; Path=${options.path || '/'}`
  if (options.domain) cookie += `; Domain=${options.domain}`
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`
  if (options.secure ?? location.protocol === 'https:') {
    cookie += `; Secure`
  }

  document.cookie = cookie
}

export function getCookie(name) {
  const key = `${encodeURIComponent(name)}=`
  const item = document.cookie.split('; ').find(row => row.startsWith(key))
  return item ? decodeURIComponent(item.slice(key.length)) : undefined
}

export function deleteCookie(name, path = '/', domain) {
  document.cookie =
    `${encodeURIComponent(name)}=; Max-Age=0; Path=${path}` +
    (domain ? `; Domain=${domain}` : '') +
    '; SameSite=Lax'
}
