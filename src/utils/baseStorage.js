/**
 * @description 公共Storage
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
export const cvLocalStorage = {
  get(type) {
    return JSON.parse(localStorage.getItem(type))
  },
  set(type, value) {
    return localStorage.setItem(type, JSON.stringify(value))
  },
  remove(type) {
    return localStorage.remove(type)
  },
  clear() {
    return localStorage.clear()
  }
}

export const cvSessionStorage = {
  get(type) {
    return JSON.parse(sessionStorage.getItem(type))
  },
  set(type, value) {
    return sessionStorage.setItem(type, JSON.stringify(value))
  },
  remove(type) {
    return sessionStorage.remove(type)
  },
  clear() {
    return sessionStorage.clear()
  }
}

// access_token
export const getAccessToken = () => cvLocalStorage.get('access_token')

// refresh_token
export const getRefreshToken = () => cvLocalStorage.get('refresh_token')

// sidebar 状态
export const getSidebarStatus = () => cvLocalStorage.get('sidebar_status')

export const setSidebarStatus = status => cvLocalStorage.set('sidebar_status', status)

// 主题模式
export const getThemeMode = () => cvLocalStorage.get('theme_mode')

export const setThemeMode = mode => cvLocalStorage.set('theme_mode', mode)

// 主题大小
export const getThemeSize = () => cvLocalStorage.get('theme_size')

export const setThemeSize = size => cvLocalStorage.set('theme_size', size)

// 国际化
export const getThemeLanguage = () => cvLocalStorage.get('theme_language')

export const setThemeLanguage = language => cvLocalStorage.set('theme_language', language)
