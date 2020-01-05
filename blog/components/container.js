import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BackTop, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import '../public/style/components/container.scss'

const Container = props => (
  <ConfigProvider locale={zhCN}>
    <div className="page-body">
      <Header />
      <div className="body-container" id="__page-container">
        {props.children}
        <BackTop target={() => document.getElementById('__page-container')} />
      </div>
      <Footer />
    </div>
  </ConfigProvider>
)

export default Container
