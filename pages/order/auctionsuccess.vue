<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="toMyOrder">
			<block slot="backText"></block>
			<block slot="content">支付成功</block>
		</cu-custom>
		<view class="container">
			<view class="flex-center fdc mb120">
				<image src="../../static/img/images/pay-success.png" mode="widthFix" class="pay-success mb50"></image>
				<view class="fs-64 lh-64 fc-3 fw-b dflex ai-fe">
					<view class="fs-50 lh-50 mb4">￥</view>{{ order.orderPayMoney| intFormat}}{{ order.orderPayMoney| decimalFormat}}
				</view>
			</view>
			<view class="dflex ai-fs jc-c mb70">
				<image src="../../static/img/icon/warning.png" mode="widthFix" class="warning fs-0 mr6 mt10"></image>
				<view class="fs-30 lh-50 fc-d52 tc wm540">请进入我的拍品进行转拍或留下，如果{{days}}天之内不进行转拍，默认视为留下自用</view>
			</view>
			<view class="detail-btn flex-center" @click="goToAuctionGoods">进入我的拍品</view>
			<view class="blind-box mt116" v-if="onSaleGameBoxCount > 0">
				<image class="wp100" src="../../static/img/images/blind-banner.png" mode="widthFix" @click="gotoGameBoxDetail"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onSaleGameBoxCount:0,
				orderId:'',
				days:'',
				order:{}
			}
		},
		onShow() {
			
			uni.$api.getOnSaleGameBoxCount().then(res =>{
				this.onSaleGameBoxCount = res.count || 0
			})
		},
		onLoad(e) {
			var orderId = e.orderId
			this.orderId = orderId
			this.initPage()
			this.getAutoStayLotConfig()
			uni.$once('toMyOrder',this.toMyOrder)
		},
		methods: {
			toMyOrder(){
				uni.navigateBack({
					delta:2
				})
			},
			getAutoStayLotConfig(){
				uni.$api.getAutoStayLotConfig().then(res => this.days = res.data)
			},
			initPage () {
				var params = {
					orderId:this.orderId
				}
				uni.$api.getOrderDetail(params).then(res => {
					var {discounts,order,orderMessage,orderAddress,outPayTime,userBalanceLock} = res.data
					this.order = order
				})
			},
			goToAuctionGoods(){
				uni.navigateTo({
					url:'/pages/user/auctiongoods?from=paysuccess'
				})
			},
			gotoGameBoxDetail(){
				uni.navigateTo({
					url:'/pages/user/blindbox'
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
	padding-top: 123rpx;
}
.pay-success {
	width: 200rpx;
}
.fs-50 {
	font-size: 50rpx;
}
.mt116 {
	margin-top: 116rpx;
}
.warning {
	width: 30rpx;
	height: 30rpx;
}
.wm540 {
	max-width: 540rpx;
}
.mb70 {
	margin-bottom: 70rpx;
}
.detail-btn {
	width: 260rpx;
	height: 70rpx;
	border: 2rpx solid #666;
	border-radius: 35rpx;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #333;
	margin: 0 auto;
}
.blind-box {
	padding: 32rpx 30rpx;
}
</style>
