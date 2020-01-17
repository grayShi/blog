const ipUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
  login: `${ipUrl}login`, // 登录接口
  getTypeInfo: `${ipUrl}getTypeInfo`, // 获得文章类别
  addArticle: `${ipUrl}addArticle` // 发布文章
}

export default servicePath
