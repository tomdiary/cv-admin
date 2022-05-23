import requests from '@/utils/requests'

export const getVehicleList = params => requests.get('vehicle/list', { params }) // 车辆列表
