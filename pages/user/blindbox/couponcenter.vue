<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true">
			<block slot="content">卡券中心</block>
		</cu-custom>
		<view class="f6-line"></view>
		<view class="container">
			<view class="flex-between ac mb30">
				<view class="fs-32 lh-32 fc-3 fw-b">我的券</view>
				<view class="fs-28 lh-28 fc-9" @click="toHistory()">使用记录</view>
			</view>
			<view class="coupon-box mb60" >
				<view class="counpon-list" v-for="(coupon,index) in couponList" :key="index" @click.stop="couponClick(coupon.couponType)">
					<view class="coupon-number">{{index+1}}</view>
					<view class="coupon-info">
						<view class="fs-38 lh-38 fc-a13 fw-b mt2 mb18">{{coupon.couponTypeName}}</view>
						<view class="fs-30 lh-30 fc-d65">数量：{{coupon.couponNum}}</view>
					</view>
					<view class="coupon-name">{{coupon.couponUseWayName}}</view>
					<image src="../../../static/img/bg/blind-coupon.png" mode="widthFix" class="coupon-bg"></image>
				</view>
			</view>
			<view class="blind-box" @click.stop="toBlindBox" v-if="onSaleGameBoxCount > 0">
				<image class="wp100" src="../../../static/img/images/blind-banner.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				onSaleGameBoxCount:0,
				couponList:[
					
				]
			}
		},
		onShow() {
			this.initData()
			
			uni.$api.getOnSaleGameBoxCount().then(res =>{
				this.onSaleGameBoxCount = res.count || 0
			})
		},
		methods: {
			initData(){
				uni.$api.getCouponCenterList().then(res =>{
					console.log("接口返参:"+JSON.stringify(res))
					this.couponList = res.data || []
				})
			},
			couponClick(couponType) {
				switch (couponType){
					case 99:
						this.toVipPage();
						return;
				}
			},
			toVipPage () {
				var url = "/pages/user/vipcoupon";
				uni.navigateTo({
					url:url
				})
			},
			toBlindBox () {
				uni.navigateTo({
					url:"/pages/user/blindbox"
				})
			},
			toHistory () {
				uni.navigateTo({
					url:"/pages/user/assets/couponrecord"
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.f6-line {
	width: 100%;
	height: 20rpx;
	background-color: #f6f6f6;
}
.container {
	padding: 32rpx 30rpx;
}
.counpon-list {
	position: relative;
	width: 100%;
	height: 160rpx;
	display: flex;
	z-index: 1;
	margin-bottom: 20rpx;
}
.coupon-number {
	width: 80rpx;
	color: #D65D2B;
	font-size: 40rpx;
	line-height: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.coupon-info {
	padding-left: 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.coupon-name {
	width: 180rpx;
	color: #D65D2B;
	font-size: 34rpx;
	line-height: 30rpx;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
}
.coupon-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
}
.fc-d65 {
	color: #D65D2B;
}
.fc-a13 {
	color: #a13001;
}
</style>
