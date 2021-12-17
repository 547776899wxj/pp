<template>
	<view>
		<view style="height: 60rpx;"></view>
		<view class="cu-bar search">
			<view class="action" @click="onLoginClose()">
				<text class="cuIcon-close"></text>
			</view>
			<view class="action" @click="goToRegister()">
				注册
			</view>
		</view>
		<view class="container">
			<view class="flex-center logo-box mb66">
				<image src="../../static/img/images/logo@2x.png" class="logo"></image>
			</view>
			<view class="form-group">
				<input placeholder="手机号码" maxlength="11" name="input" placeholder-class="fc-c4cc" v-model="form.userName">
			</view>
			<view class="form-group">
				<input placeholder="密码" maxlength="16"  name="input" type="password" placeholder-class="fc-c4cc" v-model="form.password"></input>
			</view>
			<!-- <view class="form-group mb14">
				<view class="title">验证码</view>
				<input placeholder="输入框带个按钮" name="input"></input>
				<button class='cu-btn bg-green shadow'>验证码</button> -->
				<!-- <view class="mt32 mb48 dflex jc-fs ac wp100">
					<checkbox class="hh-radio fs-0 mr16 round" :class="form.isCheck?'checked':''" :checked="form.isCheck" @click="form.isCheck = !form.isCheck"></checkbox>
					
					<view class="fs-22 lh-32 fc-9d">我已阅读并同意<navigator url="agreement/agreement" class="fc-819 dib">《好获拍拍服务协议》</navigator></view>
				</view> 
			</view>-->
			<view class="wp100 mb48">
				<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onLogin">登录</button>
			</view>
			<view class="flex-between ac">
				<navigator url="phonelogin" class="fs-28 lh-28 fc-606">手机验证码登录</navigator>
				<navigator url="forgetPwd" class="fs-28 lh-28 fc-606">忘记密码？</navigator>
			</view>
			<view class="other-login" v-if="ckVersion != 1">
				<view class="other-login-title flex-center mb40">
					<view class="line"></view>
					<view class="fs-24 lh-24 fc-606 ml34 mr32">其他登录方式</view>
					<view class="line"></view>
				</view>
				<view class="flex-center">
					<view @click="wxLogin" class="flex-center fdc mr72" url="phonebindwx">
						<image src="../../static/img/icon/wx-login@2x.png" class="wx-login-icon mb24"></image>
						<text>微信一键登录</text>
					</view>
					<view class="flex-center fdc" @click.stop="phoneOneCodeLogin()">
						<image src="../../static/img/icon/phone-login.png" class="wx-login-icon mb24"></image>
						<text>本机一键登录</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	

	
	export default {
		data() {
			return {
				form:{
					userName: '',
					password: '',
					isCheck: true,
				},
				md5LocalKey:'9909',
				ckVersion: '',
				clientInfo:{
					id:"",
					token:"",
					clientid:"",
					appid:"",
					appkey:""
				},//推送信息
				devType:""//手机类型
			}
		},
		created() {
			//#ifdef APP-PLUS
			this.setPhoneInfo()
			//#endif
		},
		onShow() {
			this.ckVersion = uni.$session.getIosCkVersion() || ''
		},
 		methods: {
			setPhoneInfo () {
				console.log("setPhoneInfo:")
				var devType = this.getDevPlate()
				var clientInfo = plus.push.getClientInfo()
				this.devType = devType
				this.clientInfo = clientInfo
			},
			getPhoneMd5 (phoneNum,code) {
				var md5Str = code+phoneNum+this.md5LocalKey
				console.log("md5Str:"+md5Str)
				return uni.$utils.strMd5(md5Str)
			},
			uniLogin (code) {
				var self = this
				uni.login({
					provider: 'univerify',
					univerifyStyle:{
						fullScreen:false,
						otherLoginButton:{}
					},
					success:function(res){
						var token = res.authResult.access_token
						var openId = res.authResult.openid
						uniCloud.callFunction({
						  name: 'getPhoneNumber', // 你的云函数名称
						  data: {
						    'access_token': token, 
						    'openid': openId 
						  }
						}).then(res => {
							var result = res.result
							var phoneNum = result.phoneNumber
							self.phoneLogin(phoneNum,code)
						}).catch(err=>{
							console.log(JSON.stringify(err))
							uni.$toast.showError("登录失败:"+err.errMsg)
							uni.closeAuthView()
						  // 处理错误
						})
					},
					fail (res) {
						console.log(JSON.stringify(res))
						var str = "";
						if (res.errCode == 30003) {
							str = "用户取消"
						} else {
							str = res.errMsg
						}
						uni.$toast.showError("登录失败:"+str)
						uni.closeAuthView()
					}
				})
			},
			phoneOneCodeLogin () {
				var param = {
					clientId:this.clientInfo.clientid
				}
				var self = this
				uni.$api.getPhoneLoginMD5Code(param).then(res => {
					console.log("MD5KEY,随机数",res.key)
					var code = res.key
					self.uniLogin(code)
				})
			},
			phoneLogin (phoneNum,code) {
				var md5 = this.getPhoneMd5(phoneNum,code)
				var param = {
					phoneNum:phoneNum,
					phoneNumMd5:md5,
					clientId:this.clientInfo.clientid,
					clientType:this.devType
				}
				console.log("登录:"+JSON.stringify(param))
				
				uni.$api.loginByLocalMobile(param). then(res => {
					console.log("接口返参:"+JSON.stringify(res))
					uni.closeAuthView()//关闭一键登录弹窗
					uni.$toast.showToast("登录成功！");
					uni.$auth.loginSuccess(res)
					setTimeout(()=>{
						this.onLoginClose()
					},1000)
				}).catch(res => {
					uni.$toast.showError("登录失败:"+res.message)
					uni.closeAuthView()//关闭一键登录弹窗
				})
			},
			getDevPlate () {
				return uni.getSystemInfoSync().platform
			},
			wxLogin:function(){
				
				const self = this
				uni.getProvider({
					    service: 'oauth',
					    success: function(res) {
					        //支持微信、qq和微博等
					        if (~res.provider.indexOf('weixin')) {
					            uni.login({
							        provider: 'weixin',
								    success: function (loginRes) {
								        console.log("App微信获取用户信息成功",loginRes);
				                        //调用后端接口做登陆操作
								        // uni.$toast.showError(JSON.stringify(loginRes));
										// {
										// 	"authResult": {
										// 		"access_token": "44_9rh7VOWGjaMrANFxnGKpC_FohnAUUF_YJF-ZFHpipUeLw5_4efDyJTHYudkpFhho3g8vLihelnkYEw50lUsLKyRyO3Diz46GcvmuTAHhOYc",
										// 		"expires_in": 7200,
										// 		"refresh_token": "44_KV0obAn1wdxzt2u-hxANUjBNrKWiyBxT-YE6sWSra7LPCgl_RWKd2-BDVbFF-jGF0WeA92xORN1lGv8-UkfkldkyYCCU4PI8Ptsq08x69-Q",
										// 		"openid": "oRrdQt1kXPgxhMZX0IkyWE6uy1C8",
										// 		"scope": "snsapi_userinfo",
										// 		"unionid": "oU5Yyt9X7v-frNmUPEnII3PvbjyQ"
										// 	},
										// 	"errMsg": "login:ok"
										// }
										let {openid, unionid, access_token} = loginRes.authResult || {}
										if (openid){
											uni.$api.loginByWxOpenId({
												access_token,openid,unionid
											}).then(res =>{
												let {exist, nickname} = res || {}
												if (exist == "1"){
													uni.$toast.showToast("登录成功！");
													uni.$auth.loginSuccess(res)
													setTimeout(()=>{
														self.onLoginClose()
													},1000)
												}
												else {
													let params = {
														openid,nickname
													}
													uni.navigateTo({
														url:"/pages/login/phonebindwx?data="+ encodeURIComponent(JSON.stringify(params))
													})
												}
											})
										}
										else {
											uni.$toast.showError(loginRes.errMsg);
										}
										
								    },
								    fail:function(loginRes){
								        console.log("App微信获取用户信息失败",loginRes);
				                        //调用后端接口做登陆操作
								        uni.$toast.showError(loginRes.errMsg);
										// {
										// 	"errMsg": "login:fail 客户端未安装,http://ask.dcloud.net.cn/article/282",
										// 	"errCode": -8,
										// 	"code": -8
										// }
								    }
							    })
				            }
				        }
				    });
			},
			goToRegister:function(){
				uni.navigateTo({
					url:"/pages/login/register"
				})
			},
			onLoginClose:function(){
				uni.switchTab({
					url:"/pages/auction/specialshow"
				})
				// if(getCurrentPages().length == 1){
				// 	uni.switchTab({
				// 		url:"/pages/index/main"
				// 	})
				// 	uni.setStorageSync('curbar', 1);
				// }else{
				// 	uni.navigateBack({delta: 1});
				// }
			},
			onLogin(){
				let {userName, password, isCheck} = this.form
				/* if (!isCheck) {
					uni.$toast.showError('协议未勾选'); 
					return;
				} */
				if (!userName) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				if (!password) {
					uni.$toast.showError('请输入密码');
					return;
				}
				console.log(uni.$config,userName, password)
				uni.$api.loginByMobileWithPassword({
					mobile: userName,
					password: password
				}).then(res =>{
					console.log(JSON.stringify(res))
					uni.$toast.showToast("登录成功！");
					uni.$auth.loginSuccess(res)
					setTimeout(()=>{
						this.onLoginClose()
					},1000)
				})
				
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
	min-height: 100vh;
}
.container {
	padding: 40rpx 40rpx;
}
.logo {
	width: 240rpx;
	height: 240rpx;
	border-radius: 24rpx;
}
.title {
	font-size: 30rpx;
	width: 150rpx;
}
.form-group {
	width: 100%;
	height: 90rpx;
	background: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 32rpx;
}
.form-group input {
	height: 100%;
	padding: 0 32rpx;
	font-size: 30rpx;
	border: 1px solid #DDDDE6;
	opacity: 1;
	border-radius: 16rpx;
	width: 100%;
	color: #303133;
	display: inline-block;
}
.form-group input::placeholder {
	color: #c4c4cc;
}
.form-group-btn {
	width: 224rpx;
	height: 90rpx;
	background: #FFFFFF;
	border: 1px solid #FF411C;
	opacity: 1;
	border-radius: 16rpx;
	display: inline-block;
	font-size: 30rpx;
	line-height: 90rpx;
	color: #FF411C;
	flex-shrink: 0;
}
.border-btn {
	border-radius: 45rpx;
}
.bg-pp {
	background: linear-gradient(127deg, #E93A37 0%, #FF6346 100%);
}
.cu-btn.lg {
	font-size: 28rpx;
	height: 90rpx;
}
.other-login {
	margin: 12vh auto 0;
	width: calc(100% - 64rpx);
}
.other-login-title .line {
	width: 198rpx;
	height: 2rpx;
	background-color: #dddde3;
}
.wx-login-icon {
	width: 80rpx;
	height: 80rpx;
}
</style>
