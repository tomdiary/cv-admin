/**
 * @description API
 * @author TomDiary
 * @link https://github.com/tomdiary
 * @todo 待优化导入方式，可更改为批量导入
 */
import * as mapRequests from './map'
import * as userRequests from './user'
import * as tableRequests from './table'
import * as vehicleRequests from './vehicle'

export default {
  ...mapRequests,
  ...userRequests,
  ...tableRequests,
  ...vehicleRequests
}
