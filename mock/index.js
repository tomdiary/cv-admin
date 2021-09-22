import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const files = import.meta.globEager('/modules/*.js')
const modules = {}
const mockList = []

for (const key in files) {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files[key].default
  }
}

Object.entries(modules).forEach(arr => {
  mockList.push(...arr[1])
})

export function setupProdMockServer() {
  createProdMockServer([...mockList])
}
