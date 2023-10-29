import { defineStore } from 'pinia'
import { ref } from 'vue'

const useApplicationStore = defineStore('application', () => {
  const drawer = ref(false)

  function setDrawer(open: boolean) {
    drawer.value = open
  }
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  return { drawer, setDrawer, toggleDrawer }
})

export default useApplicationStore
