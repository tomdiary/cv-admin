/**
 * @description 公共Storage
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
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

export const getAccessToken = () => cvLocalStorage.get('access_token')

export const getRefreshToken = () => cvLocalStorage.get('refresh_token')
