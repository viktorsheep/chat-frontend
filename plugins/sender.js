import { Notification } from 'element-ui'

export default ({ app }, inject) => {
  const token = app.$auth.strategy.token.get()

  const sender = async (payload) => {
    let success = false
    const content = {}
    const data = payload.data !== undefined ? payload.data : {}

    await app.$axios({
      method: payload.method,
      url: payload.url,
      data,
      headers: {
        Authorization: token
      }
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        if ('message' in payload) {
          if ('success' in payload.message) {
            Notification({
              type: 'success',
              message: payload.message.success
            })
          }
        }

        content.data = res.data
      }

      success = true
    }).catch((err) => {
      Notification({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: 'Sorry, Something went wrong. <br /> Error : ' + err.response.status
      })
    })

    return {
      success,
      content
    }
  }

  inject('sender', sender)
}
