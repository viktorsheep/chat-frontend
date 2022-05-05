export default {
  ADD (state, { id, param }) {
    state.pages[id].push(param)
  },

  EDIT (state, page) {
    state.messages = [
      ...state.pages.map(pages => pages.id !== page.id ? pages : { ...pages, ...page })
    ]
  },

  SET (state, { id, data }) {
    state.messages[id] = data
  }
}
