const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1890ff' }
  }),
  addWebpackAlias(
    {
      '@style': path.resolve(__dirname, 'src/static/style'),
    }
  ),
  config => {
    config.devServer = {}
    return config
  }
)
