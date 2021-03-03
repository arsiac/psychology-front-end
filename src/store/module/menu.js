export default {
  namespaced: true,
  state: {
    active: 'home'
  },
  mutations: {
    updateActive (s, t) {
      s.active = t
    }
  }
}
