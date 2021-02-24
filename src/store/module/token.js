export default {
  namespaced: true,
  state: {
    accessToken: '',
    expireTime: null
  },
  mutations: {
    updateAccessToken (s, t) {
      s.accessToken = t
    },
    updateExpireTime (s, t) {
      s.expireTime = t
    }
  }
}
