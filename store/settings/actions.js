export default {
  toggleVisualMode ({ commit }, param = null) {
    commit('TOGGLE_VISUAL_MODE')
  },

  setDeviceType ({ commit }) {
    commit('SET_DEVICE_TYPE')
  },

  toggleNavCollapse ({ commit }) {
    commit('TOGGLE_NAV_COLLAPSE')
  },

  setCurrentConversation ({ commit }, p) {
    commit('SET_CURRENT_CONVERSATION', p)
  },

  unsetCurrentConversation ({ commit }) {
    commit('UNSET_CURRENT_CONVERSATION')
  }
}
