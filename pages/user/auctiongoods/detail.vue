<template>
	<view>
		<image src="../../../static/img/bg/order-detail-bg@2x.png" class="goods-index-bg" mode="widthFix"></image>
		<view style="height: 60rpx;"></view>
		<view class="flex-between ac pl32 pr32 auction-title-box">
			<view class="back-btn" @tap="goBack">
				<text class="cuIcon-back fc-f"></text>
			</view>
			<!-- 4种状态 -->
			<view class="flex-center fdc auction-title-info" v-if="(lotObj.lotStatus!==3) && (lotObj.lotHangupStatus===0 || lotObj.lotHangupStatus===3)">
				<view class="fs-36 lh-50 fc-f fw-b mb4">已拍下</view>
				<view class="fs-24 lh-34 fc-f"><text class="op75">您可以选择转拍或自用</text></view>
			</view>
			<view class="flex-center fdc auction-title-info" v-if="auctionLot.auctionLotHangupStatus===4">
				<view class="fs-36 lh-50 fc-f fw-b mb4">已拍出</view>
				<view class="fs-24 lh-34 fc-f"><text class="op75">您的拍品已拍出</text></view>
			</view>
			<view class="flex-center fdc auction-title-info" v-if="lotObj.lotHangupStatus===1">
				<view class="fs-36 lh-50 fc-f fw-b mb4">转拍中 - 申请挂拍</view>
				<view class="fs-24 lh-34 fc-f"><text class="op75">等待拍卖人员的审核</text></view>
			</view>
			<view class="flex-center fdc auction-title-info" v-if="lotObj.lotStatus===2&&lotObj.lotHangupStatus===2">
				<view class="fs-36 lh-50 fc-f fw-b mb4">转拍中</view>
				<view class="fs-24 lh-34 fc-f"><text class="op75">{{lotObj.lotHangupStatusStr}}</text></view>
			</view>
			<view class="flex-center fdc auction-title-info" v-if="lotObj.lotStatus===3">
				<view class="fs-36 lh-50 fc-f fw-b mb4">留下自用</view>
				<view class="fs-24 lh-34 fc-f"><text class="op75">{{lotObj.lotHangupStatusStr}}</text></view>
			</view>
		</view>
		<view class="container">
			<view class="order-info">
				<view class="goods-info">
					<image :src="lotObj.lotImage" mode="" class="goods-image"></image>
					<view class="wp100 dflex fdc">
						<view class="dflex fdc jc-fs goods-msg">
							<view class="goods-name mb12">{{lotObj.lotName}}</view>
							<view class="fs-20 lh-28 fc-939"></view>
						</view>
						<view>
							<text class="fs-22 fc-606">拍入价：</text>
							<text class="fs-24 fc-303 fw-b">￥</text>
							<text class="fs-28 fc-303 fw-b">{{lotObj.lotInPrice | intFormat}}</text>
							<text class="fs-20 fc-303">{{lotObj.lotInPrice | decimalFormat}}</text>
						</view>
						<view class="dflex ai-fe mt10" v-if="auctionLot.auctionLotHangupStatus===4">
							<view class="fs-20 lh-28 fc-303">拍出价：</view>
							<view class="fs-24 fc-e31 fw-b">￥</view>
							<view class="fs-28 lh-28 fc-e31 fw-b mb2">{{auctionLot.auctionLotOutPrice| intFormat}}</view>
							<view class="fs-20 fc-e31">{{auctionLot.auctionLotOutPrice | decimalFormat}}</view>
						</view>
					</view>
				</view>
				<view class="dflex jc-end ai-fe mt30" v-if="auctionLot.lotUserEarnMoney">
					<view class="fs-20 lh-28 fc-303">竞拍收入：</view>
					<view class="fs-24 fc-e31 fw-b">￥</view>
					<view class="fs-32 lh-32 fc-e31 fw-b">{{auctionLot.lotUserEarnMoney | intFormat}}</view>
					<view class="fs-20 fc-e31">{{auctionLot.lotUserEarnMoney | decimalFormat}}</view>
				</view>
			</view>
			<!-- 已拍下 -->
			<view class="order-info-box" v-for="item in lotLogs" :key="item.auctionLotAutoId" >
				<view class="fs-28 lh-40 fw-b fc-303 mb32" v-once>挂拍记录</view>
				<view class="flex-between ac">
					<view class="fs-32 lh-36 fw-b fc-303">{{item.no}}</view>
					<view class="fs-24 lh-34 fc-939">{{item.auctionLotHangupStatusStr}}</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">挂拍价</view>
					<view class="dflex ai-fe">
						<view class="fs-24 fc-e31">￥</view>
						<view class="fs-32 lh-32 fc-e31 fw-b">{{item.auctionLotOutPrice}}</view>
						<view class="fs-20 fc-e31"></view>
					</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">场次</view>
					<view class="dflex ac">
						<view class="fs-24 lh-34 fc-303 mr8">{{item.auctionName}}</view>
						<view class="fs-24 lh-34 fc-303"></view>
					</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">开拍时间</view>
					<view class="fs-24 lh-34 fc-303">{{item.auctionBeginTime}}</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">佣金</view>
					<view class="fs-24 lh-34 fc-303">￥{{item.auctionLotDepositMoney}}</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">缴纳时间</view>
					<view class="fs-24 lh-34 fc-303">{{item.auctionLotDepositTime}}</view>
				</view>
			</view>
			<view class="order-info-box">
				<view class="fs-28 lh-40 fw-b fc-303">拍品信息</view>
				<view class="info-list" v-if="auctionLot.address">
					<view class="fs-24 lh-34 fc-303 fs-0">收货地址</view>
					<view class="dflex jc-fs fdc">
						<view class="fs-24 lh-34 fc-303">{{auctionLot.address.addressContacts}}（{{auctionLot.address.addressMobile}}）</view>
						<view class="fs-24 fc-303 lh-36 mt8">{{auctionLot.address.addressAllName}}</view>
					</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">订单编号</view>
					<view class="fs-24 lh-34 fc-303">{{lotObj.lotOrderId}}</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">拍品编号</view>
					<view class="fs-24 lh-34 fc-303">{{lotObj.lotId}}</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303 ">拍入时间</view>
					<view class="fs-24 lh-34 fc-303">{{lotObj.lotInTime}}</view>
				</view>
			
				<view class="info-list" v-show="lotObj.lotHangupStatus===3">
					<view class="fs-24 lh-34 fc-303 ">流拍时间</view>
					<view class="fs-24 lh-34 fc-303">{{lotObj.lotAuctionEndTime}}</view>
				</view>
				
				<view class="info-list" v-if="auctionLot.orderPayTime">
					<view class="fs-24 lh-34 fc-303">付款时间</view>
					<view class="fs-24 lh-34 fc-303">{{auctionLot.orderPayTime}}</view>
				</view>
				<view class="info-list" v-if="auctionLot.orderExpressCreateTime">
					<view class="fs-24 lh-34 fc-303 ">发货时间</view>
					<view class="fs-24 lh-34 fc-303">{{auctionLot.orderExpressCreateTime}}</view>
				</view>
				<view class="info-list" v-if="auctionLot.orderEndTime">
					<view class="fs-24 lh-34 fc-303">完成时间</view>
					<view class="fs-24 lh-34 fc-303">{{auctionLot.orderEndTime}}</view>
				</view>
			</view>
			<view class="order-info-box" v-if="lotObj.lotHangupStatus===1">
				<view class="fs-28 lh-40 fw-b fc-303">申请拍卖信息</view>
				<view class="info-list" >
					<view class="fs-24 lh-34 fc-303 ">申请挂拍场次时间</view>
					<view class="fs-24 lh-34 fc-303" v-if="lotObj.lotAuctionAppTime">{{lotObj.lotAuctionAppTime.replace('00:00:00','')}}</view>
				</view>
				<view class="info-list" >
					<view class="fs-24 lh-34 fc-303 ">挂拍价</view>
					<view class="fs-24 lh-34 fc-303">￥{{lotObj.lotOutPrice}}</view>
				</view>
				<view class="info-list" >
					<view class="fs-24 lh-34 fc-303 ">佣金</view>
					<view class="fs-24 lh-34 fc-303">￥{{lotObj.lotDepositMoney}}</view>
				</view>
				<view class="info-list" >
					<view class="fs-24 lh-34 fc-303 ">佣金预缴时间</view>
					<view class="fs-24 lh-34 fc-303">    {{lotObj.lotDepositTime}}</view>
				</view>
				</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<view class="cu-bar bg-white tabbar border order-box">
			<button class="cu-btn line-btn fc-303 round mr24" @tap="customerAlert=true">联系商家</button>
			<button class="cu-btn line-btn fc-303 round mr24" v-if="(lotObj.lotStatus===1|| (lotObj.lotHangupStatus===3 && lotObj.lotStatus !==3)) && (lotObj.lotHangupStatus!==1 && lotObj.lotHangupStatus!==2)" @tap="toAddress">留下自用</button>
			<button class="cu-btn line-btn fc-303 round mr24" v-if="lotObj.lotSecondStatus == 1" @tap="toLogistics">查看物流</button>
			<button class="cu-btn bg-pp fc-f round ml24" v-if="lotObj.lotSecondStatus == 1" @click.stop="confirmPackage">确认收货</button>
			<button class="cu-btn bg-pp fc-f round" v-if="lotObj.lotStatus===1&& (lotObj.lotHangupStatus!==1 && lotObj.lotHangupStatus!==2 && lotObj.lotHangupStatus!==3)" @tap="toPubLot">转拍</button>
			<button class="cu-btn bg-pp fc-f round" v-if="lotObj.canPut" @tap="toPubLot">转拍</button>
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
				lotId:'',
				lotObj:{},
				auctionLot:{},
				lotLogs:[],
				addressList:[],
				showAddress:false,
				customerAlert:false,
			}
		},
		onLoad(option) {
			this.lotId = option.lotId ||'199-1'
			this.auctionLotAutoId = option.auctionLotAutoId 
		},
		onShow() {
			this.getAuctionLot()
			this.getAuctionLotsLog()
		},
		onPullDownRefresh() {
			this.getAuctionLot()
			this.getAuctionLotsLog()
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},			
			toLogistics(){
				uni.navigateTo({
					url:'/pages/order/logistics?orderId='+this.lotObj.lotOrderId
				})
			},
			confirmPackage() {
				uni.$toast.confirm('确认收货吗').then(()=>{
					uni.$api.confirmPackage({
						orderId:this.lotObj.lotOrderId
					}).then(res => {
						if (res.success) {
							uni.$toast.showToast("收货成功")
							this.getAuctionLot()
						}
					})
				})
			},
			getAuctionLot(){
				uni.$api.getAuctionLot({lotId:this.lotId,auctionLotAutoId:this.auctionLotAutoId}).then(res => {
					this.lotObj = res.data
					this.lotObj.canPut = res.canPut || false
					this.auctionLot = res.auctionLot||{}
				})
			},
			toPubLot(){
				uni.navigateTo({
					url:'/pages/order/addauction?lotId='+this.lotId
				})
			},
			toAddress(){
				uni.navigateTo({
					url:'/pages/order/logisticspay?orderId='+this.lotObj.lotOrderId
				})
			},
			getAuctionLotsLog(){
				uni.$api.getAuctionLotsLog({lotId:this.lotId}).then(res => {
					let len = res.rows.length
					this.lotLogs = res.rows.map(e=>{
						e.no = len<9?('0'+len):len
						len -- 
						return e
					})
				})
				
			}
		}
	}
