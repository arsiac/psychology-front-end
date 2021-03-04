export default {
  namespaced: true,
  state: {
    id: 0,
    name: ''
  },
  mutations: {
    updateId (s, id) {
      s.id = id
    },
    updateName (s, name) {
      s.name = name
    }
  }
}
