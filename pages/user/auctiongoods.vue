<template>
	<view>
		<cu-custom bgColor="bg-f6"  backMethod="backHandle" @back-handle="backHandle">
			<block slot="backText"></block>
			<block slot="content">我的拍品</block>
		</cu-custom>
		<!-- <view style="height: 60rpx;"></view>
		<view class="cu-bar">
			<view class="action title-style-3">
				<text class="text-xl text-bold">我的拍品</text>
			</view>
		</view> -->
		<view class="flex-between ac">
			<view class="order-nav" @click="orderNavClick(0)" :class="{
					cur:queryObj.lotType===0
				}">全部 <view class="cur-icon"></view>
			</view>
			<view class="order-nav" @click="orderNavClick(2)" :class="{
					cur:queryObj.lotType===2
				}">已上架 <view class="cur-icon"></view>
			</view>
			<view class="order-nav" @click="orderNavClick(1)" :class="{
					cur:queryObj.lotType===1
				}">未上架 <view class="cur-icon"></view>
			</view>
			<view class="order-nav" @click="orderNavClick(4)" :class="{
					cur:queryObj.lotType===4
				}">已售出 <view class="cur-icon"></view>
			</view>
		<!-- 	<view class="order-nav" @click="queryObj.lotType=3,getAuctionLots()" :class="{
					cur:queryObj.lotType===3
				}">留下自用 <view class="cur-icon"></view>
			</view> -->
			
			<!-- <view class="order-nav" @click="queryObj.lotType=4,getAuctionLots()" :class="{
					cur:queryObj.lotType===4
				}">已拍出 <view class="cur-icon"></view>
			</view> -->
		</view>
		<view class="container">
			<scroll-view scroll-y="true" :style="'height: calc(100vh - 80rpx - ' + CustomBar +'px)'" @scrolltolower="loadMore">
				<view class="order-list" v-for="item in lotList" :key="item.lotId">
					<view class="flex-between ac mb32">
						<view class="fs-24 lh-34 fc-303">{{item.lotInTime}}</view>
						
						
						<view class="fs-24 lh-34 fc-ff4"
						>
							 {{item.lotHangupStatusStr}}</view>
						<!-- <view class="fs-24 lh-34 fc-ff4" v-if="item.lotStatus===2">拍卖中</view>
						<view class="fs-24 lh-34 fc-ff4"
							v-if="item.lotStatus===3">
							留下自用</view> -->
					</view>
					<view class="goods-info dflex ai-fs mb16" @tap="toLotDetail(item.lotId)">
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
						<view class="fs-36 lh-44 fc-303 fw-b">{{item.lotInPrice}}</view>
					</view>
					<!-- <view class="dflex ac jc-end tr" v-if="item.lotHangupStatus===4">
						<view class="fs-24 lh-34 fc-303">拍出价</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-36 lh-44 fc-303 fw-b">{{item.lotOutPrice}}</view>
					</view> -->
					<!-- <view class="dflex ac jc-end mt24">
						<view class="small-radio-btn line-btn flex-center"
							v-if="item.lotStatus===1 && (item.lotHangupStatus!==1 && item.lotHangupStatus!==2&& item.lotHangupStatus!==3)"
							@tap="toPubLot(item.lotId)">转拍</view>
						<view class="small-radio-btn line-btn flex-center"
							v-if="item.canPut"
							@tap="toPubLot(item.lotId)">转拍</view>
						<view class="small-radio-btn pp-line-btn flex-center" @tap="toAddress(item.lotOrderId)"
							v-if="(item.lotStatus===1|| (item.lotHangupStatus===3 && item.lotStatus !==3))&& (item.lotHangupStatus!==1 && item.lotHangupStatus!==2)">留下自用</view>
						<view class="small-radio-btn line-btn flex-center" @tap="toLogistics(item.lotOrderId)"
							v-if="item.lotSecondStatus===1">查看物流</view>
							<view class="small-radio-btn pp-line-btn flex-center" @tap="confirmPackage(item.lotOrderId)"
								v-if="item.lotSecondStatus===1">确认收货</view>
					</view> -->
				</view>
				<!-- 保留底部空白部分 -->
				<view style="width: 100%;height: 36rpx;"></view>
				<listempty :list="lotList" v-show="!isShowLoding"></listempty>
				<!-- <nomore :pageCount="limit" :pageNumber="lotList.length"></nomore> -->
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
					lotType: 0
				},
				pageIndex: '',
				pageCount: 0,
				CustomBar: this.CustomBar,
				limit:10,
				offset:0,
				isReachBottom:false,
				isShowLoding:true,
				StatusBar:this.StatusBar,
			}
		},
		watch:{
			'queryObj.lotType'(newShow){
				this.lotList = [];
			}
		},
		computed: {
			style() {
				var CustomBar= this.CustomBar;
				var StatusBar= this.StatusBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
		},
		onLoad({lotType='',from=''}) {
			this.queryObj.lotType = parseInt(lotType)||0
			this.from = from
			uni.$once('backHandle',this.backHandle);
			this.getAuctionLots()
		},
      
		onPullDownRefresh() {
			setTimeout(uni.stopPullDownRefresh,500)
			this.lotList = [];
			this.getAuctionLots()
		},
		methods: {
			orderNavClick(e){
				if(e===this.queryObj.lotType){
					return
				}
				this.queryObj.lotType = e;
				this.getAuctionLots();
			},
			backHandle(){
				if(this.from){
					uni.switchTab({
						url:'/pages/user/index'
					})
				}else{
					uni.navigateBack()
				}
			},
			toLogistics(orderId) {
				uni.navigateTo({
					url: '/pages/order/logistics?orderId=' + orderId
				})
			},
			confirmPackage(orderId) {
				uni.$toast.confirm('确认收货吗').then(()=>{
					uni.$api.confirmPackage({
						orderId:orderId
					}).then(res => {
						if (res.success) {
							uni.$toast.showToast("收货成功")
							this.getAuctionLots()
						}
					})
				})
			},
			toAddress(orderId) {
				uni.navigateTo({
					url: '/pages/order/logisticspay?orderId=' + orderId
				})
			},
			toLotDetail(lotId) {
				uni.navigateTo({
					url: '/pages/user/auctiongoods/detail?lotId=' + lotId
				})
			},
			toPubLot(lotId) {
				uni.navigateTo({
					url: '/pages/order/addauction?lotId=' + lotId
				})
			},
			getAuctionLots() {
				// this.lotList = []
				// this.queryObj.pageNumber = 1
				// uni.$api.getAuctionLots(this.queryObj).then(res => {
				// 	this.lotList = res.rows || []
				// 	this.pageIndex = res.pageIndex
				// 	this.pageCount = res.pageCount
				// })
				this.isShowLoding = true;
				uni.showLoading({
					title:'加载中'
				})
				uni.$api.getLotsByUser({
					offset: this.offset,
					limit: this.limit,
					lotHangupStatus: this.queryObj.lotType
				}).then(res =>{
					this.lotList = this.lotList.concat(res.data);
					this.isShowLoding = false;
					uni.hideLoading();
					if(res.data.length < this.limit){
						this.isReachBottom = false;
					}
				})
			},
			loadMore() {
				// if (this.queryObj.pageNumber < this.pageCount) {
				// 	this.queryObj.pageNumber++
				// 	uni.$api.getAuctionLots(this.queryObj).then(res => {
				// 		// this.lotList.push(...res.rows)
				// 		this.lotList = this.lotList.concat(res.rows);
				// 	})
				// }
				if(this.isReachBottom){
					this.offset += this.limit;
					this.getAuctionLots() 
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
		padding: 16rpx 20rpx 0;
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
