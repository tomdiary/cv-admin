import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const mockList = []
const modules = import.meta.globEager('./**/*.js')

Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockList.push(...modules[key].default)
})

export function setupProdMockServer() {
  createProdMockServer(mockList)
}
