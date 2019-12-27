const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPlugins = require('next-compose-plugins')
const path = require('path')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withPlugins([withSass, withCss], {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
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

    // 路径缩写
    config.resolve.alias['@'] = path.join(__dirname, '/public')
    config.resolve.alias['@components'] = path.join(
      __dirname,
      '/public/style/components'
    )
    config.resolve.alias['@pages'] = path.join(__dirname, '/public/style/pages')

    return config
  }
})
