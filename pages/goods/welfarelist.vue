<template>
	<view  id="containerId">
		<!-- <image src="/static/img/bg/goods-bg@2x.png" class="goods-index-bg" mode="widthFix"></image> -->
		<!-- 搜索框 -->
			<cu-custom bgColor="bg-f6" class="solid-bottom" :isBack="true"><block slot="content">一键转拍商品列表</block></cu-custom>
		<!-- 分类 -->
	
		<!-- 商品列表 -->
		<view class="goods-box" style="height: calc(100vh - 234rpx);">
			<view class="goods-container">
				<scroll-view scroll-y="true" class="hp100" @scrolltolower="getAllGoods">
					<!-- 循环列表 -->
					<view class="goods-list" @click.stop="goToGoodsDetail(item.goodsId)"
						v-for="(item,index) in goodsList" :key="item.goodsId" v-if="goodsList.length > 0">
						<image :src="item.goodsImage" class="goods-image" mode=""></image>
						<view class="flex-between fdc wp100 goods-info">
							<view class="">
								<view class="goods-name mb8">{{item.goodsTitle}}</view>
								<view class="goods-label" v-if="item.goodsBrandName">{{item.goodsBrandName}}</view>
							</view>
							<view class="flex-between ai-fe">
								<view class="dflex ac">
									<view class="fs-36 lh-36 fc-e31 fw-b"><text
											class="fs-24">￥</text>{{item.goodsPrice}}
									</view>
									<view class="fs-22 lh-22 fc-939 td-lt" v-if="item.goodsOriginalPrice">
										￥{{item.goodsOriginalPrice}}</view>
								</view>
								<view class="small-btn bg-pp fc-f lh-60 tc" @click.stop="goToTransfer(item)">
									一键转拍</view>
							</view>
						</view>
					</view>
					<listempty :list="goodsList" :loading="goodsListLoading"></listempty>
					<nomore :pageCount="queryObj.pageCount" :pageNumber="queryObj.pageNumber"></nomore>
					<!-- tabbar 占位 -->
					<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
				</scroll-view>
			</view>
		</view>
		<!-- <tabbar></tabbar> -->
	</view>
</template>

<script>
	import listempty from 'pages/component/listempty.vue';
	import nomore from 'pages/component/nomore.vue';

	export default {
		data() {
			return {
				option: {

				},
				queryObj: {
					goodsTitle: "",
					goodsCategoryId: "",
					pageNumber: 0,
					pageSize: 10,
					pageCount: 99
				},
				goodsListLoading: false,
				category: [],
				goodsList: []
			}
		},
		onLoad(e) {
			// 判断是否有登录
			if (!uni.$auth.isLogin()){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return
			}
			this.queryObj = Object.assign(this.queryObj, e)
		},
		onShow() {
			uni.$utils.setTabBarOrderNum()
			this.refreshGoods()
		},
		created: function() {

		},
		onPullDownRefresh() {
			this.refreshGoods()
		},
		// onReachBottom(e) {
		// 	this.getAllGoods()
		// },
		methods: {
			reFreshPage(){
			},
			initPageData() {
			
					this.getAllGoods()
			},
			refreshGoods() {
				this.queryObj.pageNumber = 0
				this.queryObj.pageCount = 99
				this.goodsList = []
				this.getAllGoods()
			},
	
			getAllGoods() {
				if (this.goodsListLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
					return;
				}
				this.goodsListLoading = true
				this.queryObj.pageNumber++
				uni.$api.getWelfareGoods(this.queryObj).then(res => {
					var dataList = res.rows || []
					this.goodsList = this.goodsList.concat(dataList)
					this.goodsListLoading = false
					this.queryObj.pageCount = res.pageCount || 99
				}).catch(res => {
					uni.$toast.showError(res.message)
					this.goodsListLoading = false
				})
			},
			goToGoodsDetail(goodsId) {
				if (goodsId) {
					uni.navigateTo({
						url: "/pages/goods/goodsdetail?goodsId=" + goodsId
					})
				}
			},
			goToTransfer(item){
				uni.navigateTo({
					url: "/pages/order/addwelfareauction?orderDetailId="+item.orderDetailId
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		watch: {
			goodsListLoading(value) {
				if (!value) {
					uni.stopPullDownRefresh()
				}
			},
		},
		components: {
			listempty,
			nomore
		}
	}
</script>

<style scoped>
	.goods-index-bg {
		position: absolute;
		z-index: 0;
		width: 100%;
		top: 0;
		left: 0;
	}

	.invite-box {
		z-index: 1;
		position: relative;
		padding: 12rpx 20rpx 12rpx 24rpx;
	}

	.invite-icon {
		width: 40rpx;
		height: 40rpx;
	}
	
	.back-icon {
		width: 22rpx;
		height: 40rpx;
		padding: 0 9rpx;
		box-sizing: content-box;
	}

	.search-box {
		width: calc(100% - 66rpx);
		height: 64rpx;
		border-radius: 32rpx;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 1;
		position: relative;
	}

	.search-icon {
		width: 36rpx;
		height: 36rpx;
	}

	.search-input {
		width: calc(100% - 120rpx);
		font-size: 26rpx;
		line-height: 26rpx;
	}

	.goods-icon {
		width: 96rpx;
		height: 38rpx;
	}

	/* 商品导航 */
	.goods-navlist {
		overflow-x: scroll;
	}

	.goods-nav {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #fff;
		padding: 12rpx 18rpx;
		position: relative;
		flex-shrink: 0;
	}

	.goods-nav.cur {
		color: #fff;
		font-size: 32rpx;
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

	.goods-nav.cur .cur-icon {
		display: block;
	}

	/* 商品列表 */
	.goods-box {
		/* margin-top: 26rpx; */
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		background: #f6f6f6;
		padding: 20rpx 20rpx 0;
		z-index: 1;
		position: relative;
	}

	.goods-container {
		height: 100%;
	}

	.goods-list {
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.goods-list+.goods-list {
		margin-top: 20rpx;
	}

	.goods-image {
		width: 220rpx;
		height: 220rpx;
		margin-right: 16rpx;
		flex-shrink: 0;
		border-radius: 12rpx;
	}

	.goods-info {
		height: 220rpx;
	}

	.goods-name {
		font-size: 28rpx;
		color: #303133;
		font-weight: bold;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.goods-label {
		font-size: 20rpx;
		line-height: 20rpx;
		padding: 4rpx 10rpx;
		color: #fff;
		background: #FF411C;
		border-radius: 8rpx;
		display: inline-block;
	}

	.h28 {
		height: 28rpx;
	}
</style>
