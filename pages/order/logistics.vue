<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">查看物流</block>
		</cu-custom>
		<view class="container">
			<view class="address-box mb20">
				<view class="dflex ac pt20 pl20 pr20">
					<image :src="domainStatic+'/img/icon/address-icon@2x.png'" mode="" class="address-icon mt4 mr20">
					</image>
					<view class="dflex fdc jc-fs">
						<view class="dflex ai-fe mb8">
							<view class="fs-36 fc-303 fw-b lh-50 mr16">{{orderAddress.addressContacts}}</view>
							<view class="fs-28 fc-939 lh-40 mb4">{{orderAddress.addressMobile}}</view>
						</view>
						<view class="fs-26 lh-40 fc-939">{{orderAddress.addressAllName}}</view>
					</view>
				</view>
			</view>
			<view class="logistics-box">
				<view class="cu-timeline">
					<view class="cu-time cu-time-title">
						<text class="fs-28 fc-303 fw-b">{{expressCompany}}</text> <text
							class="fs-28 lh-40 fc-939 content ml48">{{orderExpress.orderExpressNumber}}</text>
					</view>
					<view v-for="(item,index) in expressArr" class="cu-item" :class="index==0?'cuIcon-roundcheckfill text-ff4':'cuIcon-title text-939'">
						<view class="bg-f content">
							<view class="static">
								<text class="fs-28 fw-b lh-40 mr24" v-if="item.status!='在途'">已{{item.status}}</text><text class="fs-24 lh-32">{{item.ftime}}</text>
								<view class="fs-26 lh-44 static-info">
									{{item.context}}
								</view>
							</view>
						</view>
					</view>
					<view class="cu-item text-939 cuIcon-roundcheckfill" v-if="orderExpress.orderExpressCreateTime">
						<view class="bg-f content">
							<view class="static">
								<text class="fs-28 fw-b lh-40 mr24">已发货</text><text class="fs-24 lh-32">{{orderExpress.orderExpressCreateTime}}</text>
								<view class="fs-26 lh-44 static-info">
									包裹正在等待揽收
								</view>
							</view>
						</view>
					</view>
					<view class="cu-item text-939 cuIcon-roundcheckfill">
						<view class="bg-f content">
							<view class="static">
								<text class="fs-28 fw-b lh-40 mr24">已下单</text><text class="fs-24 lh-32">{{orderPayTime}}</text>
								<view class="fs-26 lh-44 static-info">
									商品已下单
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: "",
				orderAddress: {},
				orderExpress: {},
				expressArr: [],
				orderPayTime: "",
				expressCompany:"",
				domainStatic:this.domainStatic,
			}
		},
		onLoad(e) {
			var orderId = e.orderId
			this.orderId = orderId
			this.getExpressList()
			this.getOrderAddress()
		},
		methods: {
			getExpressList() {
				var param = {
					orderId: this.orderId
				}
				//orderExpressCreateTime 下单
				uni.$api.getOrderExpressList(param).then(res => {
					var {orderExpress,orderPayTime,expressCompany} = res.data
					this.orderExpress =orderExpress
					this.orderPayTime =orderPayTime
					this.expressCompany = expressCompany
					var express = JSON.parse(this.orderExpress.orderExpressDataJson)
					this.expressArr = express.data
				})
			},
			getOrderAddress() {
				var param = {
					orderId: this.orderId
				}
				//orderExpressCreateTime 下单
				uni.$api.getOrderAddress(param).then(res => {
					var {orderAddress} = res.data
					this.orderAddress = orderAddress
				})
			}
			
		}
	}
</script>

<style>
	.container {
		padding: 8rpx 20rpx;
		padding-bottom: calc(24rpx + );
	}

	.address-box {
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.logistics-tips {
		width: 100%;
		height: 44rpx;
		font-size: 20rpx;
		color: #FF411C;
		background: #FFEFEC;
	}

	.address-icon {
		width: 64rpx;
		height: 74rpx;
		flex-shrink: 0;
	}

	.container {
		padding: 8rpx 20rpx;
	}

	.address-box {
		padding: 0 0 20rpx;
	}

	.cu-timeline .cu-time.cu-time-title {
		width: 100%;
		text-align: left;
		padding: 20rpx 36rpx;
	}

	.text-ff4 {
		color: #FF411C;
	}

	.text-939 {
		color: #939399;
	}

	.cu-timeline>.cu-item {
		padding: 30rpx 30rpx 4rpx 120rpx;
	}

	.cu-timeline>.cu-item>.content {
		padding: 8rpx 0;
	}

	.cu-timeline>.cu-item>.content>.static {
		color: #939399;
	}

	.cu-timeline>.cu-item>.content>.static>.static-info {
		color: #939399;
	}

	.cu-timeline>.cu-item>.content>.static.success {
		color: #FF411C;
	}

	.cu-timeline>.cu-item>.content>.static.success>.static-info {
		color: #303133;
	}

	.cu-timeline>.cu-item:last-child::after {
		height: 42%;
	}
</style>
