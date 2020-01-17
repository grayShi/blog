module.exports = app => {
  const { router, controller } = app
  router.get('/default/getArticleList', controller.default.index.getArticleList)
  router.get(
    '/default/getArticleById/:id',
    controller.default.index.getArticleById
  )
  router.get('/default/getTypeInfo', controller.default.index.getTypeInfo)
  router.get(
    '/default/getListByTypeId/:typeId',
    controller.default.index.getListByTypeId
  )
}
