import { defineStore } from 'pinia'
import { getSidebarStatus, setSidebarStatus } from '@util/baseStorage'

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    sidebarStatus: ![0, 1].includes(getSidebarStatus()) ? false : !!getSidebarStatus(),
  }),
  actions: {
    asSidebarStatus(status) {
      const sidebarStatus = Number(status) ? 0 : 1
      setSidebarStatus(sidebarStatus)
      this.sidebarStatus = !!sidebarStatus
    }
  }
})
