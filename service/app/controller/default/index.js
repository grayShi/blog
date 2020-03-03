const Controller = require('egg').Controller
const { success } = require('../../public/requestBody')

class IndexController extends Controller {
  async getArticleList() {
    const sql = `SELECT article.id as id,
    article.title as title,
    article.introduce_content as introduce,
    date_format(article.add_time,'%Y-%m-%d %H:%i') as addTime,
    article.view_count as viewCount,
    type.type_name as typeName
    FROM article LEFT JOIN type ON article.type_id = type.id`

    this.ctx.body = success(await this.app.mysql.query(sql))
  }

  async getArticleById() {
    const id = this.ctx.params.id

    const sql = `SELECT article.id as id,
    article.title as title,
    article.article_content as articleContent,
    date_format(article.add_time,'%Y-%m-%d %H:%i') as addTime,
    article.view_count as viewCount,
    type.type_name as typeName,
    type.id as typeId
    FROM article LEFT JOIN type ON article.type_id = type.id
    WHERE article.id = ${id}`

    this.ctx.body = success(await this.app.mysql.query(sql))
  }

  // 得到类别和编号
  async getTypeInfo() {
    const findType = await this.app.mysql.select('type')
    this.ctx.body = success(findType)
  }

  // 根据类别Id 获取文章列表
  async getListByTypeId() {
    const typeId = this.ctx.params.typeId
    const sql = `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    date_format(article.add_time,'%Y-%m-%d %H:%i') as addTime,
    article.view_count as viewCount,
    type.type_name as typeName
    FROM article LEFT JOIN type ON article.type_id = type.id
    WHERE article.type_id = ${typeId}`

    this.ctx.body = success({
      data: await this.app.mysql.query(sql),
      type: await this.app.mysql.get('type', { id: typeId })
    })
  }
}

module.exports = IndexController
