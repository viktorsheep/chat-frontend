export default {
  TOGGLE_VISUAL_MODE (state) {
    state.settings.visualMode = state.settings.visualMode === 'light' ? 'dark' : 'light'
  }
}
