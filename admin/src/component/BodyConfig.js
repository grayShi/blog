import React from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'

const BodyConfig = props => {
  axios.interceptors.request.use(
    function(config) {
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    function(response) {
      if (response.data.notLogin) {
        localStorage.clear('openId')
        message.error(response.data.error)
        props.history.push({
          pathname: '/login',
          state: {
            from: {
              pathname: props.history.location.pathname,
              search: props.history.location.search
            }
          }
        })
        return Promise.reject({})
      }
      return response
    },
    function(error) {
      message.error(error.response.data.message || '操作失败')
      return Promise.reject(error)
    }
  )
  return <></>
}

export default withRouter(BodyConfig)
