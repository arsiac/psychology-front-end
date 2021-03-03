export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    auth: []
  },
  mutations: {
    updateId (s, id) {
      s.id = id
    },
    updateName (s, name) {
      s.name = name
    },
    updateAuth (s, auth) {
      s.auth = auth
    }
  }
}
