import React, { Component } from 'react'

import styles from './index.module.less'

class index extends Component {
	constructor(props) {
		super(props)

		this.WebControl = window.WebControl
		this.JSEncrypt = window.JSEncrypt
		this.pubKey = ''
		this.initCount = 0

		const { width, height } = this.props
		this.width = width ? width : 1000
		this.height = height ? height : 600
	}

	componentDidMount() {
		this.initPlugin()

		//监听resize事件，使插件窗口尺寸跟随DIV窗口变化
		window.addEventListener('resize', this._resize)
		// 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
		window.addEventListener('scroll', this._resize, true)
	}

	render() {
		return (
			<div className={styles.videoBox}>
				<div
					id="playWnd"
					ref="playWndRef"
					style={{ width: this.width, height: this.height }}
				/>
			</div>
		)
	}

	initPlugin() {
		this.oWebControl = new this.WebControl({
			szPluginContainer: 'playWnd', // 指定容器id
			iServicePortStart: 15900, // 指定起止端口号，建议使用该值
			iServicePortEnd: 15909,
			szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11', // 用于IE10使用ActiveX的clsid
			cbConnectSuccess: () => {
				// 创建WebControl实例成功
				this.oWebControl
					.JS_StartService('window', {
						// WebControl实例创建成功后需要启动服务
						// 值"./VideoPluginConnect.dll"写死
						dllPath: './VideoPluginConnect.dll'
					})
					.then(
						() => {
							// 启动插件服务成功
							this.oWebControl.JS_SetWindowControlCallback({
								// 设置消息回调
								cbIntegrationCallBack: this.cbIntegrationCallBack
							})

							this.oWebControl
								.JS_CreateWnd('playWnd', this.width, this.height)
								.then(() => {
									//JS_CreateWnd创建视频播放窗口，宽高可设定
									this.init() // 创建播放实例成功后初始化
								})
						},
						function () {
							// 启动插件服务失败
						}
					)
			},
			cbConnectError: () => {
				// 创建WebControl实例失败
				this.oWebControl = null
				this.refs.playWndRef.html('插件未启动，正在尝试启动，请稍候...')
				this.WebControl.JS_WakeUp('VideoWebPlugin://') // 程序未启动时执行error函数，采用wakeup来启动程序
				this.initCount = 0
				this.initCount++
				if (this.initCount < 3) {
					setTimeout(function () {
						this.initPlugin()
					}, 3000)
				} else {
					this.refs.playWndRef.html('插件启动失败，请检查插件是否安装！')
				}
			},
			cbConnectClose: bNormalClose => {
				// 异常断开：bNormalClose = false
				// JS_Disconnect正常断开：bNormalClose = true
				this.oWebControl = null
			}
		})
	}

	//初始化
	init = () => {
		this.getPubKey(() => {
			////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
			const appkey = '28730366' //综合安防管理平台提供的appkey，必填
			const secret = this.setEncrypt('HSZkCJpSJ7gSUYrO6wVi') //综合安防管理平台提供的secret，必填
			const ip = '10.19.132.75' //综合安防管理平台IP地址，必填
			const playMode = 0 //初始播放模式：0-预览，1-回放
			const port = 443 //综合安防管理平台端口，若启用HTTPS协议，默认443
			const snapDir = 'D:\\SnapDir' //抓图存储路径
			const videoDir = 'D:\\VideoDir' //紧急录像或录像剪辑存储路径
			const layout = '1x1' //playMode指定模式的布局
			const enableHTTPS = 1 //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
			const encryptedFields = 'secret' //加密字段，默认加密领域为secret
			const showToolbar = 1 //是否显示工具栏，0-不显示，非0-显示
			const showSmart = 1 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
			const buttonIDs =
				'0,16,256,257,258,259,260,512,513,514,515,516,517,768,769' //自定义工具条按钮
			////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////

			this.oWebControl
				.JS_RequestInterface({
					funcName: 'init',
					argument: JSON.stringify({
						appkey: appkey, //API网关提供的appkey
						secret: secret, //API网关提供的secret
						ip: ip, //API网关IP地址
						playMode: playMode, //播放模式（决定显示预览还是回放界面）
						port: port, //端口
						snapDir: snapDir, //抓图存储路径
						videoDir: videoDir, //紧急录像或录像剪辑存储路径
						layout: layout, //布局
						enableHTTPS: enableHTTPS, //是否启用HTTPS协议
						encryptedFields: encryptedFields, //加密字段
						showToolbar: showToolbar, //是否显示工具栏
						showSmart: showSmart, //是否显示智能信息
						buttonIDs: buttonIDs //自定义工具条按钮
					})
				})
				.then(oData => {
					this.oWebControl.JS_Resize(this.width, this.height) // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
				})
		})
	}

