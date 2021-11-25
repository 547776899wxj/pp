<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">绑定手机号</block></cu-custom>
		<view class="container">
			<view class="bankinfo">
				<view class="bankinfo-list mb24">
					<view class="bankinfo-content lh-40">您的微信账号 {{nickname}}  通过验证手机号码用来登录、找回密码和便捷升级其他服务，好获拍拍App保证会员信息不被泄漏和挪作其他用途。</view>
				</view>
			</view>
			<view class="content">
				<view class="form-group">
					<input placeholder="手机号码" maxlength="11" name="input" placeholder-class="fc-c4cc" v-model="form.mobile">
				</view>
				<view class="form-group mb80">
					<input placeholder="验证码" maxlength="6" name="input" class="mr24" placeholder-class="fc-c4cc" v-model="form.code"></input>
					<button class='cu-btn form-group-btn bg-white' :class="{'form-group-phonebtn':!codeTimer}" @click="onSendCode">{{codeBtText}}</button>
				</view>
				<view class="mt32 mb32 dflex jc-fs ac wp100">
					<checkbox class="hh-radio fs-0 mr16 round" :class="form.isCheck?'checked':''" :checked="form.isCheck" @click="form.isCheck = !form.isCheck"></checkbox>
					<view class="fs-22 lh-32 fc-9d">我已阅读并同意<navigator url="agreement/agreement?agreementId=1" class="fc-819 dib">《好获拍拍服务协议》</navigator></view>
				</view>
				<view class="wp100 mb32">
					<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onRegister">登录</button>
				</view>
				<view class="flex-center">
					<navigator url="/pages/info/servicecenter/servicedetail?helpId=2" class="fs-28 lh-28 fc-606">无法接收验证码？</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				codeTimer:'',
				codeTimeInitSecond: 60,
				codeTimerInterval: '',
				codeBtText: '获取验证码',
				form:{
					openid: '',
					inviteCode: '',
					mobile: '',
					code: '',
					password: '',
					isCheck:false
				},
			}
		},
		onLoad(e) {
			let data = decodeURIComponent(e.data || '')
			let {openid, nickname} = JSON.parse(data || '{}')
			console.log('onload', decodeURIComponent(e.data))
			this.form.openid = openid
			this.nickname = nickname
		},
		methods: {
			onSendCode(){
				let {mobile} = this.form
				if (this.codeTimer) return
				if (!mobile) {
					uni.$toast.showError('请输入手机号码'); 
					return;
				}
				this.codeTimer = 'pre'
				uni.$api.sendBindWxSmsCode({
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
				
				let {mobile, code, openid, isCheck} = this.form
				if (!openid) {
					uni.$toast.showError('微信未授权，openId不能为空'); 
					return;
				}
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
				uni.$api.loginByBindWx(this.form).then(res =>{
					uni.$auth.loginSuccess(res)
					uni.$toast.showToast("绑定成功！");
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/index/main"
						})
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
	padding: 32rpx 28rpx;
}
.bankinfo {
	padding: 32rpx;
	width: 100%;
	height: 172rpx;
	background: #FAFAFA;
	color: #606266;
	opacity: 1;
	border-radius: 20rpx;
}
.container.content {
	padding: 32rpx;
}
.bankinfo-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.bankinfo-title {
	width: 200rpx;
	font-size: 30rpx;
	color: #303133;
}
.bankinfo-content {
	font-size: 24rpx;
	color: #606266;
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
