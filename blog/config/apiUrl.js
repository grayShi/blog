const ipUrl = 'http://127.0.0.1:7001/default/'

const servicePath = {
  getArticleList: `${ipUrl}getArticleList`, // 首页List接口
  getArticleById: `${ipUrl}getArticleById/`, // 详细页接口
  getTypeInfo: `${ipUrl}getTypeInfo`, // 获取文章类别
  getListByTypeId: `${ipUrl}getListByTypeId/` // 获取文章类别
}

export default servicePath
