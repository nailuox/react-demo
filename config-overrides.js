const path = require('path')
const { paths } = require('react-app-rewired')
const {
	override,
	fixBabelImports,
	addLessLoader,
	addWebpackAlias
} = require('customize-cra')
const { getThemeVariables } = require('antd/dist/theme')

console.log(
	{'primary-color': 'red',
	...getThemeVariables({
		dark: true, // 开启暗黑模式
		compact: true // 开启紧凑模式
	})}
)

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true
	}),

	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'primary-color': 'red',
			...getThemeVariables({
				dark: true, // 开启暗黑模式
				compact: true // 开启紧凑模式
			})
		}
	}),

	addWebpackAlias({
		'@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
		'@common': path.resolve(__dirname, `${paths.appSrc}/common/`),
		'@assets': path.resolve(__dirname, `${paths.appSrc}/assets/`),
		'@store': path.resolve(__dirname, `${paths.appSrc}/store`),
		'@styles': path.resolve(__dirname, `${paths.appSrc}/common/publicStyle`)
	})
)
