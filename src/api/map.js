import requests from '@/utils/requests'

/**
 * 电子围栏接口
 */
export const getElectricFenceList = params => requests.get('map/electric-fence/list', { params }) // 电子围栏列表
export const addElectricFence = data => requests.post('map/electric-fence/add', data) // 创建电子围栏
export const editElectricFence = (id, data) => requests.put(`map/electric-fence/edit/${id}`, data) // 更新电子围栏
export const deleteElectricFence = id => requests.delete(`map/electric-fence/update/${id}`) // 删除电子围栏
