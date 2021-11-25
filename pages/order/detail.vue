<template>
	<view>
		<image src="/static/img/bg/order-detail-bg@2x.png" class="goods-index-bg" mode="widthFix"></image>
		<!-- <view style="height: 60rpx;"></view>		 -->
		<cu-custom bgImage="bgunset" :isBack="true" backMethod="backHandle2">
			<block slot="backText"></block>
			<block slot="content">
				<text>{{order.orderStatusName}}</text>
			</block>
		</cu-custom>
		<view class="flex-between ac pl32 pr32 auction-title-box">
			<!-- 3种状态 -->
			<view class="flex-center fdc auction-title-info" v-if="order.orderStatus == 0">
				<!-- <view class="fs-36 lh-50 fc-f fw-b mb4">等待买家付款</view> -->
				<view class="fs-24 lh-34 fc-f"><text class="op75">剩余支付时间：</text><text class="fw-b op100">
					{{hours > 0?hours+":":"00:"}}{{minute > 0?minute+":":"00:"}}{{second}}
				</text></view>
			</view>
			<view class="flex-center fdc auction-title-info" v-else-if="order.orderStatusSubTitleName">
				<view class="fs-24 lh-34 fc-f"><text class="op75">{{order.orderStatusSubTitleName}}</text></view>
			</view>
		</view>
		<view class="container">
			<view class="order-info">
				<view class="goods-info" v-for="(items,index) in details">					
					<image v-if="order.orderType == 41" src="../../static/img/images/blindbox.png" mode="" class="goods-image"></image>
					<image v-else :src="items.orderGoodsImage" mode="" class="goods-image"></image>
					<view class="wp100 goods-msg flex-between fdc">
						<view class="dflex fdc jc-fs">
							<view class="goods-name mb12">{{items.orderGoodsTitle}}</view>
							<view class="fs-20 lh-28 fc-939">{{items.orderGoodsSubTitle}}</view>
						</view>
						<view class="flex-between ai-fe">
							<view>
								<text class="fs-24 fc-303">￥</text>
								<text class="fs-28 fc-303">{{getMoneyForYuan(items.orderDetailPrice)}}</text>
								<text class="fs-20 fc-303">{{getMoneyForFen(items.orderDetailPrice)}}</text>
							</view>
							<view class="fs-22 lh-32 fc-606">x{{items.orderDetailNumber}}</view>
						</view>
					</view>
				</view>
				<view class="dflex jc-end ai-fe mt24">
					<view class="fs-20 lh-28 fc-303">小计：</view>
					<view class="fs-24 fc-303">￥</view>
					<view class="fs-28 lh-28 fc-303 mb2">{{getMoneyForYuan(order.orderMoney)}}</view>
					<view class="fs-20 fc-303">{{getMoneyForFen(order.orderMoney)}}</view>
				</view>
				<view class="flex-between ai-fs mt24" v-if="discounts.length>0" v-for="(items,index) in discounts">
					<view class="dflex ac">
						<view class="discount-icon flex-center mr8">{{getDiscountTagName(items)}}</view>
						<view class="fs-24 lh-24 fc-303">{{getDiscountTypeName(items)}}</view>
					</view>
					<view class="dflex jc-end ai-fe">
						<view class="fs-24 fc-e31">-￥</view>
						<view class="fs-32 lh-32 fc-e31">{{getMoneyForYuan(items.orderMoneyValue)}}</view>
						<view class="fs-20 fc-e31">{{getMoneyForFen(items.orderMoneyValue)}}</view>
					</view>
				</view>
				<view class="dflex jc-end ai-fe mt30">
					<view class="fs-20 lh-28 fc-303">{{order.orderPayStatus > 0? '实付款:':'订单金额:'}}：</view>
					<view class="fs-24 fc-e31">￥</view>
					<view class="fs-32 lh-32 fc-e31">{{getMoneyForYuan(order.orderPayMoney)}}</view>
					<view class="fs-20 fc-e31">{{getMoneyForFen(order.orderPayMoney)}}</view>
				</view>
			</view>
			<view class="order-info-box">
				<view class="fs-28 lh-40 fw-b fc-303">订单信息</view>
				<view class="info-list" v-if="orderAddress">
					<view class="fs-24 lh-34 fc-303 fs-0">收货地址</view>
					<view class="dflex jc-fs fdc">
						<view class="fs-24 lh-34 fc-303">{{orderAddress.addressContacts}}（{{orderAddress.addressMobile}}）</view>
						<view class="fs-24 fc-303 lh-36 mt8">{{orderAddress.addressAllName}}</view>
					</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303">订单编号</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderId}}</view>
				</view>
				<view class="info-list">
					<view class="fs-24 lh-34 fc-303 ">创建时间</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderCreateTime}}</view>
				</view>
				<view class="info-list" v-if="order.orderPayTime">
					<view class="fs-24 lh-34 fc-303">付款时间</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderPayTime}}</view>
				</view>
				<view class="info-list" v-if="order.orderExpressCreateTime">
					<view class="fs-24 lh-34 fc-303">发货时间</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderExpressCreateTime}}</view>
				</view>
				<view class="info-list" v-if="order.orderStatus == 120 && order.orderTimeOutConfirmTime">
					<view class="fs-24 lh-34 fc-303">收货超时时间</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderTimeOutConfirmTime}}</view>
				</view>
				
				<template v-if="order.orderType == 11 && order.orderStatus >= 200 && order.orderStatus < 300 && userBalanceLock">
					<view class="info-list" v-if="userBalanceLock.lockBreakTime">
						<view class="fs-24 lh-34 fc-303">违约时间</view>
						<view class="fs-24 lh-34 fc-303">{{userBalanceLock.lockBreakTime}}</view>
					</view>
					
					<view class="info-list">
						<view class="fs-24 lh-34 fc-303">违约金额</view>
						<view class="fs-24 lh-34 fc-303">{{userBalanceLock.lockMoney?userBalanceLock.lockMoney:0}}元</view>
					</view>
				</template>
				
				<view class="info-list" v-if="order.orderEndTime">
					<view class="fs-24 lh-34 fc-303">完成时间</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderEndTime}}</view>
				</view>
				<view class="info-list" v-if="order.orderMessage">
					<view class="fs-24 lh-34 fc-303 fs-0">备注</view>
					<view class="fs-24 lh-34 fc-303">{{order.orderMessage}}</view>
				</view>
				<!-- 盲盒 -->
				<template v-if="shopGamebox && order.orderPayStatus == 1">			
					<view class="info-list">
						<view class="fs-24 lh-34 fc-303 fs-0">盲盒内容</view>
						<view class="fs-24 lh-34 fc-303">
							<div v-for="item in gameboxItems">{{item.gameBoxItemMask}}&nbsp;&nbsp;{{item.gameBoxItemTypeStr}}&nbsp;&nbsp;1{{item.gameBoxItemTypeUnit}}</div>
						</view>
						
					</view>
				</template>
			</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<view class="cu-bar bg-white tabbar border order-box">
			<button class="cu-btn line-btn fc-303 round ml24" @click="showCustomer">联系商家</button>
			<!-- 待支付订单的按钮 -->
			<button class="cu-btn line-btn fc-303 round ml24" v-if="order.orderStatus == 0 && outPayTime > 0" @click="cancelOrder()">取消订单</button>
			<button class="cu-btn line-btn fc-303 round ml24" v-if="order.orderStatus == 0 && outPayTime > 0" @click="orderPay(order.orderId)">立即支付</button>
			
			<button class="cu-btn line-btn fc-303 round ml24" v-if="order.orderExpressCreateTime" @click="logistics(order.orderId)">查看物流</button>
			<button class="cu-btn bg-pp fc-f round ml24" v-if="order.orderStatus == 120" @click.stop="confirmPackage(order.orderId)">确认收货</button>
		</view>
		<customer :show="customerAlert" @cancel="hideModel"></customer>
	</view>
