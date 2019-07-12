const path = require('path')
const { paths } = require('react-app-rewired')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')


module.exports = override(

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A'
    }
  }),

  addWebpackAlias({
    '@components': path.resolve(__dirname, `${ paths.appSrc }/components/`),
    '@common': path.resolve(__dirname, `${ paths.appSrc }/common/`),
    '@assets': path.resolve(__dirname, `${ paths.appSrc }/assets/`),
    '@store': path.resolve(__dirname, `${ paths.appSrc }/store`)
  })
)
