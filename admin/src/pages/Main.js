import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import '../static/css/common.less'
import MyRouter from '../router'
import NotFound from '../pages/NotFound'

import BodyConfig from '../component/BodyConfig'

const Main = () => {
  return (
    <Router>
      <BodyConfig />
      <Switch>
        <Redirect exact from="/" to="/login" />
        {MyRouter.map((item, index) => {
          return (
            <Route
              path={item.path}
              key={index}
              exact
              render={props => {
                if (!item.auth || localStorage.getItem('openId')) {
                  return <item.component {...props} />
                } else {
                  return (
                    <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: {
                            pathname: props.location.pathname,
                            search: props.location.search
                          }
                        }
                      }}
                    />
                  )
                }
              }}
            />
          )
        })}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Main
