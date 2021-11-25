<template>
	<view id="containerId" v-cloak>
		<image src="../../static/img/bg/auction-bg@2x.png" class="auction-index-bg" mode="widthFix"></image>
		<view style="height: 60rpx;"></view>
		<view class="auction-head flex-between ac mb14">
			<image src="../../static/img/icon/auction-icon@2x.png" mode="" class="auction-head-icon"></image>
			<view class="dflex ac" @click="toRules">
				<image src="../../static/img/icon/auction-txt@2x.png" mode="" class="auction-txt-icon mr4"></image>
				<text class="fs-28 lh-28 fc-f">规则说明</text>
			</view>
		</view>
		<view class="container">
			<view class="auction-goods-list" v-for="item in centuryAuctions" :key="item.auctionId"
				 @click="toCenturyAuction(item.auctionId)">
				<image :src="item.auctionImage" mode="widthFix" class="wp100"></image>
				<view class="flex-between ac auction-goods-bg">
					<view class="dflex ai-fs fdc">
						<view class="fs-32 lh-44 fc-303 mb8">{{item.auctionName}}</view>
						<!-- <view class="fs-28 lh-40 fc-939">开场时间 {{item.auctionTimes}}</view> -->
					</view>
					<view class="m-btn m-bg-pp flex-center fc-f">{{item.auctionStatusStr}}</view>
				</view>
			</view>
			<view class="auction-goods-list" v-for="item in auctionList" :key="item.auctionId"
				v-if="item.auctionStatus === 1" @click="toAuction(item.auctionId)">
				<image :src="item.auctionImage" mode="widthFix" class="wp100"></image>
				<view class="flex-between ac auction-goods-bg">
					<view class="dflex ai-fs fdc">
						<view class="fs-32 lh-44 fc-303 mb8">{{item.auctionName}}</view>
						<view class="fs-28 lh-40 fc-939">开场时间 {{item.auctionTimes}}</view>
					</view>
					<view class="m-btn m-bg-pp flex-center fc-f">{{item.auctionStatusStr}}</view>
				</view>
			</view>
			<view class="auction-goods-list" v-for="item in auctionList" :key="item.auctionId"
				v-if="item.auctionStatus === 0" @click="checkPreview(item)">
				<image :src="item.auctionImage" mode="widthFix" class="wp100"></image>
				<view class="flex-between ac auction-goods-bg">
					<view class="dflex ai-fs fdc">
						<view class="fs-32 lh-44 fc-303 mb8">{{item.auctionName}} {{item.canPreview?'（可预览）':'（未开始）'}}</view>
						
						<view class="fs-28 lh-40 fc-939" >开场时间 {{item.auctionTimes}}</view>
					</view>
					<view class="m-btn m-bg-wait flex-center fdc fc-f">
						<view class="fs-32 lh-32">{{item.countDownStr}}</view>
					</view>
				</view>
			</view>
	
			<view class="auction-goods-list" v-for="item in auctionList" :key="item.auctionId"
				v-if="item.auctionStatus === 2">
				<image :src="item.auctionImage" mode="widthFix" class="wp100"></image>
				<view class="flex-between ac auction-goods-bg">
					<view class="dflex ai-fs fdc">
						<view class="fs-32 lh-44 fc-303 mb8">{{item.auctionName}}</view>
						<view class="fs-28 lh-40 fc-939">开场时间 {{item.auctionTimes}}</view>
					</view>
					<view class="m-btn m-bg-pp-unclick flex-center fc-f">{{item.auctionStatusStr}}</view>
				</view>
			</view>
			<listempty :list="auctionList" v-show="centuryAuctions.length===0"/>
			<nomore :pageCount="totalPage" :pageNumber="currentPage"/>
			<!-- tabbar 占位 -->
			<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		</view>
		<!-- <tabbar></tabbar> -->
	</view>
</template>

