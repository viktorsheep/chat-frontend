export default {
  TOGGLE_VISUAL_MODE (state) {
    state.settings.visualMode = state.settings.visualMode === 'light' ? 'dark' : 'light'
  },

  SET_DEVICE_TYPE (state) {
    state.settings.device = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'computer'
    state.settings.isMobile = state.settings.device === 'mobile'
  },

  TOGGLE_NAV_COLLAPSE (state) {
    state.settings.nav.collapse = !state.settings.nav.collapse
  },

  SET_CURRENT_CONVERSATION (state, p) {
    state.settings.nav.currentConversation = p
  },

  UNSET_CURRENT_CONVERSATION (state) {
    state.settings.nav.currentConversation = ''
  }
}
