import requests, { HTTP_POST, HTTP_GET } from '@/utils/requests'

export const userLogin = data => HTTP_POST({ url: 'user/login', data }) // 登录
export const userStatusUpdate = data => HTTP_POST({ url: 'user/status/update', data }) // 刷新token
export const UserLogout = () => HTTP_POST({ url: 'user/logout' }) // 退出登录
