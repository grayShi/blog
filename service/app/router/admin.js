module.exports = app => {
  const { router, controller } = app
  const adminAuth = app.middleware.adminAuth()
  router.post('/admin/login', controller.admin.main.login)
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle', adminAuth, controller.admin.main.addArticle)
}
