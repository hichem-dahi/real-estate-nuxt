import axiosServices from '../services/axiosServices'

export const state = () => ({
  savedHouses: [],
})

export const mutations = {
  SET_SAVED_HOUSE(state, savedHouse) {
    state.savedHouses.push(savedHouse)
  },
  REM_SAVED_HOUSE(state, savedHouseId) {
    state.savedHouses = state.savedHouses.filter(
      (item) => item.id !== savedHouseId
    )
  },
}

export const getters = {
  GET_SAVED_HOUSES: (state) => {
    return state.savedHouses
  },
}

export const actions = {
  getHouse({ commit }, id) {
    return axiosServices.getHouseId(id).then((res) => {
      commit('SET_SAVED_HOUSE', res.data)
    })
  },
}
