export default {
  messages: state => (id) => {
    return state.messages[id]
  },

  messageAll: (state) => {
    return state.messages
  }
}
