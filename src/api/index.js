/**
 * @description API
 * @author TomDiary
 * @link https://www.7b3.rog or https://github.com/tomdiary
 */
import * as userRequests from './user'
import * as tableRequests from './table'

export default {
  ...userRequests,
  ...tableRequests
}
