import React from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'

axios.defaults.withCredentials = true

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
      if (Object.keys(error).length !== 0) {
        try {
          message.error(
            error.response && error.response.data
              ? error.response.data.message || '操作失败'
              : error.message
          )
        } catch (e) {
          console.log(error)
          message.error('操作失败')
        }
        return Promise.reject(error)
      }
      return Promise.reject({})
    }
  )
  return <></>
}

export default withRouter(BodyConfig)
