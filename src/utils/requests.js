/**
 * @description 封装axios
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import axios from 'axios'
import { useUserStore } from '@/store/user'
// import { ElMessage } from 'element-plus'

const requests = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求体拦截器
requests.interceptors.request.use(request => {
  const userStore = useUserStore()
  // 携带token
  if (userStore.accessToken && userStore.refreshToken) {
    request.headers.Authorization = `Bearer ${userStore.accessToken}`
  }
  return request
}, error => Promise.reject(error))

// 响应体拦截器
requests.interceptors.response.use(response => response, error => Promise.reject(error))

export default requests
