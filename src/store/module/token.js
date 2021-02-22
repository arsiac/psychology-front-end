export default {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
    expireTime: null,
    updateTime: null
  },
  mutations: {
    updateToken (s, o) {
      s.accessToken = o.token
      s.refreshToken = o.refresh
      s.expireTime = o.expireTime
      s.updateTime = o.updateTime
    },
    updateAccessToken (s, t) {
      s.accessToken = t
    },
    updateRefreshToken (s, t) {
      s.refreshToken = t
    },
    updateExpireTime (s, t) {
      s.expireTime = t
    },
    updateUpdateTime (s, t) {
      s.updateTime = t
    },
    cleanAccessToken (s) {
      s.accessToken = ''
    },
    cleanRefreshToken (s) {
      s.refreshToken = ''
    }
  }
}
