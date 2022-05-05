export default {
  ADD (state, param) {
    state.pages.push(param)
  },

  EDIT (state, page) {
    state.pages = [
      ...state.pages.map(pages => pages.id !== page.id ? pages : { ...pages, ...page })
    ]
  },

  SET (state, param) {
    state.pages = param
  }
}
