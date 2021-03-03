import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './module/user'
import token from './module/token'
import menu from './module/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    token,
    menu
  },
  getters: {
    id: state => state.user.id,
    name: state => state.user.name,
    auth: state => state.user.auth,
    accessToken: state => state.token.accessToken,
    expireTime: state => state.token.expireTime,
    menuActive: state => state.menu.active,
    menu: state => state.menu.menu
  },
  plugins: [createPersistedState()]
})
