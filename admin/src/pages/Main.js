import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import '../static/css/common.less'
import Login from './Login'
import Container from './Container'

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" push />} />
        <Route path="/login/" exact component={Login}></Route>
        <Route path="/index" exact component={Container}></Route>
      </Switch>
    </Router>
  )
}

export default Main
