import { urlMark } from '../_config'
import { faker } from '@faker-js/faker'

console.log(`${faker.address.longitude(135.05, 73.66, 3)},${faker.address.latitude(53.55, 3.86, 3)}`)

export default [
  {
    url: `${urlMark}map/list`,
    method: 'POST',
    response: () => ({
      code: 0,
      msg: '退出成功'
    })
  }
]
