import * as Facebook from 'fb-sdk-wrapper'
import { Notification } from 'element-ui'

export default ({ app }, inject) => {
  const FbInit = (param) => {
    let isSuccess = true
    Facebook.load()
      .then(() => {
        console.group('Facebook SDK loaded.')
        console.log('FB SDK Info Provided : ' + (param !== undefined))

        if (param === undefined) { console.log('Using default SDK info.') }

        Facebook.init({
          appId: param !== undefined ? param.appId : 1593537531031479, // ekballo
          version: param !== undefined ? param.version : 'v14.0'
        })
        console.log('Facebook SDK initiated.')
        console.groupEnd()
      })
      .catch((error) => {
        console.group('Facebook SDK Load Error.')
        console.error(error)
        console.groupEnd()

        Notification({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: 'Sorry, Something went wrong while connecting to Facebook.'
        })

        isSuccess = false
      })

    return isSuccess
  }

  inject('FbInit', FbInit)
}
