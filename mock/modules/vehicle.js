import lodash from 'lodash'
import { genBetweenAll } from '../_utils'
import { vehicleInfoFun } from '../_mockStorage'
import { URL_MARK, ERROR_CODE, SUCCESS_CODE } from '../_config'

const vehicleInfoFunData = vehicleInfoFun(972)

export default [
  {
    url: `${URL_MARK}vehicle/list`,
    method: 'GET',
    timeout: genBetweenAll(500, 2000),
    response: config => {
      if (!config.query) return { code: ERROR_CODE, msg: '请传递参数' }
      const { page: queryPage, pageSize: queryPageSize } = config.query
      const page = !queryPage ? 1 : Number(queryPage)
      const pageSize = !queryPageSize ? 10 : Number(queryPageSize)
      const response = lodash.cloneDeep(vehicleInfoFunData)
      return {
        code: SUCCESS_CODE,
        data: {
          page,
          pageSize,
          total: response.length,
          data: response.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
        }
      }
    }
  }
]
