import React, { useState, useEffect, useReducer } from 'react'
import Router from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BackTop, ConfigProvider, Spin } from 'antd'
import {
  PageContext,
  Reducer,
  SET_LOADING,
  HIDE_LOADING
} from '../config/context'

import zhCN from 'antd/lib/locale/zh_CN'
import '../public/style/components/container.less'

const Container = props => {
  const handleRouteChangeStart = () => {
    dispatchLoading(SET_LOADING)
  }

  const handleRouteChangeEnd = () => {
    dispatchLoading(HIDE_LOADING)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeEnd)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeEnd)
    }
  }, [])

  const [showWrapper, setShowWrapper] = useState(false)

  useEffect(() => {
    const ele = document.getElementById('__content-container').clientHeight
    if (ele >= 1700) {
      setShowWrapper(true)
    } else {
      setShowWrapper(false)
    }
  })

  const [loadingMask, dispatchLoading] = useReducer(Reducer, 0)
  return (
    <ConfigProvider locale={zhCN}>
      <PageContext.Provider value={{ dispatchLoading }}>
        <div className="page-body">
          <Header />
          <div className="body-container" id="__page-container">
            <Spin spinning={!!loadingMask}>
              {showWrapper ? <div className="body-wrapper"></div> : ''}
              <div id="__content-container">{props.children}</div>
              <BackTop
                target={() => document.getElementById('__page-container')}
              />
            </Spin>
          </div>
          <Footer />
        </div>
      </PageContext.Provider>
    </ConfigProvider>
  )
}

export default Container
