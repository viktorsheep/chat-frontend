// default values
const dv = {
  path: 'user/'
}

const actions = {

  // ADD
  async add ({ commit }, param) {
    const payload = {
      method: 'post',
      url: `${dv.path}add`,
      data: param,
      message: {
        success: 'User Added'
      }
    }

    await this.$sender(payload).then((res) => {
      if (res.success) {
        commit('ADD', res.content.data)
      }
    })
  }, // e.o ADD

  // BROWSE
  async users ({ commit }, param) {
    const payload = {
      method: 'get',
      url: `${dv.path}users`,
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
  }, // e.o EDIT

  // ROLES
  async roles ({ commit }, param) {
    await this.$sender({
      method: 'get',
      url: `${dv.path}roles`
    })
      .then((res) => {
        if (res.success) {
          commit('SET_ROLES', res.content.data)
        }
      })
  } // e.o ROLES

}

export default actions
