<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">订单详情</block>
		</cu-custom>
		<view class="substitution mb18">
			<view class="fs-32 lh-32 fc-3 fw-b mb28">置换物品</view>
			<view class="dflex ai-fs wp100">
				<image :src="orderData.lotImage" mode="" class="substitution-pic"></image>
				<view class="substitution-info">
					<view class="auction-name fs-30 lh-30 fc-3 fw-b mb18">{{orderData.lotName}}</view>
					<view class="fs-24 lh-24 fc-9 mb40">拍品编号：{{orderData.lotId}}</view>
					<view class="wp100 dflex ai-fe jc-end">
						<view class="fs-26 lh-26 fc-3">拍入价:</view>
						<view class="fs-38 lh-30 fc-fb2 fw-b">{{orderData.orderMoney}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="substitution mb18">
			<view class="fs-32 lh-32 fc-3 fw-b mb28">换回物品</view>
			<view class="dflex ai-fs wp100 change-list" v-for="item in  orderData.details">
				<image :src="item.orderGoodsImage" mode="" class="substitution-pic"></image>
				<view class="substitution-info">
					<view class="auction-name fs-30 lh-30 fc-3 fw-b mb18">{{item.orderGoodsTitle}}</view>
					<view class="fs-24 lh-24 fc-9 mb40">拍品编号：{{item.orderLotId}}</view>
					<view class="wp100 dflex ai-fe jc-end">
						<view class="fs-26 lh-26 fc-3">拍入价:</view>
						<view class="fs-38 lh-30 fc-fb2 fw-b">{{item.orderDetailPrice |formatDigitFloor}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="substitution mb18">
			<view class="fs-32 lh-32 fc-3 fw-b mb38">订单信息</view>
			<view class="order-info-list">
				<view class="fs-28 lh-28 fc-9">订单编号</view>
				<view class="fs-28 lh-28 fc-3">{{orderData.orderId}}</view>
			</view>
			<view class="order-info-list">
				<view class="fs-28 lh-28 fc-9">置换时间</view>
				<view class="fs-28 lh-28 fc-3">{{orderData.orderCreateTime}}</view>
			</view><view class="order-info-list" v-if="orderData.lotExchangeDecreaseRatio===null">
				<view class="fs-28 lh-28 fc-9" >抵扣券

</view>
				<view class="fs-28 lh-28 fc-3">置换券一张</view>
			</view>
			<view class="order-info-list" v-if="orderData.lotExchangeDecreaseRatio>0">
				<view class="fs-28 lh-28 fc-9">置换差价</view>
				<view class="fs-28 lh-28 fc-3">{{orderData.lotExchangeDecreaseRatioStr}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				orderData:{
					details:[]
				}
			}
		},
		onLoad({orderId='821072661176001'}) {
			this.orderId =  orderId
			this.getExchangeOrderDetail()
		},
		methods: {
			getExchangeOrderDetail(){
				uni.$api.getExchangeOrderDetail({orderId:this.orderId}).then(res=>{
					this.orderData = res.data||{details:[]}
				})
			}
		}
	}
</script>

<style>
.substitution {
	padding: 32rpx 30rpx;
	background-color: #fff;
	margin-top: 18rpx;
}
.substitution-pic {
	width: 140rpx;
	height: 140rpx;
	border-radius: 10rpx;
	margin-right: 22rpx;
}
.substitution-info {
	width: calc(100% - 162rpx);
}
.auction-name {
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.change-list + .change-list {
	margin-top: 38rpx;
}
.order-info-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.order-info-list + .order-info-list {
	margin-top: 38rpx;
}
</style>
