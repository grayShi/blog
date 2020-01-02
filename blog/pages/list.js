import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Container from '../components/container'
import '@pages/list.scss'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const MyList = list => {
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer,
    gfm: true, // 启动类似github
    pedantic: false, // 自动改正markdown写法
    sanitize: false, // 不忽略html标签
    tables: true, // github 表格
    breaks: true, // github 换行符
    smartlists: true, // 自动渲染列表
    highlight: code => {
      return hljs.highlightAuto(code).value
    }
  })

  const [myList, setMyList] = useState(list.data)

  useEffect(() => {
    setMyList(list.data)
  })

  return (
    <Container>
      <Head>
        <title>List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-col" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="breadcrumb-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item className="list-body">
                <div className="list-title">
                  <Link href={{ pathname: 'detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" />
                    {item.addTime}
                  </span>
                  <span>
                    <Icon type="folder" />
                    {item.typeName}
                  </span>
                  <span>
                    <Icon type="fire" />
                    {item.viewCount}人
                  </span>
                </div>
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="common-col" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
    </Container>
  )
}

MyList.getInitialProps = async context => {
  const typeId = context.query.typeId

  const promise = new Promise(resolve => {
    axios.get(servicePath.getListByTypeId + typeId).then(res => {
      resolve(res.data)
    })
  })
  return await promise
}

export default MyList