	//获取公钥
	getPubKey = callback => {
		this.oWebControl
			.JS_RequestInterface({
				funcName: 'getRSAPubKey',
				argument: JSON.stringify({
					keyLength: 1024
				})
			})
			.then(oData => {
				console.log(oData)
				if (oData.responseMsg.data) {
					this.pubKey = oData.responseMsg.data
					callback()
				}
			})
	}

	//RSA加密
	setEncrypt = value => {
		const encrypt = new this.JSEncrypt()
		encrypt.setPublicKey(this.pubKey)
		return encrypt.encrypt(value)
	}

	setWndCover = () => {
		const iWidth = window.innerWidth
		const iHeight = window.innerHeight
		const oDivRect = this.refs.playWndRef.getBoundingClientRect()

		let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0
		let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0
		let iCoverRight =
			oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0
		let iCoverBottom =
			oDivRect.bottom - iHeight > 0 ? Math.round(oDivRect.bottom - iHeight) : 0

		iCoverLeft = iCoverLeft > this.width ? this.width : iCoverLeft
		iCoverTop = iCoverTop > this.height ? this.height : iCoverTop
		iCoverRight = iCoverRight > this.width ? this.width : iCoverRight
		iCoverBottom = iCoverBottom > this.height ? this.height : iCoverBottom

		this.oWebControl.JS_RepairPartWindow(0, 0, this.width + 1, this.height) // 多1个像素点防止还原后边界缺失一个像素条
		if (iCoverLeft !== 0) {
			this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.height)
		}
		if (iCoverTop !== 0) {
			this.oWebControl.JS_CuttingPartWindow(0, 0, this.width + 1, iCoverTop) // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
		}
		if (iCoverRight !== 0) {
			this.oWebControl.JS_CuttingPartWindow(
				this.width - iCoverRight,
				0,
				iCoverRight,
				this.height
			)
		}
		if (iCoverBottom !== 0) {
			this.oWebControl.JS_CuttingPartWindow(
				0,
				this.height - iCoverBottom,
				this.width,
				iCoverBottom
			)
		}
	}

	cbIntegrationCallBack = oData => {
		// showCBInfo(JSON.stringify(oData.responseMsg))
		console.log(JSON.stringify(oData))
	}

	setLayout = () => {
		this.oWebControl.JS_RequestInterface({
			funcName: 'setLayout',
			argument: JSON.stringify({
				layout: '2x2'
			})
		})
	}

	_resize = () => {
		if (this.oWebControl != null) {
			this.oWebControl.JS_Resize(this.width, this.height)
			this.setWndCover()
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._resize)
		window.removeEventListener('scroll', this._resize)
		if (this.oWebControl != null) {
			this.oWebControl.JS_HideWnd() // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
			this.oWebControl.JS_Disconnect().then(
				() => {
					// 断开与插件服务连接成功
					console.log('断开与插件服务连接成功')
				},
				() => {
					// 断开与插件服务连接失败
				}
			)
		}
	}
}

export default index
