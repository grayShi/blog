import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BackTop } from 'antd'
import '../public/style/components/container.scss'

const Container = props => (
  <div className="page-body">
    <Header />
    <div className="body-container" id="__page-container">
      {props.children}
      <BackTop target={() => document.getElementById('__page-container')} />
    </div>
    <Footer />
  </div>
)

export default Container
