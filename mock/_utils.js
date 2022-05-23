import { encode, decode } from 'js-base64'
import { SECRET_KEY, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from './_config'
import moment from 'moment'

export const encryptAccessToken = data => {
  const tokenData = {
    userInfo: data,
    key: SECRET_KEY,
    maturityTime: moment().valueOf() + ACCESS_TOKEN_TIME
  }
  return encode(JSON.stringify(tokenData))
}

export const decryptAccessToken = data => JSON.parse(decode(data))

export const encryptRefreshToken = data => {
  const tokenData = {
    userInfo: data,
    key: SECRET_KEY,
    maturityTime: moment().valueOf() + REFRESH_TOKEN_TIME
  }
  return encode(JSON.stringify(tokenData))
}

export const genBetweenAll = (m, n) => Math.floor(Math.random() * (n - m + 1)) + m
