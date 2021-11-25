<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true">
			<block slot="content">盲盒详情</block>
		</cu-custom>
		<view class="container">
			<image src="../../static/img/images/blindbox.png" mode="widthFix" class="blind-pic"></image>
			<view class="blind-info dflex fdc jc-fs mb25">
				<view class="fs-38 lh-36 fc-3 fw-b mb40">{{info.goodsTitle}}</view>
				<view class="fs-50 lh-38 fc-fb2 fw-b dflex ai-fe mb20"><view class="fs-36 fw-4">¥</view>{{info.gameBoxPrice}}</view>
				<view class="fs-24 lh-24 fc-9 dflex ai-fe">库存：{{info.gameBoxStock}}</view>
			</view>
			<view class="blind-data bg-white">
				<view class="fs-32 lh-32 fc-3 fw-b mb30">可开出商品</view>
				<view class="blind-data-table">
					<view class="table-title dflex ac">
						<view class="wp50 flex-center fs-30 lh-30 fc-3 fw-b">券类型</view>
						<view class="wp50 flex-center fs-30 lh-30 fc-3 fw-b">数量</view>
					</view>
					<view class="table-info-list" v-for="item in info.gameBoxCouponList">
						<view class="wp50 flex-center fs-30 lh-30 fc-3">{{item.gameBoxCouponTypeStr}}</view>
						<view class="wp50 flex-center fs-30 lh-30 fc-3">{{item.gameBoxCouponNumber}}</view>
					</view>
				</view>
			</view>
			<view class="ios-bottom"></view>
		</view>
		<view class="cu-bar bg-white tabbar border submit-box">
			<view class="action">
			</view>
			<button class="cu-btn bg-pp fc-f round" @click="gotoBuy">立即购买</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		onShow() {
			this.fetchData()
		},
		methods: {
			fetchData(){
				uni.$api.getOnSaleTopOne().then(res =>{
					this.info = res.data || {}
					if (!this.info.gameBoxId){
						uni.$toast.alert('盲盒活动已结束').then(()=>{
							uni.switchTab({
								url:'/pages/index/main'
							})
						})
					}
				})
			},
			gotoBuy(){
				uni.navigateTo({
					url:'/pages/order/blindboxorder?gameBoxId='+this.info.gameBoxId
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #f6f6f6;
}
.ios-bottom {
	min-height: 100rpx;
	padding-bottom: env(safe-area-inset-bottom);
}
.blind-pic {
	width: 100%;
}
.blind-info {
	background-color: #fff;
	padding: 35rpx 30rpx 40rpx;
}
.blind-data {
	padding: 30rpx;
}
.blind-data-table {
	position: relative;
}
.blind-data-table::after {
	content: '';
	width: 2rpx;
	height: 100%;
	background-color: #fff;
	position: absolute;
	left: 50%;
	right: 50%;
	top: 0;
	bottom: 0;
}
.table-title {
	height: 80rpx;
	background-color: #e3edfe;
}
.table-info-list {
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #fff;
}
.table-info-list > view {
	height: 80rpx;
	background-color: #EEF4FE;
}
.table-info-list:last-child {
	border-bottom: 0;
}
.cu-bar.tabbar.submit-box {
	padding:  0 32rpx;
	position: fixed;
	bottom: 0;
	width: 100%;
	min-height: 100rpx;
	padding-bottom: env(safe-area-inset-bottom);
}
.submit-box .cu-btn {
	width: 240rpx;
	height: 76rpx;
	margin: 0;
}
</style>
