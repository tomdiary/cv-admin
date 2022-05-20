import { urlMark } from '../_config'
import { encryptAccessToken, encryptRefreshToken } from '../_utils'

const user = {
  admin: {
    id: 1,
    name: '超级管理员',
    username: 'admin',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    avatar: 'https://i.loli.net/2021/09/26/YtP2Z9BrA3co8Vh.jpg'
  },
  test: {
    id: 2,
    name: '测试员',
    username: 'test',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    avatar: 'https://i.loli.net/2021/09/26/YtP2Z9BrA3co8Vh.jpg'
  },
  dev: {
    id: 3,
    name: '开发员',
    username: 'dev',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    avatar: 'https://i.loli.net/2021/09/26/YtP2Z9BrA3co8Vh.jpg'
  }
}

export default [
  {
    url: `${urlMark}user/login`,
    method: 'POST',
    response: res => {
      const { username, password } = res.body
      const userlist = Object.keys(user)
      if (!userlist.includes(username)) return { code: 50001, msg: '账户或密码错误' }
      if (user[username].password !== password) return { code: 50001, msg: '账户或密码错误' }
      return {
        code: 200,
        data: {
          accessToken: encryptAccessToken(user.admin),
          refreshToken: encryptRefreshToken(user.admin),
          userInfo: user.admin
        }
      }
    }
  },
  {
    url: `${urlMark}user/logout`,
    method: 'POST',
    response: () => ({
      code: 0,
      msg: '退出成功'
    })
  }
]
