import '@components/header.less'
import { Row, Col, Menu, Icon, Affix } from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { PageContext, SHOW_LOADING, HIDE_LOADING } from '../config/context'
import { withRouter } from 'next/router'

const Header = ({ router }) => {
  const [navArray, setNavArray] = useState([])
  const [currentPage, setCurrentPage] = useState('home')

  const pageContext = useContext(PageContext)

  useEffect(() => {
    pageContext.dispatchLoading(SHOW_LOADING)
    const fetchData = async () => {
      const result = await axios.get(servicePath.getTypeInfo).then(res => {
        pageContext.dispatchLoading(HIDE_LOADING)
        return res.data.data
      })
      setNavArray(result)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const pathname = router.pathname
    const query = router.query
    if (pathname === '/' || pathname === '/index') {
      setCurrentPage('home')
    } else if (
      pathname === '/list' &&
      Object.keys(query).length > 0 &&
      query.typeId
    ) {
      setCurrentPage(query.typeId)
    } else {
      setCurrentPage('')
    }
  }, [router.asPath])

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
          <Col xs={12} sm={8} md={12} lg={12} xl={12}>
            <span className="header-logo">博客</span>
            <span className="header-text">前端开发个人博客</span>
          </Col>
          <Col xs={12} sm={16} md={12} lg={12} xl={8}>
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

export default withRouter(Header)
