
// default values
const dv = {
  path: 'message/'
}

const actions = {

  // ADD
  async add ({ commit }, { pageId, param }) {
    const payload = {
      method: 'post',
      url: `${dv.path}add/${pageId}`,
      data: param,
      message: {
        success: 'Facebook page added.'
      }
    }

    await this.$sender(payload).then((res) => {
      if (res.success) {
        commit('ADD', res.content.data)
      }
    })
  }, // e.o ADD

  // BROWSE
  async browse ({ commit }, id) {
    const payload = {
      method: 'get',
      url: `${dv.path}browse/${id}`
    }
    console.log(id)

    await this.$sender(payload).then((res) => {
      console.log(res)
      if (res.success) {
        commit('SET', { id, data: res.content.data })
      }
    })
  }, // e.o BROWSE

  // EDIT
  async edit ({ commit }, param) {
    const payload = {
      method: 'put',
      url: `${dv.path}${param.id}/edit`,
      data: param,
      message: {
        success: 'Facebook page edited.'
      }
    }

    await this.$sender(payload).then((res) => {
      if (res.success) {
        commit('EDIT', res.content.data)
      }
    })
  }

}

export default actions
