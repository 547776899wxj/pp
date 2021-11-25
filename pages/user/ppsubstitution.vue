<template>
	<view>
		<cu-custom bgColor="bg-f6" isBack >
			<block slot="backText"></block>
			<block slot="content">拍品置换管理</block>
		</cu-custom>
		<view class="wp100 flex-between ac substitution-box mb16">
			<view>可置换{{lotCount}}个</view>
			<view class="substitution-btn" @tap="toSubstitution()">置换</view>
		</view>
		<view class="flex-between ac">
			<view class="order-nav" @click="queryObj.status='',getLotExchangeApplyList()" :class="{
					cur:queryObj.status===''
				}">全部 <view class="cur-icon"></view>
			</view>
			<view class="order-nav" @click="queryObj.status=0,getLotExchangeApplyList()" :class="{
					cur:queryObj.status===0
				}">置换中 <view class="cur-icon"></view>
			</view>
			<view class="order-nav" @click="queryObj.status=1,getLotExchangeApplyList()" :class="{
					cur:queryObj.status===1
				}">已置换 <view class="cur-icon"></view>
			</view>
			
			<view class="order-nav" @click="queryObj.status=-1,getLotExchangeApplyList()" :class="{
					cur:queryObj.status===-1
				}">拒绝置换 <view class="cur-icon"></view>
			</view>
		</view>
		<view class="container">
			<scroll-view scroll-y="true" :style="'height: calc(100vh - 160rpx - ' + CustomBar +'px)'" @scrolltolower="loadMore">
				<view class="order-list" v-for="item in lotList" :key="item.lotExchangeApplyLotId">
					<view class="flex-between ac mb32">
						<view class="fs-24 lh-34 fc-303">申请时间：{{item.lotExchangeApplyApplyTime}}</view>
						
						
						<view class="fs-24 lh-34 fc-ff4">
							{{item.lotExchangeApplyHandleStatusStr}}
						</view>
					</view>
					<view class="goods-info dflex ai-fs mb16">
						<image :src="item.lotImage" class="goods-image mr16" mode=""></image>
						<view class="flex-1">
							<view class="flex-between ai-fs mb16">
								<view class="goods-name">{{item.lotName}}</view>
							</view>
							<view class="fs-24 lh-34 fc-939 mb16">拍品编号 {{item.lotExchangeApplyLotId}}</view>
							<view class="fs-24 lh-34 fc-939" v-if="item.lotExchangeApplyHandleStatus===1">换回数量 {{item.lotCount}}</view>
						</view>
					</view>
					<view class="dflex ac jc-end tr">
						<view class="fs-24 lh-34 fc-303">拍入价</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-36 lh-44 fc-303 fw-b">{{item.lotInPrice}}</view>
					</view>
					<view class="dflex ac jc-end mt24" v-if="item.lotExchangeApplyHandleStatus===1">
						<view class="small-radio-btn line-btn flex-center" @click="toOrderDetail(item.lotExchangeApplyOrderId)">查看订单详情</view>
					</view>
				</view>
				<!-- 保留底部空白部分 -->
				<view style="width: 100%;height: 36rpx;"></view>
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
					status: ''
				},
				pageIndex: '',
				pageCount: 0,
				lotCount: 0,
				CustomBar: this.CustomBar,


			}
		},
		computed: {
			style() {
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
		},
		onLoad({status=''}) {
			this.queryObj.status = parseInt(status)||''
			if(status==='0'){
				this.queryObj.status =0
			}
		},
        onShow() {
        	this.getLotExchangeApplyList()
        	this.getExchangeApplyStatistics()
        },
		onPullDownRefresh() {
			setTimeout(uni.stopPullDownRefresh,500)
			this.getLotExchangeApplyList()
		},
		methods: {
			getExchangeApplyStatistics(){
				uni.$api.getExchangeApplyStatistics().then(res=>{
					this.lotCount = res.data.lotCount || 0
				})
			},
			/**
			 * 前往订单详情
			 * @param {Object} orderId
			 */
			toOrderDetail (orderId) {
				uni.navigateTo({
					url:"/pages/order/blindboxorder/detail?orderId="+orderId
				})
			},
			confirmPackage(orderId) {
				uni.$toast.confirm('确认收货吗').then(()=>{
					uni.$api.confirmPackage({
						orderId:orderId
					}).then(res => {
						if (res.success) {
							uni.$toast.showToast("收货成功")
							this.getLotExchangeApplyList()
						}
					})
				})
			},
	
			toSubstitution() {
				uni.navigateTo({
					url: '/pages/user/substitution/substitution'
				})
			},
		
			getLotExchangeApplyList() {
				this.lotList = []
				this.queryObj.pageNumber = 1
				uni.$api.getLotExchangeApplyList(this.queryObj).then(res => {
					this.lotList = res.rows || []
					this.pageIndex = res.pageIndex
					this.pageCount = res.pageCount
				})
			},
			loadMore() {
				if (this.queryObj.pageNumber < this.pageCount) {
					this.queryObj.pageNumber++
					uni.$api.getLotExchangeApplyList(this.queryObj).then(res => {
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
	.substitution-box {
		padding: 0 20rpx;
	}
	.substitution-btn {
		width: 160rpx;
		height: 64rpx;
		border: 2rpx solid #DDDDE6;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
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
		width: 200rpx;
	}
</style>
