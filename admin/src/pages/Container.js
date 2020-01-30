import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import '../static/css/container.less'
import { Route } from 'react-router-dom'
import { menuConfig, routerConfig } from '../config/menuConfig'
const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Container = props => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  const gotoNewPage = e => {
    if (routerConfig[e.key]) {
      props.history.push(routerConfig[e.key].path)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['index']}
          mode="inline"
          onClick={gotoNewPage}
        >
          {menuConfig.map(item => {
            if (item.subMenu) {
              return (
                <SubMenu
                  key={item.key}
                  title={
                    <span>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {item.subMenu.map(sub => (
                    <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
                  ))}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={item.key}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {Object.keys(routerConfig).map(key => {
              const item = routerConfig[key]
              return (
                <Route
                  key={key}
                  path={item.path}
                  exact={item.exact}
                  component={item.component}
                />
              )
            })}
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
