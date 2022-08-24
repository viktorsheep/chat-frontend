// default values
const dv = {
  path: 'page/'
}

const actions = {

  // ADD
  async add ({ commit }, param) {
    const payload = {
      method: 'post',
      url: `${dv.path}add`,
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
  async browse ({ commit }, param) {
    const payload = {
      method: 'get',
      url: `${dv.path}browse${param !== null ? '?with_token=true' : ''}`,
      data: param
    }

    await this.$sender(payload).then((res) => {
      if (res.success) {
        commit('SET', res.content.data)
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
