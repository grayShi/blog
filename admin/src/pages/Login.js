import React, { useState, useEffect } from 'react'

import { Card, Input, Icon, Button, Spin, message } from 'antd'
import '../static/css/login.less'
import servicePath from '../config/apiUrl'
import axios from 'axios'

const Login = props => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loginSystem = () => {
    if (!userName) {
      message.error('用户名不能为空')
      return
    } else if (!password) {
      message.error('密码不能为空')
      return
    }
    setIsLoading(true)
    axios({
      method: 'post',
      url: servicePath.login,
      data: { userName, password },
      withCredentials: true
    }).then(res => {
      setIsLoading(false)
      if (res.data.success) {
        localStorage.setItem('openId', res.data.data.openId)
        if (props.location.state && props.location.state.from) {
          // props.history.push(props.location.state.from.pathname)
          props.history.push({
            pathname: props.location.state.from.pathname,
            search: props.location.state.from.search,
            state: undefined
          })
        } else {
          props.history.push('/index')
        }
      } else {
        message.error(res.data.error || '用户名或密码错误')
      }
    })
  }

  useEffect(() => {
    localStorage.clear('openId')
  }, [])

  return (
    <div className="login-body">
      <Spin spinning={isLoading}>
        <Card title="My Blog" bordered={true}>
          <Input
            id="userName"
            size="large"
            value={userName}
            placeholder="用户名"
            prefix={
              <Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
            }
            onChange={e => {
              setUserName(e.target.value)
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            value={password}
            placeholder="密码"
            prefix={
              <Icon type="key" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
            }
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={loginSystem}>
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login
