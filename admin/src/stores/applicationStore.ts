import { defineStore } from 'pinia'

const useApplicationStore = defineStore('application', {
  state: () => ({
    drawer: false,
  }),
  actions: {
    setDrawer(open: boolean) {
      this.drawer = open
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
})

export default useApplicationStore
