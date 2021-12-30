<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" backMethod="toMyOrder2">
			<block slot="backText"></block>
			<block slot="content">支付成功</block>
		</cu-custom>
		<view class="container">
			<view class="flex-center fdc mb170">
				<image :src="domainStatic+'/img/images/pay-success.png'" mode="widthFix" class="pay-success mb50"></image>
				<view class="fs-64 lh-64 fc-3 fw-b dflex ai-fe">
					<view class="fs-50 lh-50 mb4">￥</view>{{ order.orderPayMoney| intFormat}}{{ order.orderPayMoney| decimalFormat}}
				</view>
			</view>
			<view class="detail-btn flex-center" @click="goToOrderDetail">查看订单</view>
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				orderId:'',
				order:{},
				domainStatic:this.domainStatic,
			}
		},
		onLoad(e) {
			var orderId = e.orderId 
			this.orderId = orderId
			this.initPage()
			uni.$once('toMyOrder2',this.toMyOrder)
		},
		methods: {
			toMyOrder(){
				uni.navigateBack({
					delta:3
				})
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
			goToOrderDetail(){
				uni.navigateTo({
					url:'/pages/order/detail?from=pay&orderId='+this.orderId
				})
			},
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
.mb170 {
	margin-bottom: 170rpx;
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
	width: 200rpx;
	height: 70rpx;
	border: 2rpx solid #666;
	border-radius: 35rpx;
	font-size: 28rpx;
	line-height: 28rpx;
	color: #333;
	margin: 0 auto;
}
</style>
