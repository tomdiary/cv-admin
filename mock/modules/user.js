import { encode } from 'js-base64'

export default [
  {
    url: '/mock-api/user/login',
    method: 'POST',
    response: res => {
      if (res.body.username !== 'admin' && res.body.password !== '123456') {
        return {
          code: 1,
          msg: '账户或密码错误'
        }
      }
      return {
        code: 0,
        data: {
          access_token: encode(String(new Date().getTime() + 1200)), // 20分钟后token到期
          refresh_token: encode(String(new Date().getTime() + 3600)), // 60分钟后token到期
          name: '柒比叁'
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
