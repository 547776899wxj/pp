<template>
	<view class="template">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item">
					<image :src="item.shopImagePath" class="wp100" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view :style="{height:StatusBar + 'px'}"></view>
		<view class="search-box">
			<view class="dflex fdc ac mr24" @click.stop="toOut()">
				<image src="../../static/img/icon/exit@2x.png" mode="widthFix" class="exit-icon"></image>
				<view class="fs-22 lh-22 fc-f">退出</view>
			</view>
			<view class="search-input">
				<input v-model="goodsTitle" @confirm="searchGoods" type="text" placeholder="请输入商品名称" placeholder-class="fs-28 lh-28 fc-f" class="fs-28 lh-28 fc-f">
				<view @click.stop="clickToSearchImg" class="search-btn flex-center">搜索</view>
			</view>
		</view>
		<view class="classify-box mb20">
				<view class="classify flex-center fdc" @click="toWelfareGoods">
					<image src="../../static/img/icon/classify11.png" mode="widthFix" class="classify-img"></image>
					<view class="fs-24 lh-24 fc-6">一键转拍</view>
				</view>
			<view class="classify flex-center fdc" v-for="(item,index) in topCategoryNav" :keys="index" @click.stop="categoryClick(index)">
				<image :src="item.icon" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">{{item.name}}</view>
			</view>
			<!-- <view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify1.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">家具百货</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify2.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">美妆个护</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify3.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">美食酒饮</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify4.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">母婴亲子</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify5.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">营养健康</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify6.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">服饰鞋包</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify7.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">宠物生活</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify8.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">户外出行</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify9.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">数码家电</view>
			</view>
			<view class="classify flex-center fdc">
				<image src="../../static/img/icon/classify10.png" mode="widthFix" class="classify-img"></image>
				<view class="fs-24 lh-24 fc-6">家装家纺</view>
			</view> -->
		</view>
		<view class="pack" v-show="showPackImg" @click.stop="showNewUserCoupon = true">
			<image src="../../static/img/images/pack.png" mode="widthFix"></image>
		</view>
		<!-- <view class="hot-box mb24">
			<view class="hot-title fs-32 lh-32 fw-b fc-3 mb28">热门盲盒</view>
			<view class="dflex fw-w">
				<view class="hot-list flex-center fdc">
					<image src="../../static/img/example/auction1@2x.png" mode="widthFix"></image>
					<view class="fs-24 lh-24 fc-3">动物之境</view>
				</view>
				<view class="hot-list flex-center fdc">
					<image src="../../static/img/example/auction1@2x.png" mode="widthFix"></image>
					<view class="fs-24 lh-24 fc-3">动物之境</view>
				</view>
				<view class="hot-list flex-center fdc">
					<image src="../../static/img/example/auction1@2x.png" mode="widthFix"></image>
					<view class="fs-24 lh-24 fc-3">动物之境</view>
				</view>
				<view class="hot-list flex-center fdc">
					<image src="../../static/img/example/auction1@2x.png" mode="widthFix"></image>
					<view class="fs-24 lh-24 fc-3">动物之境</view>
				</view>
			</view>
		</view> -->
<!-- 		<view class="auction-box mb40" v-if="auction" @click="toAuction()">
			<image src="../../static/img/bg/acution-bg.png" mode="widthFix" class="auction-bg"></image>
			<view class="flex-between ac mb28">
				<view class="dflex ac">
					<view class="fs-32 lh-32 fc-f fw-b mr24">{{auction.auctionName}}</view>
					<view class="fs-24 lh-24 fc-f fw-b mr10">{{auctionHour}}点场</view>
					<view class="auction-time-box flex-center" v-if="lastAuctionTime > 0">
						<view class="auction-time flex-center">{{hours}}</view>:
						<view class="auction-time flex-center">{{minute}}</view>:
						<view class="auction-time flex-center">{{second}}</view>
					</view>
				</view>
				<view class="dflex ac">
					<view class="fs-24 lh-24 fc-f mr10">更多</view>
					<image src="../../static/img/icon/gd.png" mode="widthFix" class="gd-icon"></image>
				</view>
			</view>
			<view class="dflex fw-w">
				<view class="auction-list flex-center fdc" v-for="(item,index) in auctionLotList" :keys="index">
					<image :src="item.lotImage" mode="widthFix"></image>
					<view class="fs-32 lh-32 fc-fb2 fw-b dflex ai-fe mb8"><view class="fs-24 lh-24 fc-fb2 mb2">￥</view>{{item.auctionLotOutPrice}}</view>
				</view>			
			</view>
		</view> -->
		<view class="notice-box">
			<view class="notice-icon">公告</view>
			<view class="fs-26 lh-26 fc-3 notice-info">{{shopNotice}}</view>
			<view class="notice-mask"></view>
		</view>
		<view class="recommend-box">
			<view class="flex-center mb28">
				<image src="../../static/img/icon/recommend.png" mode="widthFix" class="recommend-icon"></image>
				<view class="fs-32 lh-32 fc-d52 fw-b ml20 mr20">猜你喜欢</view>
				<image src="../../static/img/icon/recommend.png" mode="widthFix" class="recommend-icon trans180"></image>
			</view>
			<view class="recommend-content flex-between ai-fs">
				<view class="dflex fdc">
					<view class="recommend-list" v-for="(item,index) in leftGoods" :keys="index" @click.stop="toGoodsDetail(item.goodsId)">
						<image :src="item.goodsImage" mode="widthFix" class="recommend-img"></image>
						<view class="recommend-info">
							<view class="fs-28 lh-28 fc-3 recommend-name mb30">{{item.goodsTitle}}</view>
							<view class="fs-34 lh-34 fc-fb2 fw-b dflex ai-fe"><view class="fs-26 lh-26">￥</view>{{item.goodsPrice}}</view>
						</view>
					</view>
				</view>
				<view class="dflex fdc">
					<view class="recommend-list" v-for="(item,index) in rightGoods" :keys="index" @click.stop="toGoodsDetail(item.goodsId)">
						<image :src="item.goodsImage" mode="widthFix" class="recommend-img"></image>
						<view class="recommend-info">
							<view class="fs-28 lh-28 fc-3 recommend-name mb30">{{item.goodsTitle}}</view>
							<view class="fs-34 lh-34 fc-fb2 fw-b dflex ai-fe"><view class="fs-26 lh-26">￥</view>{{item.goodsPrice}}</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
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
		computed: {
			style() {
				var StatusBar= this.StatusBar;
			}
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
			toWelfareGoods(){
				uni.navigateTo({
					url:'/pages/goods/welfarelist'
				})
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
			},
			toOut(){
				uni.navigateTo({
					url:"/pages/user/set"
				})
			}
		}
	}
