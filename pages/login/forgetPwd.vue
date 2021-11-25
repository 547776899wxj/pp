<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">找回密码</block></cu-custom>
		<view class="container">
			<view class="fs-28 lh-28 fc-303 mb20">手机号码</view>
			<view class="form-group">
				<input placeholder="手机号码" maxlength="11" name="input" placeholder-class="fc-c4cc" v-model="form.mobile">
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">验证码</view>
			<view class="form-group">
				<input placeholder="验证码" maxlength="6" name="input" class="mr24" placeholder-class="fc-c4cc" v-model="form.code"></input>
				<button class='cu-btn form-group-btn bg-white' :class="!codeTimer?'pp-line-btn':''" @click="onSendCode">{{codeBtText}}</button>
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">新密码</view>
			<view class="form-group">
				<input placeholder="新密码" maxlength="16" name="input" type="password" placeholder-class="fc-c4cc" v-model="form.password"></input>
			</view>
			<text class="fs-20 fc-5 mt-12 mb84 db">新密码须为6-16位</text>
			<view class="wp100 mb32">
				<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onSubmit">确定</button>
			</view>
			<view class="flex-center">
				<navigator url="/pages/info/servicecenter/servicedetail?helpId=2" class="fs-28 lh-28 fc-62">无法接收验证码？</navigator>
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
					password: ''
				}
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
				uni.$api.sendResetPasswordSmsCode({
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
		
			onSubmit(){
				let {mobile, code, password} = this.form
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
				console.log(JSON.stringify(this.form))
				uni.$api.resetPwdByMobileWithSmsCode({
					mobile: mobile,
					code: code,
					password: password
				}).then(res =>{
						console.log(JSON.stringify(res))
						
					uni.$toast.showSuccess('重置密码成功')
					setTimeout(()=>{
						uni.navigateBack()
					},1000)
					
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
</style>