<script>
	/* import tabbar from '../component/tabbar.vue'; */
	import listempty from '../component/listempty.vue';
	import nomore from '../component/nomore.vue';
	export default {
		components: {
			listempty,
			nomore
		},
		data() {
			return {
				auctionList: [],
				centuryAuctions: [],
				nowTime: '',
				timerId: 0,
				currentPage:1,
				totalPage:1,
			}
		},
		
		mounted: function () {
			  uni.$utils.blankScreenWatchAndRelunch(this,'#containerId','/pages/auction/index')
		},
		onPullDownRefresh() {
			this.getAuctions()
			setTimeout(uni.stopPullDownRefresh,500)
		},
		onShow() {
			uni.$auth.isLoginAndCheckPeopleStatus()
			uni.$utils.setTabBarOrderNum()
			this.getAuctions()
		},
		beforeDestroy() {
			clearInterval(this.timerId)
		},
		methods: {
			getCenturyAuctions(){
				uni.$api.getCenturyAuctions().then(res => {
					this.centuryAuctions = res.rows ||[]
				})
			},
			getAuctions() {
				this.auctionList = []
				uni.$api.getAuctions().then(res => {
					this.nowTime = parseInt(res.nowTime)
					this.auctionList = res.data.map(e=>{
						const beginTime = new Date(e.auctionBeginTime.replace(/\-/g,'/')).getTime()
						e.countDownStr =  uni.$utils.date.countDown(this.nowTime,beginTime)
						return e
					})
					this.totalPage = Math.ceil(this.auctionList.length/10)
					this.currentPage = 1
					this.countDown()
				})
			},
			countDown() {
				const _this = this
				if (this.timerId) {
					clearInterval(this.timerId)
					this.timerId = 0
				}
				this.timerId = setInterval(() => {
					_this.nowTime += 1000
					_this.auctionList.forEach(e => {
						const beginTime = new Date(e.auctionBeginTime.replace(/\-/g,'/')).getTime()
						const endTime = new Date(e.auctionEndTime.replace(/\-/g,'/')).getTime()
						if (endTime <= _this.nowTime) {
							e.auctionStatus = 2
							e.auctionStatusStr = '已经结束'
						}
						if (beginTime <= _this.nowTime && endTime >= _this.nowTime) {
							e.auctionStatus = 1
							e.auctionStatusStr = '进行中'
						}
						e.countDownStr = uni.$utils.date.countDown(_this.nowTime,beginTime)
					})
				}, 1000)
			},
			checkPreview(auction) {
				const nowTime = this.nowTime
				if (auction.canPreview) {
					this.toAuction(auction.auctionId)
				} else {
					const previewtime = new Date(auction.auctionPreviewTime.replace(/\-/g,'/')).getTime()
					if (previewtime < nowTime) {
						this.toAuction(auction.auctionId)
					}
				}
			},
			toAuction(auctionId) {
				uni.navigateTo({
					url: '/pages/auction/specialshow?auctionId=' + auctionId
				})
			},
			toCenturyAuction(auctionId) {
				uni.navigateTo({
					url: '/pages/auction/centuryLots?auctionId=' + auctionId
				})
			},
			toRules() {
				uni.navigateTo({
					url:"/pages/info/servicecenter/servicedetail?helpId=1"
				})
			}
		},
		/* components: {
			tabbar
		} */
	}
</script>

<style>
	.auction-index-bg {
		position: absolute;
		z-index: -1;
		width: 100%;
		top: 0;
		left: 0;
	}

	.auction-head {
		padding: 20rpx 32rpx;
		height: 88rpx;
	}

	.auction-head-icon {
		width: 94rpx;
		height: 36rpx;
		margin-top: 12rpx;
	}

	.auction-txt-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.container {
		padding: 0 32rpx;
	}

	.auction-goods-list {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 32rpx;
	}

	.auction-goods-bg {
		background-color: #fff;
		padding: 24rpx;
	}
</style>