</template>

<script>
	
	import customer from 'pages/component/customer.vue';
	
	export default {
		data() {
			return {
				orderId:"",
				gameboxItems: [],
				shopGamebox: '',
				details: [],
				discounts: [],
				order: {},
				orderMessage: null,
				orderAddress: {},
				hours: 0,
				minute: 0,
				second: 0,
				orderPrice: 0,
				payTimeId:"",
				outPayTime:0,
				userBalanceLock:"",//违约
				customerAlert:false
			}
		},
		components:{
			customer
		},
		onLoad(e) {
			var orderId = e.orderId
			this.orderId = orderId
			this.from = e.from
		    uni.$once('backHandle2',this.backHandle)
			this.initPage()
		},
		watch:{
			outPayTime (value) {
				if (value > 0) {
					let h = parseInt(value/60/60)
					let last = value%3600
					let m = parseInt(last/60)
					let s = last % 60 + ""
					this.hours = h > 0?h:""
					this.minute = m > 0?m:""
					this.second = s.length > 1?s:"0"+s
				} else {
					this.hours = 0
					this.minute = 0
					this.second = 0
					clearInterval(this.payTimeId)
				}
			},
		},
		methods: {
			backHandle(){
				if(this.from){
					uni.switchTab({
						url:'/pages/order/order'
					})
				}else{
					uni.navigateBack()
				}
			},
			showCustomer () {
				this.customerAlert=true
			},
			hideModel () {
				this.customerAlert=false
			},
			/**
			 * 取消订单
			 * @param {Object} orderId
			 */
			cancelOrder () {
				var self = this
				uni.showModal({
					title:"温馨提示",
					content:"您是否要取消该笔订单吗?",
					cancelText:"否",
					confirmText:"是",
					success(res) {
						if (res.confirm) {
						    uni.$api.cancelOrder({
								orderId:self.orderId
							}).then(res => {
								if (res.success) {
									uni.$toast.showToast("取消成功")
									self.initPage()
								}
							})
						}
					}
				})
			},
			/**
			 * 立即付款
			 * @param {Object} orderId
			 */
			orderPay () {
				var orderId = this.orderId
				var orderType = this.order.orderType
				console.log("orderType:",orderType)
				
				if (orderType == 0) {
					uni.navigateTo({
						url:"/pages/order/pay?orderId="+orderId
					})
				}
				if (orderType == 11) {
					uni.navigateTo({
						url:"/pages/order/auctionpay?orderId="+orderId
					})
				}
				
				
			},
			back () {
				uni.navigateBack()
			},
			initPage () {
				var params = {
					orderId:this.orderId
				}
				uni.$api.getOrderDetail(params).then(res => {
					// console.log("订单详情接口返参:"+JSON.stringify(res))
					var {discounts,order,orderMessage,orderAddress,outPayTime,userBalanceLock} = res.data
					// this.details = details
					var dataList = res.data.details || []
					this.shopGamebox = res.data.shopGamebox || ''
					this.gameboxItems = res.data.gameboxItems || []
					this.details = dataList
					this.discounts = discounts
					this.order = order
					this.orderMessage = orderMessage
					this.orderAddress = orderAddress
					this.outPayTime = outPayTime
					this.userBalanceLock = userBalanceLock
					console.log("userBalanceLock:"+JSON.stringify(userBalanceLock))
					var self = this
					if (outPayTime > 0) {
						self.payTimeId = setInterval(function () {
							self.outPayTime -= 1
						},1000)
					}
				})
			},
			getMoneyForYuan(money) {
				if (!money) {
					return "0."
				}
				var m1 = money+""
				if (m1.indexOf(".")>=0) {
					return m1.substring(0,m1.lastIndexOf(".")+1)
				}
				return m1+"."
			},
			getMoneyForFen(money) {
				if (!money) {
					return "00"
				}
				var m1 = money+""
				if (m1.indexOf(".")>=0) {
					return m1.substring(m1.lastIndexOf(".")+1,m1.length)
				}
				return "00"
			},
			getDiscountTagName (discount) {
				switch (discount.orderMoneyType) {
					case "11":
						return "新";
				}
				return "";
			},
			getDiscountTypeName (discount) {
				switch (discount.orderMoneyType) {
					case "11":
						return "新人立减";
				}
				return "";
			},
			/**
			 * 确认收货
			 * @param {Object} orderId
			 */
			confirmPackage (orderId) {
				var self = this
				uni.showModal({
					title:"温馨提示",
					content:"确认收货吗",
					success(res) {
						if (res.confirm) {
						    uni.$api.confirmPackage({
								orderId:orderId
							}).then(res => {
								if (res.success) {
									uni.$toast.showToast("收货成功")
									self.initPage()
								}
							})
						}
					}
				})
			},
			logistics(orderId) {
				uni.navigateTo({
					url:'/pages/order/logistics?orderId='+orderId
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
	height: 180rpx;
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
	width: 144rpx;
}
.cu-bar.tabbar.order-box {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	min-height: 100rpx;
	padding: 0 32rpx;
	padding-bottom: env(safe-area-inset-bottom);
	justify-content: flex-end;
	padding-right: 32rpx;
	z-index: 2;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
}
</style>
