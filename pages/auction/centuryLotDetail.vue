<template>
	<view class="goods-detail">
		<view class="cu-bar search">
			<view class="action">
				<image @click="back()" src="../../static/img/icon/goods-back@2x.png" mode="" class="m-icon"></image>
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
		<view class="auction-goods-time flex-between ac">
			<view class="dflex fdc ai-fs">
				<view class="dflex ai-fe mb14">
					<view class="fs-32 lh-32 fc-f mb4">￥</view>
					<view class="fs-48 lh-48 fc-f fw-b">{{lotObj.auctionLotOutPrice}}</view>
				</view>
				<view class="fs-24 lh-34 fc-f op6 td-lt ml4"></view>
			</view>
		
		</view>
		<view class="container">
			<view class="goods-main">
		
				<view>
					<view class="goods-label mr16" v-if="goodsDetail.goodsBrandName">{{goodsDetail.goodsBrandName}}</view>
					<text class="fs-32 lh-48 fc-303 fw-b">{{goodsDetail.goodsTitle}}</text>
				</view>
				<view class="fs-28 lh-40 fc-606 mt16" v-if="goodsDetail.goodsSubTitle">{{goodsDetail.goodsSubTitle}}</view>
				<!-- <view class="flex-between ac">
					<view class="fs-24 lh-34 fc-939">关注：{{lotObj.auctionLotFollow}}</view>
					<view class="fs-24 lh-34 fc-939">库存：{{lotObj.auctionLotStock}}</view>
				</view> -->
			</view>
			<view class="goods-auction dflex fdc ai-fs mb12">
				<view class="dflex ac">
					<view class="fs-26 lh-36 fc-303 w148 mr32">拍品编号：</view>
					<view class="fs-26 lh-36 fc-606">{{lotObj.lotId}}</view>
				</view>
			</view>
			<view class="goods-content">
				<view class="parameter-box" v-if="goodsTab.length>0">
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
					<view class="detail-video">
						<video  id="myVideo" style="width: 100%;height: 400rpx;"  :src="goodsDetail.goodsVideoUrl"></video>
					</view>
				</view>
				<!-- 商品参数-->
				<view class="detail-box" id="param-box" v-if="goodsDetail.goodsAttrList&&goodsDetail.goodsAttrList.length">
					<view class="detail-title dflex ac">
						<view class="title-icon"></view>
						<view class="fs-24 lh34 fc-303 fw-b">商品参数</view>
					</view>
					<view class="detail-main" >
						<view class="main-parameter">
							<view class="parameter-list" v-for="(item,index) in goodsDetail.goodsAttrList" :key="index">
								<view class="parameter-title">{{item.goodsAttrName}}</view>
								<view class="parameter-info">{{item.goodsAttrValue}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 商品详情 -->
				<view class="detail-box" id="desc-box" v-if="goodsDetail.goodsDesc!=null">
					<view class="detail-title dflex ac">
						<view class="title-icon"></view>
						<view class="fs-24 lh34 fc-303 fw-b">商品详情</view>
					</view>
					<view class="detail-content">
						<rich-text :nodes="goodsDetail.goodsDesc"></rich-text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<view class="cu-bar bg-white border shop">
			<button class="action" @tap="customerAlert=true">
				<image class="m-icon" src="../../static/img/icon/user-index-icon4@2x.png"></image> 客服
			</button>
			<view class="action" @click="followLot">
				<view v-if="isFollowLot" class="dflex fdc ac">
					<image  src="../../static/img/icon/collection@2x.png" mode="" class="m-icon"></image>已关注 
				</view>
				<view v-else class="dflex fdc ac">
					<image src="../../static/img/icon/collect@2x.png" mode="" class="m-icon"></image> 关注
				</view>
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-pp fc-f round" v-show="auction.auctionStatus===1 && !lotObj.lock" @click="secKillLot">立即购买</button>
				<button class="cu-btn m-bg-pp-unclick fc-f round" v-show="auction.auctionStatus!==1 || lotObj.lock" >立即购买</button>
			</view>
		</view>
		<customer :show="customerAlert" @cancel="customerAlert=false"></customer>
	</view>
</template>

<script>
	import customer from 'pages/component/customer.vue';
	export default {
		components: {
			customer
		},
		data() {
			return {
				lotId:"",
				auctionId:"",
				lotSellerName:"",
				countDownStr:"",
				countDownArr: ['00','00','00'],
				vipCoupon: false,
				customerAlert: false,
				isFollowLot: false,
				lotObj:{},
				auction:{},
				goodsId:"",
				timerId:"",
				swiperList: [],
				goodsDetail:{goodsDesc:[],goodsAttrList:[]},
				dotStyle: false,
				player:{},
				current:1,
				videoShow:true,
				goodsTabCur:0,
				goodsTab:[]
			}
		},
		onLoad (e) {
			this.goodsId = e.goodsId || "800000041"
			this.lotId = e.lotId || "800000041-3"
			this.auctionId = e.auctionId || "130"
			
		},
		onShow () {
			this.player = uni.createVideoContext('myVideo')
			this.getGoodsDetail()
			this.getLot()
		},
		onPullDownRefresh() {
			setTimeout(uni.stopPullDownRefresh,500)
			this.getGoodsDetail()
			this.getLot()
		},
		beforeDestroy() {
			clearInterval(this.timerId)
		},
		beforeRouteLeave() {
			clearInterval(this.timerId)
		},
		methods: {
			getLot() {
				uni.$api.getLot({lotId:this.lotId,auctionId:this.auctionId}).then(res => {
					this.lotObj = res.data
					this.lotObj.lock = uni.$session.checkLotId(this.auctionId,this.lotObj.auctionLotAutoId)
					this.isFollowLot = res.isFollowLot
					this.lotSellerName = res.lotSellerName
					this.vipCoupon = res.vipCoupon
					if(res.auction){
						this.auction =  res.auction
						this.nowTime = parseInt(res.nowTime)
					}
					
				})
			
			},
			countDown(){
				if(!this.auction.auctionBeginTime){
					return
				}
				let beginTime = new Date(this.auction.auctionBeginTime.replace(/\-/g,'/')).getTime()
				if(this.vipCoupon){
					beginTime -= 60000
				}
				const endTime = new Date(this.auction.auctionEndTime.replace(/\-/g,'/')).getTime()
				const _this = this
				if(this.timerId){
					clearInterval(this.timerId)
					this.timerId = 0
				}
				this.timerId = setInterval(()=>{
					_this.nowTime += 1000
					if(_this.nowTime>beginTime && _this.nowTime<=endTime){
						_this.countDownStr =  uni.$utils.date.countDown(_this.nowTime,endTime)
						_this.countDownArr = _this.countDownStr.split(":")
						_this.auction.auctionStatus = 1
					}else if(_this.nowTime<=beginTime){
						_this.countDownStr =  uni.$utils.date.countDown(_this.nowTime,beginTime)
						_this.countDownArr = _this.countDownStr.split(":")
					}else {
						_this.auction.auctionStatus = 2
						_this.countDownStr = ''
						_this.countDownArr = ['00','00','00']
						clearInterval(_this.timerId)
					}
					
				},1000)
			},
			goodsTabClick (tabId) {
				this.goodsTabCur = tabId
				var cssId = this.goodsTab[tabId-1].cssId
				uni.createSelectorQuery().select("#"+cssId).boundingClientRect((res)=>{//最外层盒子节点
				　　　　uni.pageScrollTo({
				　　　　　　duration:200,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
				　　　　　　scrollTop:res.top,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
				　　　　})
				　　}).exec()
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
						this.handlerGoodsData(res.data)
					}
				}).catch(res => {
					uni.$toast.showError(res.message)
				})
			},
			handlerGoodsData (goodsDetail) {
				if(goodsDetail.goodsDesc){
				goodsDetail.goodsDesc = uni.$utils.formatRichTextImage(goodsDetail.goodsDesc)
				}
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
				this.goodsTabCur = tabs[0]?.id
				this.goodsTab = tabs
			},
			followLot(){
				uni.$api.followLot({auctionLotAutoId:this.auctionId+'-'+this.lotId}).then(res => {
					uni.$toast.showSuccess('操作成功')
					const lot = this.lotObj
					this.isFollowLot = !this.isFollowLot
					if(this.isFollowLot){
						lot.auctionLotFollow ++
					}else{
						lot.auctionLotFollow --
					}
				})
			},
			secKillLot(){
				if(!this.btnloading){
				  this.btnloading = true 
				  const _this = this
				  setTimeout(()=>_this.btnloading = false,500)
				}else{
					// uni.$toast.showError('操作过快啦')
					return
				}
				uni.$api.buyCenturyLot({auctionId: this.auctionId,
				lotId: this.lotObj.lotId}).then(res=>{
					uni.$toast.showSuccess('抢购成功')
					uni.$session.lockLotId(this.auctionId,this.lotObj.auctionLotAutoId)
					this.lotObj.lock = true
					setTimeout(()=>{uni.navigateTo({
						url:'/pages/order/orderpay?orderId='+res.orderId
					})},500)
					
				}).catch(e=>{
					uni.$toast.showError(e.message)
				}).finally(()=>{
					setTimeout(uni.hideToast,3000)
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
.auction-goods-time {
	width: 100%;
	height: 136rpx;
	background: url(../../static/img/bg/auction-goods-time@2x.png) no-repeat;
	background-size: 100% 100%;
	padding-left: 32rpx;
	padding-right: 40rpx;
}
.auction-time {
	width: 40rpx;
	height: 40rpx;
	border-radius: 8rpx;
	background-color: #fff;
	color: #FF411C;
	font-size: 24rpx;
	line-height: 24rpx;
	display: flex;
	justify-content: center;
	align-items: center;
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
.goods-auction {
	width: 100%;
	height: 76rpx;
	background: #fff;
	border-radius: 20rpx;
	padding: 0 24rpx;
}
.goods-auction > view {
	height: 100%;
}
.w148 {
	width: 148rpx;
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
