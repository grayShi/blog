/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577439016178_746'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // egg-mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '1996@sgl',
      // database
      database: 'react_blog'
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  }

  // egg scrf默认安全机制 关闭
  config.security = {
    scrf: {
      enable: false
    },
    domainWhiteList: ['*'] // 所有
  }

  config.cors = {
    origin: '*', // 所有域名可以跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' // 允许哪些方法
  }

  return {
    ...config,
    ...userConfig
  }
}
