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
				<image :src="domainStatic+'/img/images/logo@2x.png'" class="logo"></image>
			</view>
			<view class="form-group">
				<input placeholder="手机号码" maxlength="11" name="input" placeholder-class="fc-c4cc" v-model="form.mobile">
			</view>
			<view class="form-group">
				<input placeholder="验证码" maxlength="6" name="input" class="mr24" placeholder-class="fc-c4cc" v-model="form.code"></input>
				<button class='cu-btn form-group-btn bg-white' :class="{'form-group-phonebtn':!codeTimer}" @click="onSendCode">{{codeBtText}}</button>
			</view>
		<!-- 	<view class="form-group mb14">
				<view class="mt32 mb48 dflex jc-fs ac wp100">
					<checkbox class="hh-radio fs-0 mr16 round" :class="form.isCheck?'checked':''" :checked="form.isCheck" @click="form.isCheck = !form.isCheck"></checkbox>
					<view class="fs-22 lh-32 fc-9d">我已阅读并同意<navigator url="agreement/agreement" class="fc-819 dib">《好获拍拍服务协议》</navigator>并使用本机号码登录</view>
				</view>
			</view> -->
			<view class="wp100 mb48">
				<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onLogin">登录</button>
			</view>
			<view class="flex-between ac">
				<navigator url="login" class="fs-28 lh-28 fc-606">账号密码登录</navigator>
				<navigator url="/pages/info/servicecenter/servicedetail?helpId=2" class="fs-28 lh-28 fc-606">无法接收验证码？</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeTimer:'',
				codeTimeInitSecond: 60,
				codeTimerInterval: '',
				codeBtText: '获取验证码',
				form:{
					mobile: '',
					code: '',
					isCheck: true,
				},
				domainStatic:this.domainStatic,
			}
		},
		methods: {
			onSendCode(){
				
				let {mobile} = this.form
				if (this.codeTimer) return
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				console.log('in')
				this.codeTimer = 'pre'
				uni.$api.sendLoginSmsCode({
					mobile: mobile
				}).then(()=>{
					uni.$toast.showSuccess('发送成功')
					this.codeTimerInterval = this.codeTimeInitSecond
					this.codeTimer = setInterval(()=>{
						if (this.codeTimerInterval == 0){
							this.codeBtText = '获取验证码'
							clearInterval(this.codeTimer)
							this.codeTimer = ''
							return
						}
						this.codeTimerInterval--
						this.codeBtText = this.codeTimerInterval +'s'
						
					},1000)
				}).catch(()=>{
					this.codeTimer = ''
				})
			},
			onLogin(){
				let {mobile, code} = this.form
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				if (!code) {
					uni.$toast.showError('请输入验证码');
					return;
				}
				console.log(JSON.stringify(this.form))
				uni.$api.loginByMobileWithSmsCode({
					mobile: mobile,
					code: code
				}).then(res =>{
						console.log(JSON.stringify(res))
					uni.$auth.loginSuccess(res)
					setTimeout(()=>{
						this.onLoginClose()
					},1000)
				
				})
				
			},
			goToRegister:function(){
				uni.navigateTo({
					url:"register"
				})
			},
			onLoginClose:function(){
				uni.switchTab({
					url:"/pages/index/main"
				})
				// if(getCurrentPages().length == 1){
				// 	uni.reLaunch({
				// 		url:"/pages/index/index"
				// 	})
				// 	uni.setStorageSync('curbar', 1);
				// }else{
				// 	uni.navigateBack({delta: 1});
				// }
				
			},
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding: 66rpx 72rpx;
}
.logo {
	width: 173rpx;
	height: 173rpx;
}
.title {
	font-size: 30rpx;
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
	position: absolute;
	bottom: 120rpx;
	left: 72rpx;
	right: 72rpx;
	width: calc(100% - 144rpx);
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
