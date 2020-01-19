import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal

const ArticleList = props => {
  const [list, setList] = useState([])

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <Row className="list-div">
            <Col span={8}>{item.title}</Col>
            <Col span={3}>{item.typeName}</Col>
            <Col span={3}>{item.createDate}</Col>
            <Col span={4}>{item.viewCount}</Col>
            <Col span={4}>
              <button type="primary">修改</button>
              <button>删除</button>
            </Col>
          </Row>
        )}
      />
    </div>
  )
}

export default ArticleList
