import requests from '@/utils/requests'

export const getVehicleList = params => requests.get('vehicle/list', { params }) // 车辆列表
export const addVehicle = data => requests.post('vehicle/add', data) // 创建车辆
export const editVehicle = (id, data) => requests.put(`vehicle/edit/${id}`, data) // 更新车辆
export const deleteVehicle = id => requests.delete(`vehicle/update/${id}`) // 删除车辆
