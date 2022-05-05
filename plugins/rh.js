// RH : Request Helper
import { Message, Loading } from 'element-ui'
export default ({ $auth, $axios, $confirm }, inject) => {
  const token = $auth.strategy.token.get()
  const rh = async (payload) => {
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading'
    })

    const data = payload.data !== undefined ? payload.data : {}
    let resp = {}
    await $axios({
      method: payload.method,
      url: payload.url,
      data,
      headers: {
        Authorization: token
      }
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        if ('onSuccess' in payload) {
          Message({
            type: 'success',
            message: payload.onSuccess
          })
        }
      }

      resp = {
        ...res
      }
    }).catch((err) => {
      resp = { ...err.response }
      let msg = ''
      Object.entries(err.response.data).forEach(([k, v]) => {
        msg = msg + v[0] + '<br />'
      })

      Message({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: msg
      })
    })

    loading.close()

    return resp
  }

  inject('rh', rh)
}
