import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import token from './module/token'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    token
  },
  getters: {
    id: state => state.user.id,
    name: state => state.user.name,
    token: state => state.token.accessToken,
    refresh: state => state.token.refreshToken,
    expireTime: state => state.token.expireTime,
    updateTime: state => state.token.updateTime
  }
})