</script>

<style>

page {
	background: #F6F6F6;
}
.goods-index-bg {
	position: absolute;
	z-index: 0;
	width: 100%;
	top: 0;
	left: 0;
}
.auction-title-box {
	z-index: 1;
	position: relative;
	padding: 12rpx 20rpx 12rpx 24rpx;
}
.back-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.auction-title-info {
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	top: 0;
	bottom: 0;
	z-index: -1;
}
.container {
	margin-top: 40rpx; 
	padding: 20rpx;
	background: #F6F6F6;
	border-radius: 20px 20px 0px 0px;
	position: relative;
	z-index: 1;
}
.order-info {
	padding: 20rpx;
	background: #fff;
	border-radius: 20rpx;
}
.goods-info {
	display: flex;
	align-items: flex-start;
}
.goods-image {
	width: 180rpx;
	height: 180rpx;
	border-radius: 12rpx;
	flex-shrink: 0;
	margin-right: 20rpx;
}
.goods-msg {
	height: 146rpx;
}
.goods-name {
	font-size: 26rpx;
	color: #303133;
	text-align: left;
	line-height: 40rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;    
	-webkit-line-clamp: 2;    
	overflow: hidden;
}
.discount-icon {
	width: 32rpx;
	height: 32rpx;
	background: #FF411C;
	border-radius: 8rpx;
	font-size: 22rpx;
	color: #fff;
}
.order-info-box {
	background: #FFFFFF;
	opacity: 1;
	border-radius: 10px;
	padding: 20rpx;
	margin-top: 20rpx;
}
.info-list {
	display: flex;
	align-items: flex-start;
	margin-top: 24rpx;
}
.info-list > view:first-child {
	width: 204rpx;
}
.order-box {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	min-height: 100rpx;
	padding-bottom: env(safe-area-inset-bottom);
	justify-content: flex-end;
	padding-right: 32rpx;
	z-index: 2;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
}
</style>
