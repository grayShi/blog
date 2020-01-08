import App from 'next/app'
import React from 'react'
import Router from 'next/router'
import Container from '../components/Container'
// import 'antd/dist/antd.css'
import '@pages/common.less'

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push('/index')
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        {pageProps.statusCode === 404 ? (
          <Component {...pageProps} />
        ) : (
          <Container>
            <Component {...pageProps} />
          </Container>
        )}
      </>
    )
  }
}

export default MyApp
