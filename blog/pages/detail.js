import React from 'react'
import Head from 'next/head'
import '@pages/detail.scss'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Container from '../components/container'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

const Detail = props => {
  const tocify = new Tocify()

  const renderer = new marked.Renderer()
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  let html = marked(props.articleContent)

  return (
    <Container>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="common-main" type="flex" justify="center">
        <Col
          className="common-col content-box"
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <div>
            <div className="breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">视频列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>xxxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detail-title">React实战标题</div>
              <div className="list-icon center">
                <span>
                  <Icon type="calendar" />
                  2019-06-28
                </span>
                <span>
                  <Icon type="folder" />
                  视频教程
                </span>
                <span>
                  <Icon type="fire" />
                  123人
                </span>
              </div>
              <div
                className="detail-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          </div>
        </Col>
        <Col className="common-col" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix
            offsetTop={10}
            target={() => document.getElementById('__page-container')}
          >
            <div className="detail-nav common-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
    </Container>
  )
}

Detail.getInitialProps = async context => {
  let id = context.query.id
  const promise = new Promise(resolve => {
    axios.get(servicePath.getArticleById + id).then(result => {
      resolve(result.data.data[0])
    })
  })
  return await promise
}

export default Detail
