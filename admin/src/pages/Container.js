import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import '../static/css/container.less'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Container = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>文章列表</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Container
