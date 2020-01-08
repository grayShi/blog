import Router from 'next/router'

export default () => {
  Router.beforePopState(({ url, as, options }) => {
    console.log(url)
    console.log(as)
    console.log(options)

    return true
  })
}
