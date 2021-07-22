/* eslint-disable no-console */
import axiosServices from '@/services/axiosServices'
import axiosSocial from '@/services/axiosSocial'
export const state = () => ({
  token: 'null',
  userId: 'null',
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER_ID(state, userId) {
    state.userId = userId
  },
}
export const getters = {
  GET_TOKEN(state) {
    return state.token
  },
  GET_USER_ID(state) {
    return state.userId
  },
}
export const actions = {
  getUserId({ commit }, token) {
    return axiosServices.getUser(token).then((res) => {
      console.log('getId', res)
      commit('SET_USER_ID', res.data.id)
      if (process.client) {
        localStorage.setItem('token', token)
        localStorage.setItem('userId', res.data.id)
      }
    })
  },
  signIn({ commit, dispatch }, authData) {
    return axiosServices
      .signIn(authData)
      .then((res) => {
        console.log('TokenGet', res)
        commit('SET_TOKEN', 'token ' + res.data.auth_token)
        dispatch('getUserId', 'token ' + res.data.auth_token)
      })
      .catch((error) => console.log(error))
  },
  signUp({ dispatch }, formData) {
    return axiosServices.signUp(formData).then(() => {
      dispatch('signIn', {
        email: formData.email,
        password: formData.password,
      })
    })
  },
  socialLogin({ commit, dispatch, state }, accessToken) {
    return axiosSocial.socialLogin(accessToken).then((res) => {
      console.log(res)
      commit('SET_TOKEN', 'Bearer ' + res.data.access_token)
      dispatch('getUidAxios', state.token)
      // localStorage.setItem('reToken', res.data.refresh_token)
    })
  },
  refreshLogin({ commit }) {
    if (process.client) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (token && userId) {
        commit('SET_TOKEN', token)
        commit('SET_USER_ID', userId)
      }
    }
  },
  logout({ commit }) {
    commit('SET_TOKEN', 'null')
    commit('SET_USER_ID', 'null')
    if (process.client) {
      localStorage.setItem('token', 'null')
      localStorage.setItem('userId', 'null')
    }
  },
}
