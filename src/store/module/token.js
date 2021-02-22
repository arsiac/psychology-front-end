export default {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
    expireTime: null,
    updateTime: null
  },
  mutations: {
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
