export default {
  async get ({ commit }, param) {
    const payload = {
      method: 'get',
      url: 'client-statuses/all',
      data: {}
    }

    await this.$sender(payload).then((res) => {
      if (res.success) {
        commit('SET', res.content.data)
      }
    })
  }
}
