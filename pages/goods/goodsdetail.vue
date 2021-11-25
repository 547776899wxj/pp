<template>
	<view class="goods-detail">
		<view class="cu-bar search">
			<view class="action">
				<image @click="back()" src="/static/img/icon/goods-back@2x.png" mode="" class="m-icon"></image>
			</view>
		</view>
		<view class="pr">
			<swiper @change="swiperChange" class="screen-swiper no-dot" :indicator-dots="true" :circular="true"
			  :autoplay="true">
				<swiper-item  v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" ></image>
				</swiper-item>
			</swiper>
			<view class="swiper-number flex-center">{{current}}/{{swiperList.length}}</view>
		</view>
		<view class="container">
			<view class="goods-main">
				<view class="dflex ac mb24">
					<view class="dflex ac mr32">
						<text class="fs-32 fc-ff4">￥</text>
						<text class="fs-48 fc-ff4 fw-b lh-56">{{goodsDetail.goodsPrice}}</text>
					</view>
					<text class="fs-24 lh-34 fc-939 td-lt" v-if="goodsDetail.goodsOriginalPrice">￥{{goodsDetail.goodsOriginalPrice}}</text>
				</view>
				<view class="mb16">
					<view class="goods-label mr16" v-if="goodsDetail.goodsBrandName">{{goodsDetail.goodsBrandName}}</view>
					<text class="fs-32 lh-48 fc-303 fw-b">{{goodsDetail.goodsTitle}}</text>
				</view>
				<view class="fs-28 lh-40 fc-606 mb16">{{goodsDetail.goodsSubTitle}}</view>
				<view class="flex-between ac">
					<view class="fs-24 lh-34 fc-939">已售：{{goodsDetail.goodsCountSale}}件</view>
					<view class="fs-24 lh-34 fc-939">库存：{{goodsDetail.goodsStock}}</view>
				</view>
			</view>
			<view class="goods-content" v-if="goodsTab && goodsTab.length > 0">
				<view class="parameter-box">
					<view class="parameter-nav" :class="tab.id == goodsTabCur?'cur':''" v-for="(tab,index) in goodsTab" :key="tab.id"
					@click="goodsTabClick(tab.id)">
						{{tab.name}} <view class="cur-icon"></view>
					</view>
				</view>
				<!-- 商品视频 -->
				<view class="detail-box" id="video-box" v-if="goodsDetail.goodsVideoUrl">
					<view class="detail-title dflex ac pb0">
						<view class="title-icon"></view>
						<view class="fs-24 lh34 fc-303 fw-b">商品视频</view>
					</view>
					<view class="detail-video" >
						<video  id="myVideo" style="width: 100%;height: 400rpx;"  :src="goodsDetail.goodsVideoUrl"></video>
					</view>
				</view>
				<!-- 商品参数-->
				<view class="detail-box" id="param-box" v-if="goodsDetail.goodsAttrList && goodsDetail.goodsAttrList.length > 0">
					<view class="detail-title dflex ac">
						<view class="title-icon"></view>
						<view class="fs-24 lh34 fc-303 fw-b">商品参数</view>
					</view>
					<view class="detail-main" >
						<view class="main-parameter" >
							<view class="parameter-list" v-for="(item,index) in goodsDetail.goodsAttrList" :key="index">
								<view class="parameter-title">{{item.goodsAttrName}}</view>
								<view class="parameter-info">{{item.goodsAttrValue}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 商品详情 -->
				<view class="detail-box" id="desc-box" v-if="goodsDetail.goodsDesc">
					<view class="detail-title dflex ac">
						<view class="title-icon"></view>
						<view class="fs-24 lh34 fc-303 fw-b">商品详情</view>
					</view>
					<view class="detail-content"   >
						<rich-text :nodes="goodsDetail.goodsDesc"></rich-text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<view class="cu-bar bg-white border shop">
			<button class="action" open-type="contact" @click.stop="showCustomer()">
				<image class="m-icon" src="../../static/img/icon/user-index-icon4@2x.png" ></image> 客服
			</button>
			<view class="action" @click="collectGoods">
				<view v-if="goodsDetail.goodsUserCollection > 0" class="dflex fdc ac">
					<image  src="/static/img/icon/collection@2x.png" mode="" class="m-icon"></image>已收藏 
				</view>
				<view v-else class="dflex fdc ac">
					<image src="/static/img/icon/collect@2x.png" mode="" class="m-icon"></image> 收藏
				</view>
			</view>
			<view class="btn-group">
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-if="goodsDetail.goodsStatus == 0">商品已下架</button>
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-else-if="goodsDetail.goodsStock <= 0">已售罄</button>
				<button class="cu-btn bg-pp fc-f round" v-else @click="addOrder">立即购买</button>
			</view>
		</view>
		<customer :show="customerAlert" @cancel="hideModel"></customer>
	</view>
</template>

<script>
	
	import customer from 'pages/component/customer.vue';
	
	export default {
		data() {
			return {
				goodsId:"",
				swiperList: [],
				goodsDetail:{},
				dotStyle: false,
				player:{},
				current:1,
				videoShow:true,
				goodsTabCur:0,
				customerAlert:false,
				goodsTab:[]
			}
		},
		components:{
			customer
		},
		onLoad (e) {
			this.goodsId = e.goodsId
			this.getGoodsDetail()
		},
		onShow () {
			this.player = uni.createVideoContext('myVideo')
		},
		methods: {
			showCustomer () {
				this.customerAlert=true
			},
			hideModel () {
				this.customerAlert=false
			},
			goodsTabClick (tabId) {
				this.goodsTabCur = tabId
				for (var i in this.goodsTab) {
					if (this.goodsTab[i].id == tabId) {
						var cssId = this.goodsTab[i].cssId
						uni.createSelectorQuery().select("#"+cssId).boundingClientRect((res)=>{//最外层盒子节点
						　　　　uni.pageScrollTo({
						　　　　　　duration:200,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
						　　　　　　scrollTop:res.top,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
						　　　　})
						　　}).exec()
					}
				}
				
			},
			swiperChange (current, source) {
				var index = current.target.current
				this.current = index+1
			},
			back () {
				uni.navigateBack()
			},
			getGoodsDetail () {
				var params = {
					goodsId: this.goodsId
				}
				uni.$api.getGoodsDetail(params).then(res => {
					if (res.success) {
						if (res.data.goodsDesc) {
							res.data.goodsDesc = uni.$utils.formatRichTextImage(res.data.goodsDesc)
						}
						this.handlerGoodsData(res.data)
					}
				}).catch(res => {
					uni.$toast.showError(res.message)
				})
			},
			handlerGoodsData (goodsDetail) {
				this.goodsDetail = goodsDetail
				this.handlerSwiper()
				this.handlerGoodsTab()
			},
			//处理轮播图
			handlerSwiper () {
				var goodsDetail = this.goodsDetail
				var swiperList = []
				/* if (goodsDetail.goodsImage) {
					swiperList.push({
						url:goodsDetail.goodsImage,
					})
				} */
				if (goodsDetail.goodsImages && goodsDetail.goodsImages.length > 0) {
					for (var i in goodsDetail.goodsImages) {
						swiperList.push({
							url:goodsDetail.goodsImages[i].goodsImagePath,
						})
					}
				}
				this.swiperList = swiperList
			},
			//处理tab标签
			handlerGoodsTab () {
				var goodsDetail = this.goodsDetail
				var tabs = []
				if (goodsDetail.goodsVideoUrl) {
					tabs.push({
						id:1,
						name:"商品视频",
						cssId:"video-box"
					})
				}
				if (goodsDetail.goodsAttrList && goodsDetail.goodsAttrList.length > 0) {
					tabs.push({
						id:2,
						name:"商品参数",
						cssId:"param-box"
					})
				}
				if (goodsDetail.goodsDesc) {
					tabs.push({
						id:3,
						name:"商品详情",
						cssId:"desc-box"
					})
				}
				console.log(JSON.stringify(tabs))
				if (tabs.length > 0) {
					this.goodsTabCur = tabs[0].id || ""
					this.goodsTab = tabs || []
				}
			},
			collectGoods () {
				var params = {
					goodsId:this.goodsId
				}
				uni.$api.collectGoods(params).then(res => {
					if (res.success) {
						this.goodsDetail.goodsUserCollection = res.userCollect
					}
				}).catch(res => {
					this.$toast.showError(res.message)
				})
			},
			addOrder () {
				uni.navigateTo({
					url:"/pages/order/addorder?goodsId="+this.goodsId
				})
			}
		}
	}
</script>

<style>
.cu-bar.search {
	position: fixed;
	top: 40rpx;
	width: 100%;
	left: 0;
	z-index: 2;
}
swiper {
	height: 750rpx;
}
.swiper-number {
	position: absolute;
	bottom: 32rpx;
	right: 32rpx;
	width: 92rpx;
	height: 40rpx;
	font-size: 22rpx;
	line-height: 22rpx;
	color: #fff;
	background: #000000;
	opacity: 0.4;
	border-radius: 40rpx;
}
.container {
	padding: 16rpx;
}
.goods-main {
	width: 100%;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 24rpx;
	margin-bottom: 16rpx;
}
.goods-label {
	font-size: 20rpx;
	line-height: 20rpx;
	padding: 4rpx 10rpx;
	color: #fff;
	background: #FF411C;
	border-radius: 8rpx;
	display: inline-block;
	vertical-align: top;
	margin-top: 8rpx;
}
.parameter-box {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 88rpx;
}
.parameter-nav {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #606266;
	font-weight: bold;
	position: relative;
}
.parameter-nav.cur {
	color: #FF411C;
}
.cur-icon {
	width: 48rpx;
	height: 4rpx;
	background-color: #FF411C;
	border-radius: 2rpx;
	display: none;
	position: absolute;
	bottom: -4rpx;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.parameter-nav.cur .cur-icon {
	display: block;
}
.goods-content {
	border-radius: 20rpx;
	background-color: #fff;
}
.detail-main {
	padding: 0 24rpx 24rpx;
}
.main-parameter {
	border: 2rpx solid #EBEBF5;
	opacity: 1;
	border-radius: 8rpx;
}
.parameter-list {
	min-height: 66rpx;
	display: flex;
	align-items: center;
}
.parameter-list+.parameter-list {
	border-top: 2rpx solid #EBEBF5;
}
.parameter-list view {
	padding-left: 30rpx;
	height: 100%;
	line-height: 66rpx;
	font-size: 24rpx;
	color: #939399;
}
.parameter-list view:first-child {
	width: 220rpx;
	border-right: 2rpx solid #EBEBF5;
}
.cu-bar.shop {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 9;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
	padding: 0 32rpx;
}
.cu-bar.shop .action {
	flex-direction: column;
	font-size: 20rpx;
	color: #939399;
}
.cu-btn {
	width: 400rpx;
	height: 76rpx;
}
.detail-video {
	padding: 20rpx;
}
button {
	margin: 0;
}
.detail-title {
	padding: 24rpx;
}

.title-icon {
	width: 4rpx;
	height: 24rpx;
	background-color: #FF411C;
	margin-right: 24rpx;
}
</style>
