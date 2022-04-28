/**
 * @description 封装axios
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import axios from 'axios'
import { getAccessToken, getRefreshToken } from '@util/baseStorage'
// import { ElMessage } from 'element-plus'

const requests = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求体拦截器
requests.interceptors.request.use(request => {
  // 携带token
  if (getAccessToken() && getRefreshToken()) {
    request.headers.Authorization = `bearer ${getAccessToken()}`
  }
  return request
}, error => Promise.reject(error))

// 响应体拦截器
requests.interceptors.response.use(response => response, error => Promise.reject(error))

export default requests
