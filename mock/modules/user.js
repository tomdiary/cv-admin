import { accessTokenTime, refreshTokenTime } from '../_config'
import { encode } from 'js-base64'

export default [
  {
    url: '/mock-api/user/login',
    method: 'POST',
    response: res => {
      if (res.body.username !== 'admin' || res.body.password !== '123456') {
        return {
          code: 1,
          msg: '账户或密码错误'
        }
      }
      return {
        code: 0,
        data: {
          accessToken: encode(String(new Date().getTime() + accessTokenTime)),
          refreshToken: encode(String(new Date().getTime() + refreshTokenTime)),
          userInfo: {
            id: 1,
            name: '柒比叁',
            avatar: 'https://i.loli.net/2021/09/26/YtP2Z9BrA3co8Vh.jpg'
          }
        }
      }
    }
  },
  {
    url: '/mock-api/user/logout',
    method: 'POST',
    response: () => ({
      code: 0,
      msg: '退出成功'
    })
  }
]
