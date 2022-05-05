export default {
  ADD (state, param) {
    state.users.push(param)
  },

  EDIT (state, user) {
    state.pages = [
      ...state.users.map(users => users.id !== user.id ? users : { ...users, ...user })
    ]
  },

  SET (state, param) {
    state.users = param
  }
}
