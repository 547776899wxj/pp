<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			
			uni.$ckVersionResult = uni.$session.getIosCkVersion() || 0
			
			this.setSystemInfo()
			this.registerColor()
			// #ifdef APP-PLUS  
			this.checkAppUpdate()
			// #endif
			
			var devType = uni.getSystemInfoSync().platform
			var clientid = ''
			// #ifdef APP-PLUS
			clientid = plus.push.getClientInfo().clientid
			// #endif
			uni.$deviceType = devType || ''
			uni.$deviceId = clientid || ''
			console.log('uni.$deviceType:'+uni.$deviceType)
			console.log('uni.$deviceId:'+uni.$deviceId)
			// #ifdef APP-PLUS
			this.onSubscribePush()
			// #endif
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			onSubscribePush(){
				 //开启推送
				uni.subscribePush({
					provider: "unipush",
					success: function(res) {
						console.log("subscribePush success:" + JSON.stringify(res));
						uni.$deviceId = res.clientid || ''
						console.log('uni.$deviceId:'+uni.$deviceId)
					}
				});
				plus.push.addEventListener(
					"click",
				  //这里写业务逻辑
					function(data) {
						console.log("addEventListener click:" + JSON.stringify(data));
						
					},
					false
				);
			},
			setSystemInfo() {
				console.log("setSystemInfo")
				uni.getSystemInfo({
					success: function(e) {
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
				
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif		
				
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			},
			registerColor () {
				Vue.prototype.ColorList = [{
						title: '嫣红',
						name: 'red',
						color: '#e54d42'
					},
					{
						title: '桔橙',
						name: 'orange',
						color: '#f37b1d'
					},
					{
						title: '明黄',
						name: 'yellow',
						color: '#fbbd08'
					},
					{
						title: '橄榄',
						name: 'olive',
						color: '#8dc63f'
					},
					{
						title: '森绿',
						name: 'green',
						color: '#39b54a'
					},
					{
						title: '天青',
						name: 'cyan',
						color: '#1cbbb4'
					},
					{
						title: '海蓝',
						name: 'blue',
						color: '#0081ff'
					},
					{
						title: '姹紫',
						name: 'purple',
						color: '#6739b6'
					},
					{
						title: '木槿',
						name: 'mauve',
						color: '#9c26b0'
					},
					{
						title: '桃粉',
						name: 'pink',
						color: '#e03997'
					},
					{
						title: '棕褐',
						name: 'brown',
						color: '#a5673f'
					},
					{
						title: '玄灰',
						name: 'grey',
						color: '#8799a3'
					},
					{
						title: '草灰',
						name: 'gray',
						color: '#aaaaaa'
					},
					{
						title: '墨黑',
						name: 'black',
						color: '#333333'
					},
					{
						title: '雅白',
						name: 'white',
						color: '#ffffff'
					},
				]
			},
			checkAppUpdate () {
				//#ifdef APP-PLUS  
				switch(uni.getSystemInfoSync().platform){
				    case 'android':
						this.checkAndroidUpdate()
				       break;
				    case 'ios':
						this.checkIOSUpdate()
				       break;
				}
				//#endif  
			},
			downLoadNewApk(url) {
				// uni.$toast.showToast("正在后台下载中，请稍候");
				// forceUpdate == 1 静默更新 只能更新wgt包
				var showLoading = null;
				var downloadTask = uni.downloadFile({
					url: url,
					success: downloadResult => {
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(downloadResult.tempFilePath,{force: false},
								function() {
									showLoading.close();
									plus.runtime.restart();
								},
								function(e) {
									uni.showModal({
										title: '提示',
										content: '下载失败',
										showCancel: false,
										success: res => {},
									});
									showLoading.close();
								}
							);
						}else{
							uni.showModal({
								title: '提示',
								content: '下载失败',
								showCancel: false,
								success: res => {},
							});
							showLoading.close();
						}
					}
				});
			
				showLoading = plus.nativeUI.showWaiting('正在下载');
				var prg = 0;
				downloadTask.onProgressUpdate(e => {
					prg = parseInt(e.progress);
					showLoading.setTitle('  正在下载' + prg + '%,请勿关闭页面  ');
				});
			},
			checkAndroidUpdate () {
				var that = this
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
					
					console.log("版本信息:"+JSON.stringify(widgetInfo))
					
					var param = {
						clientType:"android",
						versionCode:widgetInfo.versionCode
					}
					
					uni.$api.checkAppVersion(param).then(res => {
						console.log("更新接口返参:"+JSON.stringify(res))
						var content = "当前版本:"+widgetInfo.version+"需要更新"
						var {needUpdate,androidUrl,forceUpdate} = res
						if (needUpdate) {
							if (forceUpdate == 1) {
								that.downLoadNewApk(androidUrl);
							} else {
								uni.showModal({ //提醒用户更新
									title: "更新提示",  
									content: content, 
									success: (res) => {  
										if (res.confirm) {
											that.downLoadNewApk(androidUrl);
										}
									}
								})  
							}
							
							
						}
					})
				});  
			},
			checkIOSUpdate () {
				const self = this
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					
					console.log("版本信息:"+JSON.stringify(widgetInfo))
					
					var param = {
						clientType:"ios",
						versionCode:widgetInfo.versionCode
					}
					
					uni.$api.checkAppVersion(param).then(res => {
						console.log("更新接口返参:"+JSON.stringify(res))
						var {needUpdate,iosUrl,forceUpdate,ckVersion} = res
						if (needUpdate) {
							var content = "当前版本:"+widgetInfo.version+"需要更新"
							self.iosUpdate(iosUrl, forceUpdate,content)
						}
						uni.$ckVersionResult = 0
						if (ckVersion == 1){
							uni.$ckVersionResult = 1
						}
						uni.$session.setIosCkVersion(uni.$ckVersionResult)
					})
				});  
			},
			iosUpdate(iosUrl,forceUpdate, updateContent){
				 const self = this
				if (forceUpdate == 1) {
					uni.showModal({ //强制用户更新
						title: "更新提示",  
						showCancel: false,
						content: updateContent, 
						success: (res) => {  
							self.iosUpdate(iosUrl, forceUpdate, updateContent)
							if (res.confirm) {
								plus.runtime.openURL(iosUrl);  
							}
							
						}
					})
				} else {
					uni.showModal({ //提醒用户更新
						title: "更新提示",  
						content: updateContent, 
						success: (res) => {  
							if (res.confirm) {
								plus.runtime.openURL(iosUrl); 
							}
						}
					})  
				}
			}
			
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "styles/arrow.css";
	@import "styles/checkbox.css";
	@import "styles/color.css";
	@import "styles/common.css";
	@import "styles/font.css";
	@import "styles/margin.css";
	@import "styles/padding.css";
	@import "styles/number-font.css";

	uni-tabbar .uni-tabbar__reddot {
		background-color: #FF411C;
	}

	.text-light {
		font-weight: 300;
	}
	
	.bg-156 {
		background-color: #156FE6;
		color: #fff;
	}

	/* .din-r {
		font-family: 'din-r';
	}

	.din-m {
		font-family: 'din-m';
	}

	.din-b {
		font-family: 'din-b';
	} */

	/* .osw {
		font-family: 'Oswald';
	} */

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	uni-checkbox.hh-radio .uni-checkbox-input {
		width: 36rpx;
		height: 36rpx;
		background-color: unset !important;
		border-color: #d1d1d1 !important;
	}

	checkbox::before {
		font-size: 32rpx;
		right: 4rpx;
		margin-top: -16rpx;
		line-height: 32rpx;
	}
	uni-checkbox.hh-radio .uni-checkbox-input-checked {
		background-color: #FF411C !important;
		border-color: #FF411C !important;
	}
	
	uni-checkbox.hh-radio.address-checked .uni-checkbox-input {
		background-color: #FF411C !important;
		border-color: #FF411C !important;
	}

	uni-swiper.no-dot .uni-swiper-dots {
		display: none;
	}
	.cu-bar.tabbar .action [class*="icon-"] {
		width: 100upx;
		position: relative;
		display: block;
		height: auto;
		margin: 0 auto 10upx;
		text-align: center;
		font-size: 40upx;
	}
	.cu-bar.tabbar .action.add-action [class*="icon-"] {
		position: absolute;
		width: 70upx;
		z-index: 2;
		height: 70upx;
		border-radius: 50%;
		line-height: 70upx;
		font-size: 50upx;
		top: -35upx;
		left: 0;
		right: 0;
		margin: auto;
		padding: 0;
	}

	.cu-bar.tabbar .action.add-action::before {
		content: "";
		position: absolute;
		width: 100upx;
		height: 30upx;
		bottom: 30upx;
		left: 0;
		right: 0;
		margin: auto;
		background-color: inherit;
		z-index: 1;
	}
</style>
