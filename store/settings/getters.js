export default {
  settings: (state) => {
    return state.settings
  },

  theme: (state) => {
    return state.settings.visualMode
  },

  device: (state) => {
    return state.settings.device
  },

  isMobile: (state) => {
    return state.settings.isMobile
  },

  navIsCollapsed: (state) => {
    return state.settings.nav.collapse
  },

  currentConversation: (state) => {
    return state.settings.nav.currentConversation
  }
}
