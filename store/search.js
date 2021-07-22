import axiosServices from '../services/axiosServices'
export const state = () => ({
  search: '',
  filters: '',
  houses: [],
  house: null,
})

export const mutations = {
  SET_SEARCH(state, searchStr) {
    state.search = searchStr
  },
  SET_FILTERS(state, filterStr) {
    state.filters = filterStr
  },
  SET_HOUSES(state, houses) {
    state.houses = houses
  },
  SET_HOUSE(state, house) {
    state.house = house
  },
}

export const getters = {
  GET_SEARCH: (state) => {
    return state.search + state.filters
  },
}

export const actions = {
  search({ commit }, searchArr) {
    let searchStr = ''
    searchStr = searchArr.join('&')
    commit('SET_SEARCH', searchStr)
  },
  filterSearch({ commit }, filterArr) {
    let filterStr = '&'
    filterStr += filterArr.join('&')
    commit('SET_FILTERS', filterStr)
  },
  getHouses({ commit, getters }) {
    return axiosServices.getHouses(getters['search/GET_SEARCH']).then((res) => {
      commit('SET_HOUSES', res.data)
    })
  },
  getHouse({ commit }, id) {
    return axiosServices.getHouseId(id).then((res) => {
      commit('SET_HOUSE', res.data)
    })
  },
}
