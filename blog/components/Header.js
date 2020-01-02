import '@components/header.scss'
import { Row, Col, Menu, Icon, Affix } from 'antd'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
  const [navArray, setNavArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(servicePath.getTypeInfo).then(res => {
        return res.data.data
      })
      setNavArray(result)
    }
    fetchData()
  }, [])

  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const pathname = window.location.pathname
    const search = window.location.search
    const query = search.split('?')
    if (pathname === '/' || pathname === '/index') {
      setCurrentPage('home')
    } else if (pathname === '/list' && query.length > 0) {
      const queryList = query[1].split('&')
      queryList.forEach(item => {
        const [key, value] = item.split('=')
        if (key === 'typeId') {
          setCurrentPage(value)
        }
      })
    } else {
      setCurrentPage('')
    }
  })

  const handleClick = e => {
    if (e.key === 'home') {
      Router.push('/index')
    } else {
      Router.push('/list?typeId=' + e.key)
    }
  }

  return (
    <Affix offsetTop={0}>
      <div className="header">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <span className="header-logo">博客</span>
            <span className="header-text">前端开发个人博客</span>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Menu
              mode="horizontal"
              onClick={handleClick}
              selectedKeys={[currentPage]}
            >
              <Menu.Item key="home">
                <Icon type="home" />
                首页
              </Menu.Item>
              {navArray.map(item => (
                <Menu.Item key={item.id}>
                  <Icon type={item.icon} />
                  {item.type_name}
                </Menu.Item>
              ))}
            </Menu>
          </Col>
        </Row>
      </div>
    </Affix>
  )
}

export default Header