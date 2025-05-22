/**
 * @description 封装axios
 * @author TomDiary
 * @link https://github.com/tomdiary
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/moduels/user'

const requests = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求体拦截器
requests.interceptors.request.use(request => {
  console.log(request.headers)
  const userStore = useUserStore()
  // 携带token
  if (userStore.accessToken && userStore.refreshToken) {
    request.headers.Authorization = `Bearer ${userStore.accessToken}`
  }
  if (request.headers['Request-Loading']) {}
  return request
}, error => Promise.reject(error))

// 响应体拦截器
requests.interceptors.response.use(response => {
  return response.data
}, error => {
  const { status, data } = error.response
  if (status === 400) {
    ElMessage({
      message: data.msg || '系统服务异常，请联系管理员处理',
      type: 'warning',
      duration: 2600
    })
    return Promise.reject(error)
  } else {
    ElMessage({
      message: '系统服务异常，请联系管理员处理',
      type: 'warning',
      duration: 2600
    })
    return Promise.reject(error)
  }
})

export default requests

/**
 * GET请求
 * @param {object} data - 数据体
 * @param {string} url - 接口地址
 * @param {object} headers - 请求头
 * @param {object} about - 补充参数
 * @param {number} fe - 成功响应体是否再次区分 reject, 1-是, 0-否
 * @param {number} error - 成功响应体中如果遇到 error 是否需要 reject 返回, 1-是, 0-否
 * @param {number} loading - 是否需要 Loading, 1-是, 0-否
 */
export const HTTP_GET = ({ data = {}, url = '', headers = {}, fe = 1, loading = 0, error = 1,  about = {} }) => {
  const HTTP_HEADERS = {
    ...headers,
    'Request-Error': error ? 'reject' : 'resolve',
    'Request-FE': fe,
    'Request-Loading': loading,
  }
  return requests({
    url,
    method: 'GET',
    params: data,
    headers: HTTP_HEADERS,
    ...about
  })
}

/**
 * GET请求
 * @param {object} employee.data - 数据体
 * @param {object} employee.params - url 参数
 * @param {string} employee.url - 接口地址
 * @param {object} employee.headers - 请求头
 * @param {object} employee.about - 补充参数
 * @param {Number} employee.ct 请求数据类型: 1=application/json（JSON传值）, 0=application/x-www-form-urlencoded（FormData传值）
 * @param {number} employee.fe - 成功响应体是否再次区分 reject, 1-是, 0-否
 * @param {number} employee.error - 成功响应体中如果遇到 error 是否需要 reject 返回, 1-是, 0-否
 * @param {number} employee.loading - 是否需要 Loading, 1-是, 0-否
 */
export const HTTP_POST = ({ data = {}, params = {}, url = '', headers = {}, ct = 1, fe = 1, loading = 0, error = 1,  about = {} }) => {
  const HTTP_HEADERS = {
    ...headers,
    'Content-Type': ct ? 'application/json' : 'application/x-www-form-urlencoded',
    'Request-Error': error ? 'reject' : 'resolve',
    'Request-FE': fe,
    'Request-Loading': loading,
  }
  return requests({
    url,
    method: 'POST',
    params,
    data,
    headers: HTTP_HEADERS,
    ...about
  })
}