</script>

<style scoped>
.template {
	position: relative;
	z-index: 5;
}
.template swiper {
	width: 100%;
	height: 552rpx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: -1;
}
.template swiper swiper-item {
	width: 100%;
}
.search-box {
	width: calc(100% - 48rpx);
	margin: 0 auto;
	display: flex;
}
.search-box .exit-icon {
	width: 36rpx;
	height: 36rpx;
	margin-bottom: 10rpx;
}
.search-input {
	height: 64rpx;
	border: 2rpx solid #fff;
	border-radius: 32rpx;
	position: relative;
	flex: 1;
}
.search-input input {
	height: 100%;
	text-indent: 26rpx;
}
.search-btn {
	font-size: 28rpx;
	line-height: 28rpx;
	color: #d25f2c;
	width: 120rpx;
	height: 64rpx;
	background-color: #fff;
	border-radius: 32rpx;
	position: absolute;
	right: -2rpx;
	top: -2rpx;
}
.classify-box {
	width: calc(100% - 48rpx);
	margin: 0 auto;
	border-radius: 20rpx;
	padding: 24rpx;
	background-color: #fff;
	display: flex;
	flex-wrap: wrap;
	margin-top: 364rpx;
}
.classify {
	margin-right: 38rpx;
}
.classify:nth-child(5n) {
	margin-right: 0;
}
.classify:nth-child(-n+5) {
	margin-bottom: 30rpx;
}
.classify-img {
	width: 100rpx;
	height: 100rpx;
	margin-bottom: 16rpx;
}
/* 新人大礼包 */
.pack {
	width: calc(100% - 26rpx);
	margin: 0 14rpx 20rpx 12rpx;
}
.pack image {
	width: 100%;
}
/* 热门盲盒 */
.hot-box {
	width: calc(100% - 48rpx);
	margin: 0 auto;
	border-radius: 20rpx;
	padding: 28rpx 24rpx;
	background-color: #fff;
}
.hot-list {
	margin-right: 20rpx;
}
.hot-list:last-child {
	margin-right: 0;
}
.hot-list image {
	width: 148rpx;
	height: 148rpx;
	margin-bottom: 16rpx;
}
.auction-box {
	width: calc(100% - 48rpx);
	margin: 0 auto;
	border-radius: 20rpx;
	padding: 32rpx 24rpx 28rpx;
	background-color: #fff;
	position: relative;
	z-index: 5;
}
.auction-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: -1;
}
.auction-time-box {
	font-size: 22rpx;
	line-height: 22rpx;
	color: #FFFFFF;
	font-weight: bold;
}
.auction-time {
	width: 34rpx;
	height: 34rpx;
	background-color: rgba(255,255,255,0.2);
	border-radius: 6rpx;
}
.gd-icon {
	width: 11rpx;
	height: 20rpx;
}
.auction-list image {
	width: 148rpx;
	height: 148rpx;
	border-radius: 10rpx;
	margin-bottom: 28rpx;
}
.auction-list {
	width: 148rpx;
	margin-right: 20rpx;
}
.auction-list:last-child {
	margin: 0;
}
.fc-fb2 {
	color: #FB203A;
}
.notice-box {
	width: calc(100% - 48rpx);
	margin: 0 auto 40rpx;
	display: flex;
	align-items: center;
	position: relative;
}
.notice-icon {
	font-size: 22rpx;
	line-height: 22rpx;
	color: #D52F2C;
	width: 60rpx;
	height: 36rpx;
	border-radius: 6rpx;
	background: rgba(213,47,44,0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10rpx;
	flex-shrink: 0;
}
.notice-info {
	width: calc(100% - 70rpx);
	overflow: hidden;
	white-space: nowrap;
}
.notice-mask {
	position: absolute;
	right: 0;
	top: -7rpx;
	bottom: -7rpx;
	width: 70rpx;
	height: 50rpx;
	background: linear-gradient(-90deg, #F6F6F6, rgba(246, 246, 246, 0.36));
}
.recommend-box {
	width: calc(100% - 48rpx);
	margin: 0 auto 40rpx;
}
.recommend-icon {
	width: 36rpx;
	height: 18rpx;
}
.recommend-content {
	display: flex;
	flex-wrap: wrap;
}
.recommend-list {
	width: 340rpx;
	background-color: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
}
.recommend-img {
	width: 100%;
}
.recommend-info {
	padding: 18rpx 24rpx;
}
.recommend-name {
     overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
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
 