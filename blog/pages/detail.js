import React from 'react'
import Head from 'next/head'
import '@pages/detail.less'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Author from '../components/Author'
import Figure from '../components/Figure'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

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
    breaks: false, // github 换行符
    smartLists: true, // 自动渲染列表
    smartypants: false,
    highlight: code => {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.articleContent)

  return (
    <>
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
            <div className="breadcrumb-body">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href={{ pathname: 'index' }}>
                    <a>首页</a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link
                    href={{ pathname: 'list', query: { typeId: props.typeId } }}
                  >
                    <a>{props.typeName}</a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detail-title">{props.title}</div>
              <div className="list-icon center">
                <span>
                  <Icon type="calendar" />
                  {props.addTime}
                </span>
                <span>
                  <Icon type="folder" />
                  {props.typeName}
                </span>
                <span>
                  <Icon type="fire" />
                  {props.viewCount}人
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
          <Figure />
          {tocify && tocify.size() > 0 ? (
            <Affix
              offsetTop={10}
              target={() => document.getElementById('__page-container')}
            >
              <div className="detail-nav common-box">
                <div className="nav-title">文章目录</div>
                <div className="toc-list">{tocify.render()}</div>
              </div>
            </Affix>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </>
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
