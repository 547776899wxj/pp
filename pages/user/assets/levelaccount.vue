<template>
	<view>
		<cu-custom bgColor="bg-156" pageClassR="fc-f op75 pr32" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{up?'升级合拍账户':'共享余额'}}</block>
		</cu-custom>
		<view class="color-bg"></view>
		<view class="container">
			<view class="flex-center fdc">
				<view class="fs-24 lh-24 fc-fef mb18">我的零钱余额</view>
				<view class="fs-60 lh-60 fc-fef mb100">{{balanceMoney}}</view>
				<view class="share-people mb20">
					<image :src="userPhoto||'/static/img/icon/default-user.png'" mode="" class="share-head"></image>
					<view class="dflex fdc ai-fs">
						<view class="fs-32 lh-32 fc-3 mb18">被共享人姓名：{{userCertName}}</view>
						<view class="fs-24 lh-24 fc-9">被共享人手机号码：{{mobile}}</view>
					</view>
				</view>
				<view class="share-assets mb40">
					<view class="fs-28 lh-28 fc-3 mb20">共享金额</view>
					<view class="input-box mb28">
						<input type="number"
						confirm-type="next"
						 v-model="form.money" 
						 maxlength="10" 
						 @blur="onMoneyInput"
						 placeholder="请输入共享金额" class="fs-28 lh-28 fc-3" placeholder-class="fs-28 lh-28 fc-9">
					</view>
					<view class="fs-28 lh-28 fc-3 mb20">合拍收益</view>
					<view class="input-box mb20">
						<input type="number"
						confirm-type="done"
						 v-model="form.profitMoney" 
						 maxlength="10" 
						 @blur="onProfitMoneyInput"
						  placeholder="请输入合拍收益" class="fs-28 lh-28 fc-3" placeholder-class="fs-28 lh-28 fc-9">
					</view>
					<view class="fs-20 lh-32 fc-9" v-if="up">共享金额给对方后，对方将升级成合拍账户，合拍账户无法提现，对方解除共享时，将共享金额和合拍收益一并转入您的零钱账户</view>
				</view>
				<view class="sure-btn flex-center fs-32 lh-32 fc-f" @click='onSubmit'>确定</view>
				<!-- <view class="fs-28 lh-68 fc-336" v-if="up">
					什么是合拍账户？
				</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				up: '',
				acceptUserId:'',
				balanceMoney:'',
				mobile:'',
				userPhoto:'',
				userCertName: '',
				form:{
					money:'',
					profitMoney: '',
				},
				moneyTimer:'',
				profitMoneyTimer:'',
			}
		},
		onLoad(options) {
			this.up = options.up || ''
			this.acceptUserId = options.acceptUserId || ''
			this.onFetchData()
		},
		methods: {
			onFetchData(){
				uni.$api.getDataByBalanceShareApply({
					acceptUserId: this.acceptUserId || ''
				}).then(({data}) =>{
					this.balanceMoney = data.balanceMoney || 0
					this.mobile = data.mobile || ''
					this.userPhoto = data.userPhoto || ''
					this.userCertName = data.userCertName || ''
				})
			},
			onMoneyInput(e){
				const self = this
				let value = uni.$utils.formatDigit(e.detail.value)
				// console.log('value',value)
				// if (self.balanceMoney < value){
				// 	self.form.money = self.balanceMoney
				// }
				// else {
					self.form.money = value
				// }
				self.form.profitMoney = ''
				self.$forceUpdate()
				console.log('self.form.money',self.form.money)
			},
			onProfitMoneyInput(e){
				const self = this
				let value = uni.$utils.formatDigit(e.detail.value)
				console.log('value',value)
				if (self.form.money < value){
					self.form.profitMoney = self.form.money
				}
				else {
					self.form.profitMoney = value
				}
				self.$forceUpdate()
				console.log('self.form.profitMoney',self.form.profitMoney)
			},
			onSubmit(){
				if (this.form.money === ''){
					 uni.$toast.showToast('共享金额不能为空')
					return
				}
				if (this.form.profitMoney === ''){
					 uni.$toast.showToast('合拍收益不能为空')
					return
				}
				
				uni.$toast.confirm('共享金额:'+this.form.money+'元,合拍收益:'+this.form.profitMoney+'元,是否确定共享?').then(res=>{
					uni.$api.confirmBalanceShareApplay({
						acceptUserId: this.	acceptUserId,
						...this.form
					}).then(res =>{
						uni.$toast.showToast('已发送合拍申请，等待对方同意')
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/user/index'
							})
						},1000)
					})
				})
			}
		}
	}
</script>

<style>
	.color-bg {
		width: 100%;
		height: 976rpx;
		background: linear-gradient(180deg, #156FE6 0%, #227CE7 26%, #5DC3E6 57%, #F6F6F6 100%);
		position: absolute;
		left: 0;
		z-index: 0;
	}
	
	.container {
		padding: 40rpx 32rpx;
		position: relative;
		z-index: 1;
	}
	
	.share-people {
		width: 100%;
		height: 176rpx;
		padding: 28rpx;
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.share-head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		margin-right: 12rpx;
	}
	
	.share-assets {
		width: 100%;
		padding: 28rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.input-box {
		width: 100%;
		height: 82rpx;
		background-color: #f6f6f6;
		border-radius: 20rpx;
	}
	
	.input-box input {
		width: 100%;
		height: 100%;
		padding: 0 28rpx;
	}
	
	.sure-btn {
		width: 100%;
		height: 100rpx;
		border-radius: 50rpx;
		background: linear-gradient(90deg, #D52F2C 0%, #F2573C 100%);
	}
	
	.fc-fef {
		color: #fefefe;
	}
	
	.mb100 {
		margin-bottom: 100rpx;
	}
	
	.lh-68 {
		line-height: 68rpx;
	}
	
	.fc-336 {
		color: #336ab1;
	}
</style>
