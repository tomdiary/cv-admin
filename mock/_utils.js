import { encode, decode } from 'js-base64'
import { secretKey, accessTokenTime, refreshTokenTime } from './_config'
import moment from 'moment'

export const encryptAccessToken = data => {
  const tokenData = {
    userInfo: data,
    key: secretKey,
    maturityTime: moment().valueOf() + accessTokenTime
  }
  return encode(JSON.stringify(tokenData))
}

export const decryptAccessToken = data => JSON.parse(decode(data))

export const encryptRefreshToken = data => {
  const tokenData = {
    userInfo: data,
    key: secretKey,
    maturityTime: moment().valueOf() + refreshTokenTime
  }
  return encode(JSON.stringify(tokenData))
}
