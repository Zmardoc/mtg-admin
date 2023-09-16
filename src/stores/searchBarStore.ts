import { defineStore } from 'pinia'

export const useSearchBarStore = defineStore('searchBar', {
  state: () => ({
    searchText: '',
  }),
  actions: {
    setSearchText(searchText: string) {
      this.searchText = searchText
    },
  },
})
