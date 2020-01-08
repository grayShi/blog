import '@components/header.less'
import { Row, Col, Menu, Icon, Affix, Avatar } from 'antd'
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

  const [showAuthor, setShowAuthor] = useState(false)
  const [firstShowAuthor, setFirstShowAuthor] = useState(true)

  useEffect(() => {
    const pageContainer = document.getElementById('__page-container')
    function scrollFunc() {
      const HeaderEle = document.getElementById('__header')
      const AuthorEle = document.getElementById('__author-container')
      let showHeight = 0
      if (AuthorEle) {
        showHeight =
          AuthorEle.getBoundingClientRect().top -
          HeaderEle.clientHeight +
          AuthorEle.clientHeight
      }
      if (showHeight <= 0) {
        setShowAuthor(true)
        setFirstShowAuthor(false)
      } else {
        setShowAuthor(false)
      }
    }
    if (pageContainer) {
      pageContainer.addEventListener('scroll', scrollFunc)
    } else {
      setShowAuthor(true)
      setFirstShowAuthor(false)
    }
    return () => {
      if (pageContainer) {
        pageContainer.removeEventListener('scroll', scrollFunc)
      }
    }
  }, [])

  return (
    <Affix offsetTop={0}>
      <div className="header" id="__header">
        <Row type="flex" justify="center">
          <Col xs={12} sm={12} md={11} lg={11} xl={13}>
            <div className="header-title">
              <span className="header-logo">博客</span>
              <span className="header-text">前端开发个人博客</span>
            </div>
          </Col>
          <Col xs={12} sm={10} md={10} lg={10} xl={6}>
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
          <Col xs={0} sm={2} md={2} lg={2} xl={2} className="header-author">
            <div
              className={`${firstShowAuthor ? 'header-author-hide' : ''} ${
                showAuthor ? 'author-slideInUp' : 'author-slideOutDown'
              }`}
            >
              <Avatar size="large" src="/img/author.jpg" />
            </div>
          </Col>
        </Row>
      </div>
    </Affix>
  )
}

export default withRouter(Header)
