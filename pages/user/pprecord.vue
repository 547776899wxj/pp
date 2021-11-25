<template>
	<view>
			<cu-custom bgColor="bg-f6" :isBack="true">
				<block slot="backText"></block>
				<block slot="content">拍品拍卖记录</block>
			</cu-custom>
			<view class="screen-time flex-between ac">
				<view class="dflex ac fc-939">
					<picker mode="date" :value="queryObj.auctionDateMin" @change="dateChangeMin">
						<view class="picker">
							{{queryObj.auctionDateMin?queryObj.auctionDateMin:'开始时间'}} 
						</view>
					</picker>
					<view class="fs-26 lh-26 ml10 mr10">至</view>
					<picker mode="date" :value="queryObj.auctionDateMax" @change="dateChangeMax">
						<view class="picker">
							{{queryObj.auctionDateMax?queryObj.auctionDateMax:'结束时间'}}
						</view>
					</picker>
					<text class="cuIcon-triangledownfill text-gray mb4"></text>
				</view>
			</view>
			<view class="flex-between ac bc-f">
				<view class="order-nav" :class="queryObj.auctionLotHangupStatus==''?'cur':''" @click="queryObj.auctionLotHangupStatus='',getAuctionLots()">全部 <view class="cur-icon"></view></view>
				<view class="order-nav" :class="queryObj.auctionLotHangupStatus==2?'cur':''" @click="queryObj.auctionLotHangupStatus=2,getAuctionLots()">拍卖中 <view class="cur-icon"></view></view>
				<view class="order-nav" :class="queryObj.auctionLotHangupStatus==4?'cur':''" @click="queryObj.auctionLotHangupStatus=4,getAuctionLots()">已拍出 <view class="cur-icon"></view></view>
				<view class="order-nav" :class="queryObj.auctionLotHangupStatus==3?'cur':''" @click="queryObj.auctionLotHangupStatus=3,getAuctionLots()">已流拍 <view class="cur-icon"></view></view>
			</view>
			<view class="container">
				<scroll-view scroll-y="true" :style="'height: calc(100vh - 172rpx - ' + CustomBar +'px)'" @scrolltolower="loadMore">
					<view class="order-list" v-for="item in auctionLotList">
						<view class="flex-between ac mb32">
							<view class="fs-24 lh-34 fc-303">{{item.auctionDate}}</view>
							<view class="fs-24 lh-34 fc-ff4">{{item.dictName}}</view>
						</view>
						<view class="goods-info dflex ai-fs mb16">
							<image :src="item.lotImage" class="goods-image mr16" mode=""></image>
							<view class="flex-1">
								<view class="flex-between ai-fs mb16">
									<view class="goods-name">{{item.lotName}}</view>
								</view>
								<view class="fs-24 lh-34 fc-939 mb16">{{item.auctionLotId}}</view>
								<view class="dflex ac tr">
									<view class="fs-24 lh-24 fc-939">拍入价：</view>
									<text class="fs-24 lh-24 fc-939">￥</text>
									<view class="fs-24 lh-24 fc-939">{{item.auctionLotInPrice}}</view>
								</view>
							</view>
						</view>
						<view class="dflex ac jc-end tr">
							<view class="fs-24 lh-34 fc-303">挂拍价</view>
							<text class="fs-24 fc-303">￥</text>
							<view class="fs-36 lh-44 fc-303 fw-b">{{item.auctionLotOutPrice}}</view>
						</view>
					</view>
					<!-- 保留底部空白部分 -->
					<view style="width: 100%;height: 36rpx;"></view>
					<listempty :list="auctionLotList"></listempty>
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
				queryObj:{
					auctionLotHangupStatus:'',
					pageNumber:1,
					auctionDateMin:'',
					auctionDateMax:''
				},
				pageIndex: '',
				pageCount: 0,
				auctionLotList:[]
			}
		},
		onLoad({auctionLotHangupStatus=''}) {
			this.queryObj.auctionLotHangupStatus = parseInt(auctionLotHangupStatus)||''
		},
        onShow() {
        	this.getAuctionLots();
        },
		methods: {
			getAuctionLots() {
				this.auctionLotList = []
				this.queryObj.pageNumber = 1
				uni.$api.getAuctionLotList(this.queryObj).then(res => {
					this.auctionLotList = res.rows || []
					this.pageIndex = res.pageIndex
					this.pageCount = res.pageCount
				})
			},
			loadMore() {
				if (this.queryObj.pageNumber < this.pageCount) {
					this.queryObj.pageNumber++
					uni.$api.getAuctionLotList(this.queryObj).then(res => {
						this.auctionLotList.push(...res.rows)
					})
				}
			
			},
			getToday(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				return year + '-' + month + '-' + day;
			},
			dateChangeMin(e) {
				this.queryObj.auctionDateMin = e.detail.value
				this.getAuctionLots()
			},
			dateChangeMax(e) {
				this.queryObj.auctionDateMax = e.detail.value
				this.getAuctionLots()
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
.screen-time {
	height: 76rpx;
	background-color: #fff;
	padding: 0 20rpx;
}
</style>
