<template>
	<view>
		<cu-custom bgColor="bg-f6" rightUrl="./history" pageClassR="fc-ff4 pr32" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">提现</block>
			<block slot="right">提现历史</block>
		</cu-custom>
		<view class="container">
			<view class="fs-28 lh-28 fc-303 mb20">提现到</view>
			<view class="bank-box flex-between ac mb32">
				<view class="">
					<view class="bank-info dflex ac mb6">
						
						<view class="bank-card-info text-hidden">{{info.cardBankName}}（{{info.cardNo}}）</view>
					</view>
					<!-- <view class="fs-24 lh-34 fc-939 ml92">预计两天内到账</view> -->
				</view>
				
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">提现金额</view>
			<view class="form-group">
				<input placeholder="请输入提现金额" type="digit" maxlength="10" name="input" placeholder-class="fc-c4cc" v-model="form.money" @input="onMoneyInput">
			</view>
			<view class="fs-24 lh-34 fc-939 mt-24 mb32">零钱 {{info.money}} 可用于提现零钱{{info.money}}</view>
			
			<view v-if="couponList.total > 0">
				<view class="fs-28 lh-28 fc-303 mb20">提现优惠券</view>
				<picker mode="selector" :range="couponList.rows" range-key="selectName" @change="couponSelect">
					<view class="remark-list flex-between ac mb32">
						<view class="fs-28 fc-303">{{selectCoupon.couponName}}</view>
						<view class="fs-28 fc-ff4" v-if="selectCoupon.num">{{selectCoupon.num}}张</view>
					</view>
				</picker>
			</view>
			
			<view class="fs-28 lh-28 fc-303 mb20">提现发票</view>
			<view class="grid col-1 grid-square flex-sub mb32">
				<view class="bg-img" v-for="(item,index) in form.imgList" :key="index" :data-url="form.imgList[index]">
				 <image :src="item" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="onDelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids withdrawal-solids" @tap="onChooseImage" v-if="form.imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
			<view class="withdrawal-tips mb80">
				<view class="fs-28 lh-40 fc-303 tips-list">提现须知</view>
				<view class="fs-26 lh-36 fc-939 tips-list">1.提现只能整佰提现</view>
				<view class="fs-26 lh-36 fc-939 tips-list">2.提现金额不低于{{info.lowerMoney}}元</view>
				<view class="fs-26 lh-36 fc-939 tips-list">3.提现手续费{{info.userWithdrawFee}}%</view>
			</view>
			<button class="cu-btn bdr-45 bg-pp fc-f lg wp100" @click="onSubmit">提交</button>
		</view>
		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	
	import helangCompress from '@/components/helang-compress/helang-compress';
	export default {
		components: {
			helangCompress
		},
		data() {
			return {
				info:{},
				couponList:{
					total:0,
					rows:[]
				},
				selectCoupon:{},
				form:{
					money: '',
					couponType: '',
					imgList: []
				}
			}
		},
		onLoad(){
			this.onFetchData()
			this.getWithdrawCouponList()
		},
		methods: {
			couponSelect(e){
				var index = e.detail.value
				this.selectCoupon = this.couponList.rows[index]
				this.form.couponType = this.selectCoupon.couponType
			},
			getWithdrawCouponList () {
				uni.$api.getWithdrawCouponList().then(res => {
					this.couponList = res.data
					if (this.couponList.rows.length > 0) {
						var e = {
							detail:{value:0}
						}
						this.couponSelect(e)
					} else {
						this.selectCoupon = {}
						this.form.couponType = ""
					}
				})
			},
			onFetchData(){
				if (uni.$session.getUserBankCardStatus() != 1){
					console.log('uni.$session.getUserBankCardStatus()',uni.$session.getUserBankCardStatus())
					//未绑定银行卡
					uni.redirectTo({
						url: '/pages/login/bankcard?redirectUrl='+encodeURIComponent('/pages/user/assets/withdrawal')
					})
				}
				else {
					uni.$api.getDataByApplyWithDraw().then(({data}) =>{
						this.info.cardBankName = data.cardBankName
						this.info.cardNo = data.cardNo
						this.info.lowerMoney = data.lowerMoney || ''
						this.info.money = data.money || ''
						this.info.userWithdrawFee = data.userWithdrawFee || ''
						this.$forceUpdate()
					})
				}
			},
			onChooseImage(){
				const _self = this;
				uni.chooseImage({
					count:1,
					success:function(res){
						// 单张压缩
						_self.$refs.helangCompress.compress({
						    src: res.tempFilePaths[0],
						    maxSize:800,
						    fileType:'png',
						    quality:0.85
						}).then((compressRes)=>{
						    // 压缩成功回调
							uni.$api.uploadFileOSS(compressRes).then(result =>{
								_self.form.imgList.push(result.path);				
							})
						}).catch((err)=>{
						    // 压缩失败回调
							uni.$toast.showToast('图片压缩失败')
						})
					}
				})
			},
			onDelImg(value){
				let index = value.currentTarget.dataset.index
				this.form.imgList.splice(index,1)
				console.log('this', this.imgList)
			},
			onMoneyInput(e){
				let value = uni.$utils.formatDigit(e.detail.value)
				setTimeout(()=>{
					if (this.info.money < value){
						this.form.money = this.info.money
					}
					else {
						this.form.money = value
					}
				},1)
				
			},
			onSubmit(){
				uni.$api.applyWithdraw({
					money: this.form.money,
					couponType:this.form.couponType,
					certPic: this.form.imgList.join(',')
				}).then(res =>{
					console.log('asdf',res)
					uni.$toast.alert('已申请提现，等待审核中')
					this.form.money = ''
					this.form.imgList = []
					this.onFetchData()
					this.getWithdrawCouponList()
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.action.middle {
	position: absolute;
	left: 0;
	right: 0;
}
.container {
	padding: 32rpx 60rpx;
}
.bank-box {
	padding: 32rpx 6rpx 32rpx 32rpx;
	background-color: #fafafa;
	border-radius: 20rpx;
}
.bank-icon {
	width: 60rpx;
	height: 62rpx;
}
.bank-card-info {
	width: 400rpx;
	font-size: 32rpx;
	color: #303133;
	line-height: 44rpx;
	font-weight: bold;
}
.ml92 {
	margin-left: 92rpx;
}
.mt-24 {
	margin-top: -24rpx;
}
.grid.col-1.grid-square>uni-view.withdrawal-solids {
	height: 312rpx;
	padding: 0;
}
.withdrawal-solids.solids::after {
	height: 624rpx!important;;
}
.withdrawal-tips {
	padding: 24rpx 32rpx;
	border-radius: 20rpx;
	background-color: #fafafa;
}
.tips-list+.tips-list {
	margin-top: 18rpx;
}
.remark-list {
	width: 100%;
	height: 90rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 0 32rpx;
	border: 1px solid #DDDDE6;
}
</style>
