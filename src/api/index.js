/**
 * @description API
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import * as userRequests from './user'
import * as tableRequests from './table'
import * as vehicleRequests from './vehicle'

export default {
  ...userRequests,
  ...tableRequests,
  ...vehicleRequests
}
