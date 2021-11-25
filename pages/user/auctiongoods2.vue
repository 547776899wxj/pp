<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">拍品管理-已拍出</block>
		</cu-custom>
		<view class="flex-between ac">
			
		</view>
		<view class="container">
			<scroll-view scroll-y="true" style="height: calc(100vh - 186rpx);" @scrolltolower="loadMore">
				<view class="order-list" v-for="item in lotList" :key="item.lotId">
					<view class="flex-between ac mb32">
						<view class="fs-24 lh-34 fc-303">{{item.orderCreateTime}}</view>
						<view class="fs-24 lh-34 fc-ff4" >已拍出</view>
						
						
					</view>
					<view class="goods-info dflex ai-fs mb16">
						<image :src="item.lotImage" class="goods-image mr16" mode=""
							></image>
						<view class="flex-1">
							<view class="flex-between ai-fs mb16" >
								<view class="goods-name">{{item.lotName}}</view>
							</view>
							<view class="fs-24 lh-34 fc-939"></view>
						</view>
					</view>
					<view class="dflex ac jc-end tr">
						<view class="fs-24 lh-34 fc-303">拍入价</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-36 lh-44 fc-303 fw-b">{{item.auctionLotInPrice}}</view>
					</view>
					<view class="dflex ac jc-end tr" >
						<view class="fs-24 lh-34 fc-303">拍出价</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-36 lh-44 fc-303 fw-b">{{item.auctionLotOutPrice}}</view>
					</view>
				</view>
				<listempty :list="lotList"></listempty>
				<nomore :pageCount="pageCount" :pageNumber="queryObj.pageNumber"></nomore>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import listempty from '../component/listempty.vue';
	import nomore from '../component/nomore.vue';
	export default {
		components: {
			listempty,
			nomore
		},
		data() {
			return {
				lotList: [],
				queryObj: {
					lotType: 4
				},
				pageIndex: '',
				pageCount: 0,


			}
		},
		onShow() {
        	this.getAuctionLots()
        },
		onPullDownRefresh() {
				setTimeout(uni.stopPullDownRefresh,500)
			this.getAuctionLots()
		},
		methods: {
			getAuctionLots() {
				this.lotList = []
				this.queryObj.pageNumber = 1
				uni.$api.getAuctionLots(this.queryObj).then(res => {
					this.lotList = res.rows || []
					this.pageIndex = res.pageIndex
					this.pageCount = res.pageCount
				})
			},
			loadMore() {
				if (this.queryObj.pageNumber < this.pageCount) {
					this.queryObj.pageNumber++
					uni.$api.getAuctionLots(this.queryObj).then(res => {
						this.lotList.push(...res.rows)
					})
				}

			},
		}
	}
</script>

<style>
	.cu-bar .action:first-child {
		margin-left: 32rpx;
		font-size: 36rpx;
	}

	.order-nav {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #606266;
		padding: 12rpx 32rpx;
		position: relative;
	}

	.order-nav.cur {
		color: #FF411C;
		font-weight: bold;
	}

	.cur-icon {
		display: none;
		width: 48rpx;
		height: 4rpx;
		background-color: #FF411C;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.order-nav.cur .cur-icon {
		display: block;
	}

	.container {
		padding: 16rpx 20rpx;
	}

	.order-list {
		padding: 16rpx 24rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}

	.order-list+.order-list {
		margin-top: 24rpx;
	}

	.goods-info+.goods-info {
		margin-top: 24rpx;
	}

	.goods-image {
		width: 160rpx;
		height: 160rpx;
	}

	.goods-name {
		width: 100%;
		font-size: 28rpx;
		color: #303133;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.small-radio-btn {
		line-height: 66rpx;
	}
</style>
