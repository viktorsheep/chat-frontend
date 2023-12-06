import { Notification } from 'element-ui'

export default ({ app }, inject) => {
  const token = app.$auth.strategy.token.get()

  /**
   * @typedef {Object} response
   * @property {boolean} success - if response success true ? false.
   * @property {Object} content - response data.
   */

  /**
   * Axios request Helper.
   * @param {Object} payload - payload data for request.
   * @param {string} payload.method - request method.
   * @param {string} payload.url - request url.
   * @param {Object} payload.data - request data.
   * @param {Object} [payload.headers] - override request headers.
   * @param {string} [payload.baseURL] - override request base URL.
   * @returns {{success:Boolean, content:Object}} response - returns response with success flag.
   */
  const sender = async (payload) => {
    let success = false
    const content = {}
    const data = payload.data !== undefined ? payload.data : {}
    const headers = {
      Authorization: token
    }

    // config : different header
    if (payload.headers !== undefined) {
      const ct = payload.headers.contentType

      headers['Content-Type'] = ct === 'formData'
        ? 'multipart/form-data'
        : 'application/x-www-form-urlencoded'
    }

    // config : different baseURL
    if (payload.baseURL !== undefined) {
      app.$axios.setBaseURL(payload.baseURL)
    } else {
      app.$axios.setBaseURL(app.$config.baseURL)
    }

    await app.$axios({
      method: payload.method,
      url: payload.url,
      [payload.method === 'get' ? 'params' : 'data']: data,
      headers
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
      console.log(err.response)
      Notification({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: typeof err.response.data === 'string'
          ? `<b>${err.response.data} <br /> Error code: ${err.response.status}</b>`
          : `Sorry, Something went wrong. <br /> Error: ${err.response.status}`
      })
    }).then(() => {
      if (payload.baseURL !== undefined) {
        app.$axios.setBaseURL(process.env.APP_ENV === 'production'
          ? process.env.PUBLIC_URL + process.env.BASE_URL
          : process.env.LOCAL_URL + process.env.BASE_URL
        )
      }
    })

    return {
      success,
      content
    }
  }

  inject('sender', sender)
}
