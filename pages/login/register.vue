<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">注册</block></cu-custom>
		<view class="container">
			<!--<view class="fs-28 lh-28 fc-303 mb20">邀请码</view>
			<view class="form-group">
				<input placeholder="邀请码" name="input" placeholder-class="fc-c4cc" v-model="form.inviteCode">
			</view>-->
			<view class="fs-28 lh-28 fc-303 mb20">手机号码</view>
			<view class="form-group">
				<input placeholder="手机号码" maxlength="11" name="input" placeholder-class="fc-c4cc" v-model="form.mobile">
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">验证码</view>
			<view class="form-group">
				<input placeholder="验证码" maxlength="6" name="input" class="mr24" placeholder-class="fc-c4cc" v-model="form.code"></input>
				<button class='cu-btn form-group-btn bg-white' :class="{'form-group-phonebtn':!codeTimer}" @click="onSendCode">{{codeBtText}}</button>
				
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">新密码</view>
			<view class="form-group">
				<input placeholder="新密码" maxlength="16" name="input" type="password" placeholder-class="fc-c4cc" v-model="form.password"></input>
			</view>
			<text class="fs-20 fc-5 mt-12  db">新密码须为6-16位</text>

			<view class="mt32 mb32 dflex jc-fs ac wp100">
				<checkbox class="hh-radio fs-0 mr16 round" :class="form.isCheck?'checked':''" :checked="form.isCheck" @click="form.isCheck = !form.isCheck"></checkbox>
				<view class="fs-22 lh-32 fc-9d">我已阅读并同意<navigator url="agreement/agreement?agreementId=1" class="fc-819 dib">《好获拍拍服务协议》</navigator></view>
			</view>
			<view class="wp100 mb32">
				<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onRegister">提交</button>
			</view>
			<view class="flex-center">
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
					inviteCode: '',
					mobile: '',
					code: '',
					password: '',
					isCheck:false
				},
				modalName: null,
				domainStatic:this.domainStatic,
			}
		},
		onLoad(e) { 
			console.log('onLoad',e)
		},
		destroyed() {
			console.log("destroyed")
		},
		methods: {
			onSendCode(){
				// let {codeTimer,codeTimerInterval, codeTimeInitSecond, codeBtText} = this
				let {mobile} = this.form
				if (this.codeTimer) return
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				console.log('in')
				this.codeTimer = 'pre'
				uni.$api.sendRegisterSmsCode({
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
			onRegister(){
				
				let {mobile, code, password, isCheck} = this.form
				
				if (!isCheck) {
					uni.$toast.showError('协议未勾选'); 
					return;
				}
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				if (!code) {
					uni.$toast.showError('请输入验证码'); 
					return;
				}
				if (!password) {
					uni.$toast.showError('请输入密码');
					return;
				}
				uni.$api.appRegister(this.form).then(res =>{
					console.log(JSON.stringify(res))
					uni.$auth.loginSuccess(res)
					uni.$toast.showToast("注册成功！");
					uni.redirectTo({
						url: '/pages/login/realname'
					});
					
					
				})
				
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding: 32rpx 60rpx;
}
.mt-12 {
	margin-top: -12px;
}
.mb84 {
	margin-bottom: 84rpx;
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
.agreement-modal {
	z-index: 10000;
}
.agreement-content {
	height: 820rpx;
	background: #FFFFFF;
	opacity: 1;
	border-radius: 12px;
}
.cu-bar {
	height: 180rpx;
	padding: 32rpx 48rpx;
	box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.06);
}
.line-de6 {
	color: #303133;
	border: 1px solid #DDDDE6;
}
.w154 {
	width: 154rpx;
}
</style>
