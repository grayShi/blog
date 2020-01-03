import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../public/style/components/container.scss'

const Container = props => (
  <div className="page-body">
    <Header />
    <div className="body-container" id="__page-container">
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Container
