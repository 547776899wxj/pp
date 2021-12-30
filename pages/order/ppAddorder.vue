<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">确认订单</block>
		</cu-custom>
		<view class="container">
			<view class="address-box mb20" v-if="orderAddress" @click.stop="showAddressList">
				<view class="flex-center logistics-tips" v-if="order.orderOtherMoney > 0">配送至{{getExpressAreaName(orderAddress.addressAreaString)}}需添加运费</view>
				<view class="flex-between ac p20">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/address-icon@2x.png'" mode="" class="address-icon mt4 mr20"></image>
						<view class="dflex fdc jc-fs">
							<view class="dflex ai-fe mb8">
								<view class="fs-36 fc-303 fw-b lh-50 mr16">{{orderAddress.addressContacts}}</view>
								<view class="fs-28 fc-939 lh-40 mb4">{{orderAddress.addressMobile}}</view>
							</view>
							<view class="fs-26 lh-40 fc-939">{{orderAddress.addressAllName}}</view>
						</view>
					</view>
					<image :src="domainStatic+'/img/icon/reload.png'" mode="" class="m-icon fs-0 ml34"></image>
				</view>
			</view>
			<view v-else class="remark-list flex-between ac mb20" @click.stop="toAddress()">
				<view class="fs-28 fc-303 fw-b">选择收货地址</view>
				<image :src="domainStatic+'/img/icon/arrow@3x.png'" mode="" class="more-icon"></image>
			</view>
			
			<view class="order-info">
				<!-- 订单详情列表 -->
				<view class="goods-info">
					<image :src="data.goodsImage" mode="" class="goods-image"></image>
					<view class="wp100 goods-msg flex-between fdc">
						<view class="dflex fdc jc-fs">
							<view class="goods-name mb12">{{data.goodsTitle}}</view>
							<view class="fs-20 lh-28 fc-939">123</view>
						</view>
						<view class="flex-between ai-fe">
							<view><text class="fs-24 fc-303">￥</text><text class="fs-28 fc-303">{{getMoneyForYuan(item.orderDetailPrice)}}</text><text class="fs-20 fc-303">{{getMoneyForFen(item.orderDetailPrice)}}</text></view>
							<view class="fs-22 lh-32 fc-606">x{{item.orderDetailNumber}}</view>
						</view>
					</view>
				</view>
			</view>
			
		
			
			
			<view class="remark-list flex-between ac" @click.stop="showOrderRemark = true ">
				<view class="fs-28 fc-303 fw-b">备注</view>
				<view class="flex justify-end">
					<view>{{userMessage}}</view>
					<image :src="domainStatic+'/img/icon/arrow@3x.png'" mode="" class="more-icon"></image>
				</view>
				
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border submit-box">
			<view class="action">
				<view class="dflex ac">
					<view class="fs-20 lh-28 fc-303 mt8">合计：</view>
					<view class="dflex ai-fe fw-b">
						<view class="fs-24 fc-e31 mb6">￥</view>
						<view class="fs-48 lh-48 fc-e31">{{getMoneyForYuan(order.orderPayMoney)}}</view>
						<view class="fs-28 fc-e31 mb6">{{getMoneyForFen(order.orderPayMoney)}}</view>
					</view>
				</view>
			</view>
			<button class="cu-btn bg-pp fc-f round" @click="addOrder">提交订单</button>
		</view>
		<remarkComponents :show="showOrderRemark" :remark="userMessage" @confirm="getRemark" @cancel="remarkCancel"></remarkComponents>
		<changeAddress :show="showAddress" :addressList="addressList" @choose="chooseAddress" @cancel="showAddress = false"></changeAddress>
	</view>
</template>

<script>
	
	import remarkComponents from 'pages/component/remark.vue';
	import changeAddress from 'pages/component/changeaddress.vue';
	
	export default {
		data() {
			return {
				goodsId:"",
				details:[],
				discountMoneys:[],
				addressList:[],
				order:{},
				addressId:"",
				orderAddress:{},
				showOrderRemark:false,
				showAddress:false,
				userMessage:"",//订单备注
				domainStatic:this.domainStatic,
			}
		},
		components:{
			remarkComponents,
			changeAddress
		},
		onLoad() {
			this.data = uni.getStorageSync('ppAddorderData');
			console.log(this.data);
		},
		onShow() {
			this.getAllAddress()
		},
		methods: {
			showAddressList () {
				this.setAddressCheck()
				this.showAddress = true
			},
			setAddressCheck () {
				for (var i in this.addressList) {
					if (this.addressId == this.addressList[i].addressId) {
						this.addressList[i]['checked'] = true
					} else {
						this.addressList[i]['checked'] = false
					}
				}
			},
			getAllAddress () {
				uni.$api.getAllAddress().then(res=>{
					if (res.success) {
						this.addressList = res.rows || []
						console.log(this.addressList);
						if(this.addressList.length >0){
							this.orderAddress = this.addressList[0]
						}
						this.setAddressCheck()
					}
				})
			},
			chooseAddress (e) {
				this.addressId = e.addressId
				this.showAddress = false
			},
			remarkCancel () {
				this.showOrderRemark = false
			},
			getRemark (e) {
				this.showOrderRemark = false
				this.userMessage = e
			},
			toAddress () {
				uni.navigateTo({
					url:"/pages/user/address?needBackAddressId="+true
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
			addOrder () {
				var params = {
					goodsId:this.goodsId,
					payId:210,
					ruleId:"app_pp_goods_first_pay",
					addressId:this.addressId,
					userMessage:this.userMessage
				}
				uni.$api.addOrderData(params).then(res => {
					if (res.success) {
						if (res.data.orderPlanPayMoney == 0) {
							uni.$toast.alert("购买成功")
							setTimeout(function () {
								uni.switchTab({
									url:"/pages/order/order"
								})
							},1000)
						} else {
							uni.navigateTo({
								url:"/pages/order/pay?orderId="+res.data.orderId
							})
						}
					}
				})
			},
			getExpressAreaName (areaString) {
				if (areaString.indexOf("-") >= 0) {
					return areaString.substring(0,areaString.indexOf("-"))
				}
				return areaString
			}
		}
	}
</script>

<style>
page {
	background-color: #f6f6f6;
}
.container {
	padding: 8rpx 20rpx;
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
.remark-list {
	width: 100%;
	height: 90rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 0 20rpx;
	margin-top: 20rpx;
}
.more-icon {
	width: 30rpx;
	height: 30rpx;
}
.cu-bar.tabbar.submit-box {
	padding:  0 32rpx;
	position: fixed;
	bottom: 0;
	width: 100%;
	min-height: 100rpx;
	padding-bottom: env(safe-area-inset-bottom);
}
.submit-box .cu-btn {
	width: 240rpx;
	height: 76rpx;
	margin: 0;
}
.address-box {
	background-color: #fff;
	border-radius: 20rpx;
	overflow: hidden;
}
.address-icon {
	width: 64rpx;
	height: 74rpx;
	flex-shrink: 0;
}
.address-operation {
	height: 64rpx;
	padding: 0 20rpx;
	border-top: 2rpx solid #f7f7fa;
}
.delete-icon {
	padding: 10rpx 0 10rpx 10rpx;
}
.logistics-tips {
	width: 100%;
	height: 44rpx;
	font-size: 20rpx;
	color: #FF411C;
	background: #FFEFEC;
}
</style>
