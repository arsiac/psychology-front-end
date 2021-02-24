import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
    accessToken: state => state.token.accessToken,
    expireTime: state => state.token.expireTime
  },
  plugins: [createPersistedState()]
})
