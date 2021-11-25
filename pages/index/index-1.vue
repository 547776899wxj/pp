<template>
	<view id="containerId">
		<swiper v-if="swiperList.length > 0" class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'"
			:indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.shopImagePath" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- <image class="banner-image" src="/static/img/example/banner@2x.png" mode="" v-else></image> -->
		<view style="height: 60rpx;"></view>
		<!-- 搜索/邀请 -->
		<view class="flex-center pl32 pr32 mt20 invite-box">
			<navigator url="/pages/user/set" class="dflex ac fdc mr32">
				<image src="/static/img/icon/exit.png" mode="" class="invite-icon mb8"></image>
				<text class="fs-20 lh-28 fc-f">退出</text>
			</navigator>
			<view class="search-box dflex ac">
				<image @click.stop="clickToSearchImg" src="/static/img/icon/search-icon@2x.png" class="search-icon ml32 mr20"></image>
				<input type="text" confirm-type="搜索" v-model="goodsTitle" @confirm="searchGoods" value="" placeholder="" class="search-input" />
			</view>
		</view>
		<!-- <view style="height: 380rpx;"></view> -->
		<!-- navlist/公告 -->
		<view class="nav-notice mb36">
			<view class="authentication" >
				<view class="dflex ac" v-for="(item,index) in quli" :keys="index">
					<image :src="item.icon" class="authentication-icon mr6"></image>
					<text class="fs-20 lh-20 fc-939 fs-0">{{item.name}}</text>
				</view>
			</view>
			<view class="dflex ac mb64">
				<view class="nav-list" v-for="(item,index) in topCategoryNav" :keys="index" @click.stop="categoryClick(index)">
					<image :src="item.icon" class="nav-img mb24"></image>
					<text class="fs-22 lh-22 fc-303 fs-0">{{item.name}}</text>
				</view>
			</view>
			<view class="dflex ac">
				<image src="/static/img/icon/notice@2x.png" mode="" class="notice-img"></image>
				<view class="notice-line mr24"></view>
				<view class="dflex ac">
					<view class="hot-icon mr8">爆</view>
					<view class="fs-26 lh-26 fc-303">{{shopNotice}}</view>
				</view>
			</view>
		</view>
		<!-- 精品拍卖专场 -->
		<view class="auction-hall mb16" v-if="auction" @click="toAuction()">
			<view class="pl20 pt30 mb32 flex-between ac">
				<view class="dflex ac">
					<view class="fs-34 lh-34 fc-f mr16">{{auction.auctionName}}</view>
					<view class="fs-24 lh-24 fc-f mr24">{{auctionHour}}点场</view>
					<view class="dflex ac fc-f" v-if="lastAuctionTime > 0">
						<view class="auction-time ml4 mr4">{{hours}}</view>:
						<view class="auction-time ml4 mr4">{{minute}}</view>:
						<view class="auction-time ml4 mr4">{{second}}</view>
					</view>
					<view v-else class="fs-24 lh-24 fc-f mr24"> 正在进行中</view>
				</view>
				<view class="p16 fc-f fs-24 lh-24">更多</view>
			</view>
			<view class="dflex ac pl20 pr20">
				<view :class="index!=3?'mr16':''" v-for="(item,index) in auctionLotList" :keys="index">
					<image :src="item.lotImage" mode="" class="auction-image"></image>
					<view class="dflex ac fdc">
						<view class="fs-28 lh-34 fc-f fw-b"><text class="fs-24 fw-5">￥</text>{{item.auctionLotOutPrice}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pl20 pr20">
			<view class="wp100 mb40" v-show="showPackImg" @click.stop="showNewUserCoupon = true">
				<image src="/static/img/images/pack@2x.png" mode="widthFix" class="wp100"></image>
			</view>
			<!-- <view class="mb40" v-if="popularRecommend && popularRecommend.length > 0" >
				<view class="recommend-title">人气推荐</view>
				<view class="flex-between ac">
					<view class="recommend-list recommend-life" @click.stop="goToGoodsList()">
						<image :src="popularRecommend[0].icon" class="recommend-service dflex ac fdc"></image>
					</view>
					<view class="dflex ai-fs fdc">
						<view class="recommend-list recommend-hot mb12" @click.stop="goToGoodsList()">
							<image :src="popularRecommend[1].icon" class="recommend-service pl30 dflex ai-fs fdc"></image>
						</view>
						<view class="recommend-list recommend-new" @click.stop="goToGoodsList()">
							<image :src="popularRecommend[2].icon" class="recommend-service pl30 dflex ai-fs fdc"></image>
						</view>
					</view>
				</view>
			</view> -->
			<view class="">
				<view class="fs-34 lh-48 fw-b fc-303 mb16">猜你喜欢</view>
				<view class="flex-between ai-fs">
					<!-- 左边 -->
					<view class="dflex fdc">
						<view class="goods-list" v-for="(item,index) in leftGoods" :keys="index" @click.stop="toGoodsDetail(item.goodsId)">
							<image :src="item.goodsImage" mode="widthFix" class="goods-image"></image>
							<view class="goods-container">
								<view class="goods-name">{{item.goodsTitle}}</view>
								<view class="fs-24 lh-34 fc-939 wp100 text-hidden mt6" v-show="item.goodsSubTitle">{{item.goodsSubTitle}}</view>
								<view class="fs-32 lh-36 fw-b fc-e31 mt16"><text class="fs-24 fc-e31">￥</text>{{item.goodsPrice}}</view>
							</view>
						</view>
					
					</view>
					<!-- 右边 -->
					<view class="dflex fdc">
						<view class="goods-list" v-for="(item,index) in rightGoods" :keys="index" @click.stop="toGoodsDetail(item.goodsId)">
							<image :src="item.goodsImage" mode="widthFix" class="goods-image"></image>
							<view class="goods-container">
								<view class="goods-name">{{item.goodsTitle}}</view>
								<view class="fs-24 lh-34 fc-939 wp100 text-hidden mt6" v-show="item.goodsSubTitle">{{item.goodsSubTitle}}</view>
								<view class="fs-32 lh-36 fw-b fc-e31 mt16"><text class="fs-24 fc-e31">￥</text>{{item.goodsPrice}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 新人礼包弹窗 新  :class="showNewUserCoupon?'show':''" -->
		<view class="cu-modal" :class="showNewUserCoupon?'show':''">
			<view class="novice">
				<image src="/static/img/bg/index-alert2@2x.png" class="wp100 alert-image" style="height: 398px;" mode="scaleToFill"></image>
				<view class="coupon-box">
					<image src="/static/img/bg/index-alert-box.png" class="wp100 index-alert-box" style="height: 234px;" mode="scaleToFill"></image>
					<view class="coupon-list mb10" v-if="redEnvelopeMoney > 0">
						<image src="/static/img/bg/coupon-bg3@2x.png" class="wp100 hp100" mode=""></image>
						<view class="coupon-info">
							<view class="coupon-price dflex ai-fe">
								<view class="fs-38 fc-ffe fw-b lh-28">￥</view>
								<view class="fs-80 lh-60 fw-b fc-ffe">{{redEnvelopeMoney}}</view>
							</view>
							<view class="coupon-fg-line"></view>
							<view class="coupon-condition">
								<view class="fs-28 lh-28 fc-f fw-b mb14 mt6">新人红包</view>
								<view class="coupon-btn fc-f46">可提现</view>
							</view>
						</view>
					</view>
					<view class="coupon-list mb40" v-if="auctionCoupon">
						<image src="/static/img/bg/coupon-bg4@2x.png" class="wp100 hp100" mode=""></image>
						<view class="coupon-info">
							<view class="coupon-price dflex ai-fe">
								<image src="../../static/img/icon/index-vip-icon@2x.png" class="index-vip-icon" mode=""></image>
							</view>
							<view class="coupon-fg-line"></view>
							<view class="coupon-condition">
								<view class="fs-28 lh-28 fc-f fw-b mb14 mt6">VIP券 1张</view>
								<view class="coupon-btn fc-d64">可提前1分钟开始抢拍</view>
							</view>
						</view>
					</view>
					<view class="receive-btn pr flex-center" @click.stop="receiveNewUserPackage()">立即领取</view>
				</view>
				<image src="/static/img/icon/index-alert-close@2x.png" class="close-image" mode="" @tap="hideModal"></image>
			</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<!-- <tabbar></tabbar> -->
	</view>
</template>

<script>
	import tabbar from '../component/tabbar.vue';
	export default {
		data() {
			return {
				swiperList: [{
						id: 0,
						type: 'image',
						url: '../../static/img/example/banner@2x.png'
					},
					{
						id: 1,
						type: 'image',
						url: '../../static/img/example/banner@2x.png'
					},
				],
				auction:{},//拍卖场信息
				auctionLotList:[],//拍品列表
				leftGoods:[],//猜你喜欢 商品列表
				rightGoods:[],//猜你喜欢 商品列表
				shopNotice:"",//店铺公告
				dotStyle: true,
				
				showPackImg: false,//是否显示新人礼包
				redEnvelopeMoney: '', //现金红包金额
				auctionCoupon:'',//新人礼包-vip券
				showNewUserCoupon:false,//新人券弹窗
				
				
				quli:[],//资质
				topCategoryNav:[],//头部类目导航栏
				popularRecommend:[],//人气推荐
				lastAuctionTime:0,//最近拍场信息
				hours:0,//
				minute:0,//
				second:0,//
				goodsTitle:"",//商品标题搜索
				auctionTimeId:"",//
				auctionHour:0//几点场
			}
		},
		mounted: function () {
			  uni.$utils.blankScreenWatchAndRelunch(this,'#containerId','/pages/index/main')
		},
		onShow() {
			uni.$utils.setTabBarOrderNum()
			this.initPageData()
		},
		watch:{
			lastAuctionTime (value) {
				if (value > 0) {
					let h = parseInt(value/60/60)
					let last = value%3600
					let m = parseInt(last/60)
					let s = last % 60 + ""
					this.hours = h > 10?h:"0"+h
					this.minute = m > 10?m:"0"+m
					this.second = s.length > 1?s:"0"+s
				} else {
					this.hours = 0
					this.minute = 0
					this.second = 0
					clearInterval(this.auctionTimeId)
					this.auctionTimeId = ""
				}
			},
		},
		methods: {
			initPageData () {
				this.getSwiperImage()
				this.getJsonConfig()
				this.getLateLyAuction()
				this.hasNewUserPackage()
				this.getSaleMaxGoods()
			},
			clickToSearchImg () {
				var e = {
					detail:{
						value:this.goodsTitle
					}
				}
				this.searchGoods(e)
			},
			searchGoods (e) {
				var value = e.detail.value
				var option = {
					goodsTitle:value
				}
				uni.reLaunch({
					url:"/pages/goods/list?goodsTitle="+value
				})
			},
			categoryClick (index) {
				//类目点击事件
				var cate = this.topCategoryNav[index]
				if (cate.isToTabbar) {
					if(cate.goodsCategoryId){
						uni.setStorageSync('goodsCategoryId', cate.goodsCategoryId);
					}
					uni.switchTab({
						url:cate.navUrl
					})
				} else {
					uni.navigateTo({
						url:cate.navUrl
					})
				}
			},
			/**
			 * 轮播图
			 */
			getSwiperImage () {
				uni.$api.getSwiperImage().then(res => {
					this.swiperList = res.rows
					this.shopNotice = res.shopNotice
				})
			},
			/**
			 * 导航栏json
			 */
			getJsonConfig () {
				uni.$api.getJsonConfig().then(res => {
					var configJson = JSON.parse(res.data)
					var quli = configJson.quli
					var topCategoryNav = configJson.topCategoryNav
					var popularRecommend = configJson.popularRecommend
					
					this.quli = quli.rows || []
					this.topCategoryNav = topCategoryNav.rows || []
					this.popularRecommend = popularRecommend.rows || []
				})
			},
			/**
			 * 最近拍卖
			 */
			getLateLyAuction () {
				uni.$api.getLateLyAuction().then(res => {
					var {auctionLotList,auction} = res
					this.auctionLotList = auctionLotList
					this.auction = res.auction
					if (res.auction) {
						this.handlerAuction()
					}
				})
			},
			handlerAuction () {
				
				//处理倒计时
				var timeStr = this.auction.auctionBeginTime;
				var date = new Date()
				var d1 = uni.$utils.strToDate(timeStr)
				var second = parseInt((d1.getTime() - date.getTime())/1000)
				this.lastAuctionTime = second
				if (second > 0) {
					var self = this
					if (!this.auctionTimeId) {
						this.auctionTimeId = setInterval(function () {
							self.lastAuctionTime -= 1
						},1000)
					}
				}
				var hours = d1.getHours();
				this.auctionHour = hours
			},
			/**
			 * 判断新人礼包
			 */
			hasNewUserPackage () {
				uni.$api.getNewUserActivity().then(res =>{
					let {activity, activityReceiveUser={}, redEnvelopeMoney=0, auctionVipCoupon} = res
					if (activityReceiveUser === null ) activityReceiveUser = {}
					if (!activity || activityReceiveUser.activityReceiveUserStatus != 1) {
						//活动不存在 || 活动不是待领取状态
						this.showPackImg = false
					}
					else {
						this.showPackImg = true
					}
					console.log('asdf', this.showPackImg)
					//vip券
					this.auctionCoupon = auctionVipCoupon
					//现金红包
					this.redEnvelopeMoney = redEnvelopeMoney
				})
			},
			/**
			 * 获取人气推荐
			 */
			getSaleMaxGoods () {
				uni.$api.getSaleMaxGoods().then(res => {
					var goodsList = res.rows || []
					var leftGoods = []
					var rightGoods = []
					if (goodsList && goodsList.length > 0) {
						for (var i = 0;i<goodsList.length;i++) {
							if (i % 2 == 0) {
								leftGoods.push(goodsList[i])
							} else {
								rightGoods.push(goodsList[i])
							}
						}
					}
					this.leftGoods = leftGoods
					this.rightGoods = rightGoods
				})
			},
			/** 收下新人用户礼包 **/
			receiveNewUserPackage () {
				// 判断是否有登录
				if (!uni.$auth.isLogin()){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return
				}
				
				
				let {redEnvelopeMoney, auctionCoupon} = this
				var param = {
					redEnvelope: redEnvelopeMoney>0?1:0,
					auctionVipCoupon: !auctionCoupon?0:1
				}
				uni.$api.receviceNewUserActivity(param).then(res => {
					uni.$toast.alert("领取成功")
					this.showPackImg = false
					this.hideModal()
				}).catch(res => {
					uni.$toast.alert(res.message)
					this.hideModal()
				})
			},
			toAuction () {
				uni.switchTab({
					url:"/pages/auction/index"
				})
			},
			hideModal(e) {
				this.showNewUserCoupon = false
			},
			toMessage () {
				uni.navigateTo({
					url:"/pages/user/message"
				})
			},
			toGoodsDetail (goodsId) {
				console.log("goodsId:"+goodsId)
				if (goodsId) {
					uni.navigateTo({
						url:"/pages/goods/goodsdetail?goodsId="+goodsId
					})
				}
			},
			goToGoodsList () {
				uni.switchTab({
					url:"/pages/goods/list"
				})
			}
		},
		components: {
			tabbar
		}
	}
</script>

<style>
	.screen-swiper {
		width: 100%;
		height: 564rpx;
		position: absolute;
		z-index: 0;
		top: 0;
	}

	.banner-image {
		width: 100%;
		height: 564rpx;
		position: absolute;
		z-index: -1;
		top: 0;
	}

	.invite-box {
		z-index: 1;
		position: relative;
	}

	.invite-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.search-box {
		width: calc(100% - 104rpx);
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

	/* 类别和公告 */
	.nav-notice {
		margin-top: 294rpx;
		width: 100%;
		height: 460rpx;
		background: #fff;
		background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 1) 46%, rgba(255, 255, 255, 0) 100%);
		border-radius: 20px 20px 0px 0px;
		padding: 32rpx;
		z-index: 1;
		position: relative;
	}

	.authentication {
		display: flex;
		align-items: center;
		margin-bottom: 32rpx;
	}

	.authentication>view {
		margin-right: 32rpx;
	}

	.authentication>view:last-child {
		margin-right: 0rpx;
	}

	.authentication-icon {
		width: 22rpx;
		height: 22rpx;
		flex-shrink: 0;
	}

	.nav-img {
		width: 90rpx;
		height: 90rpx;
	}

	.nav-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		margin-right: 50rpx;
	}

	.nav-list:last-child {
		margin-right: 0;
	}

	.notice-img {
		width: 56rpx;
		height: 23rpx;
		margin: 0 24rpx;
	}

	.notice-line {
		width: 2rpx;
		height: 26rpx;
		background: #dedee4;
	}

	.hot-icon {
		width: 32rpx;
		height: 32rpx;
		border-radius: 8rpx;
		background-color: #ff411c;
		color: #fff;
		font-size: 22rpx;
		line-height: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	/* 拍卖专场 */
	.auction-hall {
		width: calc(100% - 40rpx);
		margin: -114rpx auto 0;
		height: 354rpx;
		background: url(../../static/img/bg/index-cardbg@2x.png) no-repeat;
		background-size: 100% 100%;
		z-index: 1;
		position: relative;
	}

	.auction-time {
		width: 32rpx;
		height: 32rpx;
		border-radius: 8rpx;
		background-color: #fff;
		color: #FF411C;
		font-size: 20rpx;
		line-height: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.auction-image {
		width: 156rpx;
		height: 156rpx;
		border-radius: 16rpx;
	}

	/* 人气推荐 */
	.recommend-title {
		font-size: 34rpx;
		line-height: 48rpx;
		font-weight: bold;
		color: #303133;
		margin-bottom: 14rpx;
	}

	.recommend-list {
		border-radius: 20rpx;
	}

	.recommend-life {
		width: 348rpx;
		height: 348rpx;
	}

	.recommend-service {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
		position: relative;
	}

	.recommend-life .recommend-service {
		background: #F2F6FF;
		background-size: 100% 100%;
	}

	.recommend-hot {
		width: 350rpx;
		height: 168rpx;
	}

	.recommend-hot .recommend-service {
		background:#F9F0EB;
		background-size: 100% 100%;
	}

	.recommend-new {
		width: 350rpx;
		height: 168rpx;
	}

	.recommend-new .recommend-service {
		background: #FCEBFD;
		background-size: 100% 100%;
	}

	.recommend-tips {
		padding: 8rpx 12rpx;
		border-radius: 16rpx 0px 16rpx 0px;
		background: #FF411C;
		font-size: 20rpx;
		line-height: 20rpx;
		color: #fff;
		position: absolute;
		left: 0;
		top: 0;
	}

	/* 猜你喜欢 */
	.goods-list {
		width: 348rpx;
		background: #fff;
		margin-bottom: 14rpx;
	}

	.goods-container {
		padding: 16rpx 20rpx 20rpx;
	}

	.goods-name {
		font-size: 28rpx;
		color: #303133;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	/* 弹窗 */
	.novice {
		width: 547rpx;
		height: 798rpx;
		position: fixed;
		z-index: 10000;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.alert-image {
		position: absolute;
		z-index: 0;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.coupon-box {
		width: 476rpx;
		height: 476rpx;
		position: absolute;
		bottom: 38rpx;
		left: 35rpx;
		right: 36rpx;
		margin: 0 auto;
		padding: 46rpx 25rpx 0 27rpx;
	}
	.index-alert-box {
		position: absolute;
		top: 0;
		left: 0;
	}
	.coupon-list {
		width: 100%;
		height: 132rpx;
		position: relative;
		z-index: 3;
	}
	.coupon-list > image {	
		position: absolute;
		z-index: -1;
		left: 0;
	}
	.coupon-info {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.coupon-price {
		width: 165rpx;
		justify-content: center;
		align-items: flex-end;
	}
	.coupon-fg-line {
		width: 0.8rpx;
		height: 89rpx;
		background: rgba(255,255,255,0.3);
	}
	.coupon-condition {
		flex: 1;
	}
	.coupon-btn {
		width: 220rpx;
		height: 26rpx;
		background: rgba(255,255,255,0.5);
		margin-left: 19rpx;
		border-radius: 13rpx;
		padding: 4rpx 0;
		font-size: 18rpx;
		line-height: 22rpx;
		font-weight: bold;
	}
	.index-vip-icon {
		width: 86rpx;
		height: 75rpx;
	}
	.receive-btn {
		width: 426rpx;
		height: 68rpx;
		background: #E73F44;
		border-radius: 34rpx;
		font-size: 30rpx;
		color: #ffbc3b;
	}
	.fc-604 {
		color: #604E44;
	}
	.fc-4e3 {
		color: #4E3E35;
	}
	.fc-ffe {
		color: #ffefea;
	}
	.fc-f46 {
		color: #f46920;
	}
	.fc-d64 {
		color: #d64e29;
	}
	.close-image {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: -111rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
</style>
