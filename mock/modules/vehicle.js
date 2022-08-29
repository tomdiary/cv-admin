import lodash from 'lodash'
import { genBetweenAll, detectTokenExpiration } from '../_utils'
import { vehicleInfoFun } from '../_mockStorage'
import {
  URL_MARK,
  ERROR_CODE,
  SUCCESS_CODE,
  DELETE_SUCCESS_BODY,
  DELETE_ERROR_BODY,
  UPDATE_SUCCESS_BODY,
  UPDATE_ERROR_BODY,
  CREATE_SUCCESS_BODY,
  CREATE_ERROR_BODY
} from '../_config'

const vehicleInfoFunData = vehicleInfoFun(972)

export default [
  {
    url: `${URL_MARK}vehicle/list`,
    method: 'GET',
    timeout: genBetweenAll(500, 2000),
    response: config => {
      console.log(config.headers)
      // const code = detectTokenExpiration(config.headers)
      // if (code === 1) return { code: ERROR_CODE, msg: 'token过期或失效' }
      // if (!config.query) return { code: ERROR_CODE, msg: '请传递参数' }
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
  },
  {
    url: `${URL_MARK}vehicle/add`,
    method: 'POST',
    timeout: genBetweenAll(500, 2000),
    response: config => !Object.keys(config.body).length ? CREATE_ERROR_BODY : CREATE_SUCCESS_BODY
  },
  {
    url: `${URL_MARK}vehicle/edit/:id`,
    method: 'PUT',
    timeout: genBetweenAll(500, 2000),
    response: config => !config.query.id || !Object.keys(config.body).length ? UPDATE_ERROR_BODY : UPDATE_SUCCESS_BODY
  },
  {
    url: `${URL_MARK}vehicle/delete/:id`,
    method: 'DELETE',
    timeout: genBetweenAll(500, 2000),
    response: config => !config.query.id ? DELETE_ERROR_BODY : DELETE_SUCCESS_BODY
  }
]
