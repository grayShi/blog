import AddArticle from '../pages/AddArticle'
import ArticleList from '../pages/ArticleList'

export const menuConfig = [
  {
    key: 'index',
    icon: 'pie-chart',
    title: '添加文章',
    seq: 1
  },
  {
    key: 'articleManagement',
    icon: 'user',
    title: '文章管理',
    seq: 2,
    subMenu: [
      {
        title: '添加文章',
        key: 'addArticle',
        seq: 1
      },
      {
        title: '文章列表',
        key: 'articleList',
        seq: 2  
      }
    ]
  }
]

export const routerConfig = {
  index: {
    path: '/index/',
    component: AddArticle,
    exact: true
  },
  addArticle: {
    path: '/index/add/',
    component: AddArticle,
    exact: true
  },
  articleList: {
    path: '/index/list/',
    component: ArticleList,
    exact: true
  }
}
