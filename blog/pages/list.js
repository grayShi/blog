import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Author from '../components/Author'
import Figure from '../components/Figure'
import '@pages/list.less'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const MyList = list => {
  marked.setOptions({
    renderer: new marked.Renderer(),
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

  const [myList, setMyList] = useState([])
  const [myType, setMyType] = useState({})

  useEffect(() => {
    setMyList(list.data)
    setMyType(list.type || {})
  }, [list.data, list.type])

  return (
    <>
      <Head>
        <title>博客列表</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-col" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="breadcrumb-body">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href={{ pathname: 'index' }}>
                  <a>首页</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{myType.type_name}</Breadcrumb.Item>
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
          <Figure />
        </Col>
      </Row>
    </>
  )
}

MyList.getInitialProps = async context => {
  const typeId = context.query.typeId

  const promise = new Promise(resolve => {
    axios.get(servicePath.getListByTypeId + typeId).then(res => {
      resolve(res.data.data)
    })
  })
  return await promise
}

export default MyList
