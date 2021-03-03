export default {
  namespaced: true,
  state: {
    active: 'home',
    menu: []
  },
  mutations: {
    updateActive (s, t) {
      s.active = t
    },
    updateMenu (s, t) {
      s.menu = t
    }
  }
}
