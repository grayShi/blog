import React, { useState } from 'react'

import { Card, Input, Icon, Button, Spin } from 'antd'
import '../static/css/login.less'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loginSystem = () => {
    setIsLoading(true)
  }

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
