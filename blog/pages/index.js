import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import '@pages/index.scss'
import { Row, Col, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const Home = list => {
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

  const [mylist, setMylist] = useState(list.data)

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
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
        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios.get(servicePath.getArticleList).then(result => {
      resolve(result.data)
    })
  })

  return await promise
}

export default Home
