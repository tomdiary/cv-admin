import { URL_MARK } from '../_config'
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
    url: `${URL_MARK}user/login`,
    method: 'POST',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve())
      })
      const { username, password } = JSON.parse(reqbody)
      const userlist = Object.keys(user)
      if (!userlist.includes(username) || user[username].password !== password) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        return res.end(JSON.stringify({ code: 50001, msg: '账户或密码错误' }))
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end(JSON.stringify({
        code: 200,
        data: {
          accessToken: encryptAccessToken(user[username]),
          refreshToken: encryptRefreshToken(user[username]),
          userInfo: user[username]
        }
      }))
    },
    // response: (res) => {
      // console.log(res)
      // const { username, password } = res.body
      // const userlist = Object.keys(user)
      // if (!userlist.includes(username) || user[username].password !== password) {
      //   res.statusCode = 400
      //   return { code: 50001, msg: '账户或密码错误' }
      // }
      // return {
      //   code: 200,
      //   data: {
      //     accessToken: encryptAccessToken(user[username]),
      //     refreshToken: encryptRefreshToken(user[username]),
      //     userInfo: user[username]
      //   }
      // }
    // }
  },
  {
    url: `${URL_MARK}user/logout`,
    method: 'POST',
    response: () => ({
      code: 0,
      msg: '退出成功'
    })
  }
]
