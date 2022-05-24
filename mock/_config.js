export const URL_MARK = '/mock-api/'
export const ACCESS_TOKEN_TIME = 60 * 1000 // 默认1分钟到期，按毫秒计算
export const REFRESH_TOKEN_TIME = 120 * 1000 // 默认2分钟到期，按毫秒计算
export const SECRET_KEY = 'G&X36zd5NnTYmZh9y1D0pD5DbeZs&Ts$C2RjKijG5w8FMhr&rc3Z'

export const ERROR_CODE = 50000
export const SUCCESS_CODE = 200

export const CREATE_SUCCESS_BODY = { code: SUCCESS_CODE, msg: '新增成功' }
export const CREATE_ERROR_BODY = { code: ERROR_CODE, msg: '新增失败' }
export const UPDATE_SUCCESS_BODY = { code: SUCCESS_CODE, msg: '修改成功' }
export const UPDATE_ERROR_BODY = { code: ERROR_CODE, msg: '修改失败' }
export const DELETE_SUCCESS_BODY = { code: SUCCESS_CODE, msg: '删除成功' }
export const DELETE_ERROR_BODY = { code: ERROR_CODE, msg: '删除失败' }
