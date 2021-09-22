import requests from '@/utils/requests'

export const userLogin = data => requests.post('user/login', data) // 登录
export const userStatusUpdate = data => requests.post('user/status/update', data) // 刷新token
export const UserLogout = () => requests.post('user/logout') // 退出登录
