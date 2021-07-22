import axios from 'axios'

const socialServices = axios.create({
  baseURL: 'https://kerya.herokuapp.com/auth/',
  backend: 'facebook',
  grant_type: 'convert_token',
  client_id: 'FzgqAO8BN0gosZ8ACC3CIEhj0thrVkHxIjRuh37t',
  client_secret:
    '0PTnZIeDU2dPK11fzfGwyZXa3sYY471TZWaGOmlq6Su5lcO50OjB0hnMX3VYhtvqUyQCCZnJ2Lr65LxS1vfr7CQKwQdaFiKkS2391wqotIMxrU4ePANfwK4tojWznsrw',
})

export default {
  socialLogin(accessToken) {
    return socialServices.post('token/', {
      token: accessToken,
    })
  },
}
