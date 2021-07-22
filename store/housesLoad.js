export const state = () => ({
  savedHousesId: null,
  loading: false,
})

export const mutations = {
  SAVE_HOUSE(state, idHouse) {
    state.savedHousesId = idHouse
  },
  LOAD_START(state) {
    state.loading = true
  },
  LOAD_END(state) {
    state.loading = false
  },
}

export const getters = {
  GET_LOAD(state) {
    return state.loading
  },
}
