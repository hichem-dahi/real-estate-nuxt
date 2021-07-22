import axios from 'axios'

const axiosServices = axios.create({
  baseURL: 'https://kerya.herokuapp.com/api',
})

export default {
  getHouseId(id) {
    return axiosServices.get('/house-details/' + id)
  },
  getHouses(search) {
    return axiosServices.get('/houses-list/?' + search)
  },
  getUserHouses(userId) {
    return axiosServices.get('/houses-list/' + userId)
  },
  getUser(token) {
    return axiosServices.get('/users/users/me/', {
      headers: {
        Authorization: token,
      },
    })
  },
  getUserInfo(id) {
    return axiosServices.get('/users/users/' + id)
  },
  signIn(authData) {
    return axiosServices.post('/users/token/login/', {
      email: authData.email,
      password: authData.password,
    })
  },
  signUp(formData) {
    return axiosServices.post('/users/users/', formData)
  },
}
