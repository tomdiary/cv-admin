import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mapMock from './modules/map'
import menuMock from './modules/menu'
import roleMock from './modules/role'
import tableMock from './modules/table'
import userMock from './modules/user'
import vehicleMock from './modules/vehicle'

const mockList = [
  ...mapMock,
  ...menuMock,
  ...roleMock,
  ...tableMock,
  ...userMock,
  ...vehicleMock
]

export function setupProdMockServer() {
  createProdMockServer(mockList)
}
