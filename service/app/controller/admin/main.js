const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class MainController extends Controller {
  async login() {
    const { userName, password } = this.ctx.request.body
    const sql = `SELECT userName FROM admin_user WHERE username = '${userName}' and password = '${password}'`
    const result = await this.app.mysql.query(sql)
    if (result.length > 0) {
      const openId = new Date().getTime()
      this.ctx.session.openId = openId
      this.ctx.body = success({ openId })
    } else {
      this.ctx.body = fail('用户名或密码错误')
    }
  }
  async getTypeInfo() {
    const typeInfo = await this.app.mysql.select('type')
    this.ctx.body = success(typeInfo)
  }
  async addArticle() {
    const myArticle = this.ctx.request.body
    const articleForm = {
      type_id: myArticle.selectedType,
      title: myArticle.articleTitle,
      article_content: myArticle.articleContent,
      introduce_content: myArticle.introduceContent,
      create_date: new Date(myArticle.createDate),
      update_date: new Date()
    }

    let result
    let insertSuccess
    let id
    if (!myArticle.articleId) {
      articleForm.view_count = 0

      result = await this.app.mysql.insert('article', articleForm)
      insertSuccess = result.affectedRows === 1
      id = result.insertId
    } else {
      articleForm.id = myArticle.articleId
      result = await this.app.mysql.update('article', articleForm)
      insertSuccess = result.affectedRows === 1
      id = myArticle.articleId
    }
    if (insertSuccess) {
      this.ctx.body = success({ id })
    } else {
      this.ctx.body = fail(
        myArticle.articleId ? '编辑文章失败' : '新增文章失败'
      )
    }
  }
}

module.exports = MainController
