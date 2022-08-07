import { encode, decode } from 'js-base64'
import { SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from './_config'
import moment from 'moment'

// 生成 AccessToken
export const encryptAccessToken = data => {
  const tokenData = {
    userInfo: data,
    key: SECRET_KEY,
    maturityTime: moment().valueOf() + ACCESS_TOKEN_TIME
  }
  return encode(JSON.stringify(tokenData))
}

// 解密 AccessToken
export const decryptAccessToken = data => JSON.parse(decode(data))

// 生成 RefreshToken
export const encryptRefreshToken = data => {
  const tokenData = {
    userInfo: data,
    key: SECRET_KEY,
    maturityTime: moment().valueOf() + REFRESH_TOKEN_TIME
  }
  return encode(JSON.stringify(tokenData))
}

// 解密 RefreshToken
export const decryptRefreshToken = data => JSON.parse(decode(data))

// 随机数
export const genBetweenAll = (m, n) => Math.floor(Math.random() * (n - m + 1)) + m

// 检测 token 是否到期
export const detectTokenExpiration = data => {
  if (!data.authorization) return 1
  const token = data.authorization.split(' ')
  if (token.length < 1) return 1
  // decryptAccessToken(data.authorization)
}
