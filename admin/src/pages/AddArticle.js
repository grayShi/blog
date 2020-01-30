import React, { useState, useEffect, useCallback } from 'react'
import marked from 'marked'
import '../static/css/addArticle.less'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import moment from 'moment'
import { onSuccess, onError, formatQuery } from '../config/common'
const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0) // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('') //文章标题
  const [articleContent, setArticleContent] = useState('') //文章markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览文章内容') //文章预览内容
  const [introduceContent, setIntroduceContent] = useState('') //简介的markdown内容
  const [introMarkdownContent, setIntroMarkdownContent] = useState(
    '等待编辑简介'
  ) //简介的预览内容
  const [createDate, setCreateDate] = useState(moment()) //发布日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectedType] = useState() //选择的文章类别

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  })

  const changeContent = e => {
    setArticleContent(e.target.value)
    const html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = e => {
    setIntroduceContent(e.target.value)
    const html = marked(e.target.value)
    setIntroMarkdownContent(html)
  }

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo
    }).then(res => {
      if (res.data.success) {
        setTypeInfo(
          res.data.data.map(item => ({ id: item.id, typeName: item.type_name }))
        )
      } else {
        onError(res.data.error)
      }
    })
  }

  const getArticleByQuery = useCallback(() => {
    getTypeInfo()
    const query = formatQuery(props.history.location.search)
    setArticleId(query.id)
  }, [props])

  useEffect(() => {
    getArticleByQuery()
  }, [getArticleByQuery])

  const saveArticle = () => {
    if (!selectedType) {
      onError('请输入文章类别')
      return
    } else if (!articleTitle) {
      onError('请输入文章标题')
      return
    } else if (!articleContent) {
      onError('请输入文章内容')
      return
    } else if (!introduceContent) {
      onError('请输入文章简介')
      return
    } else if (!createDate) {
      onError('请输入创建日期')
      return
    }
    const articleForm = {
      articleId,
      selectedType,
      articleTitle,
      articleContent,
      introduceContent,
      createDate
    }
    axios({
      url: servicePath.addArticle,
      method: 'post',
      data: articleForm
    }).then(res => {
      if (res.data.success) {
        onSuccess('文章保存成功')
        setArticleId(res.data.data.id)
        props.history.push({
          pathname: '/index',
          search: `?id=${res.data.data.id}`
        })
      } else {
        onError(res.data.error)
      }
    })
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                onChange={e => setArticleTitle(e.target.value)}
                size="large"
              />
            </Col>
            <Col span={4}>
              <Select
                style={{ width: 160 }}
                defaultValue="选择文章类别"
                onChange={value => setSelectedType(value)}
                size="large"
              >
                {typeInfo.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.typeName}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="view-content"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
              <Col span={24}>
                <TextArea
                  rows={4}
                  placeholder="文章简介"
                  onChange={changeIntroduce}
                />
                <br />
                <div
                  className="introduce-content"
                  dangerouslySetInnerHTML={{ __html: introMarkdownContent }}
                ></div>
              </Col>
              <Col span={12}>
                <div className="date-select">
                  <DatePicker
                    defaultValue={moment()}
                    onChange={date => {
                      setCreateDate(date)
                    }}
                    placeholder="发布日期"
                    size="large"
                  />
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle
