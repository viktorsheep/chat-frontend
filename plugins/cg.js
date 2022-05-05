export default ({ app }, inject) => {
  const cg = (param) => {
    console.group(param.title)

    if (param.type !== 'error') {
      param.logs.forEach((l) => {
        console.log(l)
      })
    } else {
      console.error(param.logs)
    }

    console.groupEnd()
  }

  inject('cg', cg)
}
