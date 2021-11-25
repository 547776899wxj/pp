<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">冻结明细</block>
		</cu-custom>
		<view class="container">
			<view class="order-info" v-for="item in list.rows" @click="gotoOrderDetail" :data-order-id="item.orderId">
				<view class="flex-between ac mb20">
					<view class="fs-26 lh-36 fc-303 fw-b">{{item.lockTypeStr}}</view>
					<view class="fs-24 lh-36 fc-ff4">{{item.orderPayStatusStr}}</view>
				</view>
				<view class="goods-info">
					<image :src="item.goodsImage" mode="" class="goods-image"></image>
					<view class="wp100 dflex fdc">
						<view class="dflex fdc jc-fs goods-msg">
							<view class="goods-name mb12">{{item.goodsName}}</view>
						</view>
						<view>
							<text class="fs-22 fc-606">拍入价：</text>
							<text class="fs-24 fc-303 fw-b">￥</text>
							<text class="fs-28 fc-303 fw-b">{{item.lotInPrice}}</text>
						</view>
					</view>
				</view>
				<view class="dflex jc-end ai-fe mt30">
					<view class="fs-20 lh-28 fc-303">冻结金额：</view>
					<view class="fs-24 fc-e31 fw-b">￥</view>
					<view class="fs-32 lh-32 fc-e31 fw-b">{{item.lockMoney}}</view>
					<!-- <view class="fs-20 fc-e31">60</view> -->
				</view>
			</view>
			
			<listempty :list="list.rows"  :loading="list.loading"></listempty>
			<nomore :pageCount="list.pageCount" :pageNumber="queryParam.pageNumber"></nomore>
		</view>
	</view>
</template>

<script>
	
		import listempty from '@/pages/component/listempty.vue';
		import nomore from '@/pages/component/nomore.vue';
	export default {
		components: {
			listempty,
			nomore
		},
		data() {
			return {
				queryParam:{
					pageNumber: 1,
				},
				list:{
					loading: false,
					pageCount:0,
					rows:[]
				}
			}
		},
		onLoad(){
			this.onFetchData()
		},
		onReachBottom(e){
			console.log('onReachBottom',e)
			if(this.queryParam.pageNumber<=this.list.pageCount){
				this.onFetchData()
			}
		},
		methods: {
			onFetchData(){
				if (this.list.loading) return;
				this.list.loading = true
				uni.$api.getFrozenList(this.queryParam).then(res =>{
					console.log('res',res)
					this.list.loading = false
					if (res.callBackExtData == this.queryParam.callBackExtData){
						this.list.rows = this.list.rows.concat(res.rows)
						this.list.pageCount = res.pageCount
						this.queryParam.pageNumber ++ 
					}
				}).catch(()=>{
					this.list.loading = false
				})
			},
			gotoOrderDetail(e){
				let orderId = e.currentTarget.dataset.orderId || ''
				uni.navigateTo({
					url: '/pages/order/detail?orderId='+orderId
				})
			}
		}
	}
</script>

<style>
.container {
	padding: 8rpx 20rpx;
}
.order-info {
	padding: 20rpx;
	background: #fff;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
}
.goods-info {
	display: flex;
	align-items: flex-start;
}
.goods-image {
	width: 180rpx;
	height: 180rpx;
	border-radius: 12rpx;
	flex-shrink: 0;
	margin-right: 20rpx;
}
.goods-msg {
	height: 146rpx;
}
.goods-name {
	font-size: 26rpx;
	color: #303133;
	text-align: left;
	line-height: 40rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;    
	-webkit-line-clamp: 2;    
	overflow: hidden;
}
.discount-icon {
	width: 32rpx;
	height: 32rpx;
	background: #FF411C;
	border-radius: 8rpx;
	font-size: 22rpx;
	color: #fff;
}
</style>
