exports.success = obj => {
  return {
    success: true,
    data: obj
  }
}

exports.fail = str => {
  return {
    success: false,
    error: typeof str === 'object' ? JSON.stringify(str) : str
  }
}

exports.notLogin = () => {
  return {
    notLogin: true,
    error: '由于长时间未操作页面，请重新登录'
  }
}
