const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withPlugins = require('next-compose-plugins')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const path = require('path')
const fs = require('fs')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './public/style/theme/antd-custom.less'),
    'utf8'
  )
)

module.exports = withPlugins([withCss, withLess], {
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
    localIdentName: '[local]___[hash:base64:5]'
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }

    // 设置图片打包
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[name].[ext]',
            limit: 10240
          }
        }
      ]
    })

    // 路径缩写
    config.resolve.alias['@'] = path.join(__dirname, '/public')
    config.resolve.alias['@components'] = path.join(
      __dirname,
      '/public/style/components'
    )
    config.resolve.alias['@pages'] = path.join(__dirname, '/public/style/pages')

    // 隐藏warning: chunk styles [mini-css-extract-plugin]
    // 父子组件重复引用antd,与内部按需加载冲突,非必须
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      })
    )

    return config
  }
})
