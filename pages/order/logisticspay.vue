<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">支付运费</block>
		</cu-custom>
		<view class="container">
			<view class="address-box mb20" v-if="orderAddress">
				<view class="flex-center logistics-tips" v-if="order.orderOtherMoney > 0">配送至{{getExpressAreaName(orderAddress.addressAreaString)}}需添加运费</view>
				<view class="flex-between ac p20">
					<view class="dflex ac">
						<image src="/static/img/icon/address-icon@2x.png" mode="" class="address-icon mt4 mr20"></image>
						<view class="dflex fdc jc-fs">
							<view class="dflex ai-fe mb8">
								<view class="fs-36 fc-303 fw-b lh-50 mr16">{{orderAddress.addressContacts}}</view>
								<view class="fs-28 fc-939 lh-40 mb4">{{orderAddress.addressMobile}}</view>
							</view>
							<view class="fs-26 lh-40 fc-939">{{orderAddress.addressAllName}}</view>
						</view>
					</view>
					<image @click.stop="showAddressList" src="/static/img/icon/reload.png" mode="" class="m-icon fs-0 ml34"></image>
				</view>
			</view>
			<view v-else class="remark-list flex-between ac mb20" @click.stop="toAddress()">
				<view class="fs-28 fc-303 fw-b">新增收货地址</view>
				<image src="/static/img/icon/arrow@3x.png" mode="" class="more-icon"></image>
			</view>
			<view class="goods-info mb20" v-if="details &&details.length > 0" v-for="(item,index) in details" :Key="index">
				<image :src="item.orderGoodsImage" mode="" class="goods-image"></image>
				<view class="wp100 goods-msg flex-between fdc">
					<view class="dflex fdc jc-fs">
						<view class="goods-name mb12">{{item.orderGoodsTitle}}</view>
						<view class="fs-20 lh-28 fc-939">共{{details.length}}件商品</view>
					</view>
					<view class="flex-between ai-fe">
						<view><text class="fs-20 fc-909">运费：</text><text class="fs-28 fc-303">{{getMoneyForYuan(order.orderMoney)}}</text><text
								class="fs-20 fc-303">{{getMoneyForFen(order.orderMoney)}}</text></view>
					</view>
				</view>
			</view>
			<view class="pay-way">
				<view class="flex-between ac" v-for="(item,index) in channelData" :key="index">
					<view class="dflex ac">
						<image :src="item.channelIcon" mode="" class="m-icon mr32"></image>
						<view class="fs-28 fc-303">{{item.channelName}}</view>
					</view>
					<label for="">
						<checkbox class="hh-radio fs-0 mr16 round" @click="onChannelSelect(item.channelType)"  :checked="item.channelCheck==1?true:false">
						</checkbox>
					</label>
				</view>
				<!-- <view class="flex-between ac">
					<view class="dflex ac">
						<image src="../../static/img/icon/pay-bag@2x.png" mode="" class="m-icon mr32"></image>
						<view class="fs-28 fc-303 dflex">余额支付 (<view class="dflex ai-fe">
								<view class="fs-24 fc-303">￥</view>
								<view class="fs-28 lh-28 fc-303 mb2">{{userBalance.money}}</view>
							</view>)</view>
					</view>
					<label for="">
						<checkbox class="hh-radio fs-0 mr16 round" @click="orderMoneyType = 11" :class="orderMoneyType == 11?'checked':''" :checked="orderMoneyType == 11">
						</checkbox>
					</label>
				</view> -->
			</view>
		</view>
		<view class="cu-bar dflex fdc bg-white tabbar border submit-box">
			<view class="wp100 pt12 pb12">
				<label class="dflex jc-fs ac wp100" @click.stop="checkClick">
					<checkbox class="hh-radio fs-0 mr16 round" :checked="form.payCheck" @click.stop="form.payCheck = !form.payCheck"></checkbox>
					<view class="fs-22 lh-32 fc-939">我已阅读并同意 <text class="fc-2e8" @click.stop="toAgreement">《支付协议》</text>
					</view>
				</label>
			</view>
			<view class="wp100 flex-between ac pt12 pb12">
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
				<button class="cu-btn bg-pp fc-f round" @click.stop="orderPay">确认支付</button>
			</view>
		</view>
		<view class="cu-modal show" v-show="showConfirm">
			<view class="cu-dialog wait-pay-box bc-f">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">温馨提示</view>

				</view>
				<view class="wait-pay lh-48 fs-28 fc-303 mb80">
					<image src="../../static/img/images/waitpay@2x.png" mode="widthFix" class="mb28"></image>
					<view class="fs-30 lh-30 fc-9">正在支付中……</view>
				</view>
				<view class="padding-lg pt0 cu-bar bg-white dflex jc-c">
					<button class="cu-btn border-btn pp-line-btn mr40" @tap="showConfirm=false">已取消支付</button>
					<button class="cu-btn border-btn bg-pp fc-f" @tap="showConfirm=false">已完成支付</button>
				</view>
			</view>
		</view>
		<changeAddress :show="showAddress" :addressList="addressList" @choose="chooseAddress" @cancel="showAddress = false"></changeAddress>
	</view>
</template>

<script>

	import changeAddress from 'pages/component/changeaddress.vue';

	export default {
		data() {
			return {
				lotOrderId:"",
				details:[],
				addressList:[],
				order:{},
				addressId:"",
				orderAddress:{},
				showConfirm: false,
				showAddress:false,
				form:{
					payCheck:true,
					lotOrderId:'',
					payId:'',
					channelType:'',
					money:0
				},
				channelData:[]
			}
		},
		components:{
			changeAddress
		},
		onLoad(e) {
			var lotOrderId = e.orderId
			this.lotOrderId = lotOrderId
			this.form.lotOrderId = lotOrderId
			this.initPayChannel();
		},
		onShow() {
			this.getAllAddress()
			this.getExpressOrderData()
		},
		beforeDestroy() {
			if(this.timers){
				clearInterval(this.timers)
				this.timers = ''
			}
		},
		methods: {
			onChannelSelect:function(val){
				for(var i = 0;i<this.channelData.length;i++){
					this.channelData[i].channelCheck = 0;
					if(this.channelData[i].channelType == val){
						this.channelData[i].channelCheck =1;
					}
				}
			},
			initPayChannel(){
				var self = this;
				uni.$api.getPayChannel({}).then(res =>{
					self.channelData = res.data;
				});
			},
			checkClick () {
				this.form.payCheck = !this.form.payCheck
			},
			showAddressList () {
				for (var i in this.addressList) {
					if (this.addressId == this.addressList[i].addressId) {
						this.addressList[i]['checked'] = true
					} else {
						this.addressList[i]['checked'] = false
					}
				}
				this.showAddress = true
			},
			getAllAddress () {
				uni.$api.getAllAddress().then(res=>{
					if (res.success) {
						this.addressList = res.rows || []
					}
				})
			},
			chooseAddress (e) {
				this.addressId = e.addressId
				this.form.addressId = e.addressId
				this.showAddress = false
				console.log("chooseAddress2:"+this.addressId)
				this.getExpressOrderData()
			},
			toAddress () {
				uni.navigateTo({
					url:"/pages/user/address?needBackAddressId="+true
				})
			},
			toAgreement () {
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=3"
				})
			},
			getExpressOrderData () {
				console.log("addressId:"+this.addressId)
				var params = {
					lotOrderId:this.lotOrderId,
					payId:210,
					addressId:this.addressId,
					ruleId:"app_pp_pay_for_express"
				}
				uni.$api.getOrderData(params).then(res => {
					if (res.success) {
						let {details,discountMoneys,order,address,addressId} = res.data
						this.details = details
						this.discountMoneys = discountMoneys
						this.order = order
						this.orderAddress = address
						this.addressId = addressId
						this.form.addressId = addressId
						this.form.money = order.orderPayMoney || 0
					}
				})
			},
			getExpressAreaName (areaString) {
				if (areaString.indexOf("-") >= 0) {
					return areaString.substring(0,areaString.indexOf("-"))
				}
				return areaString
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
			checkOrderStatus(){
				uni.$api.getOrderPayStatus({orderId:this.orderId}).then(res =>{
					if(res.orderPayStatus===1){
						if(this.timers){
							clearInterval(this.timers)
							this.timers = ''
						}
						this.paySucEvent()
					}
				})
			},
			/** 确认支付 **/
			orderPay () {

				if(!this.form.addressId){
					uni.$toast.showError('收货地址不能为空！');
					return;
				}
				for(var i = 0;i<this.channelData.length;i++){
					if(this.channelData[i].channelCheck == 1){
						this.form.payId = this.channelData[i].payId;
						this.form.channelType = this.channelData[i].channelType;
					}
				}
				if(this.form.lotOrderId == ''){
					uni.$toast.showError('订单编号不能为空！');
					return;
				}


				if (this.form.money <= 0) {
					uni.$api.payExpress(this.form).then(res =>{
						uni.$toast.showToast('提交成功');
						setTimeout(function(){
							uni.navigateBack()
						},400)
					})
				} else {

					if(!this.form.payCheck){
						uni.$toast.showError('请勾选同意支付协议！');
						return;
					}



					uni.$api.payExpress(this.form).then(res =>{
							this.payForExpress(res)
					})
				}
			},
			paySucEvent () {
				uni.$toast.showToast('支付成功');
				setTimeout(function(){
					uni.navigateBack()
				},400)
			},
			payForExpress (res) {

				var self = this;
				var istest = false;
				if(res.hasOwnProperty("data")){
					if(res.data.hasOwnProperty("package")){
						if(res.data.package.indexOf("test_")>=0){
							istest = true;
						}
					}
				}

				if(istest){ //测试支付
					uni.$api.testPay({
					  'timeStamp': res.data.timeStamp,
					  'nonceStr': res.data.nonceStr,
					  'package': res.data.package,
					  'paySign': res.data.paySign
					}).then(notifyres => {
					  if (notifyres.success) {
						  this.paySucEvent()
					  }else{
						  uni.$toast.showError('测试支付失败！');
					  }
					});
				}else{  //走真实支付接口

					if(self.form.channelType < 4){
						var provider = "wxpay";
						switch(self.form.channelType){
							case 2: provider = "wxpay"; break;
							case 3: provider = "alipay"; break;
						}
						uni.requestPayment({
						    provider: provider,
						    orderInfo: res.orderInfo, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								this.paySucEvent()
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
								uni.$toast.showError(JSON.stringify(err));
						    }
						});
					}
					if(self.form.channelType === 4){
						//#ifdef APP-PLUS
						plus.runtime.openURL('alipays://platformapi/startapp?appId=20000067&url='+encodeURIComponent(res.orderInfo.qrCode));
						clearInterval(self.timers||0)
						self.timers = setInterval(self.checkOrderStatus,2000)
						setTimeout(()=>self.showConfirm = true,1000)
						return
						//#endif
					}
					if(self.form.channelType === 5){
						//#ifdef APP-PLUS
						if(uni.getSystemInfoSync().platform==='ios'){
	plus.runtime.openURL('https://ds.alipay.com/?from=mobilecodec&scheme='+encodeURIComponent('alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode='+encodeURIComponent(res.orderInfo+'?s=web-other')));
}else{
	plus.runtime.openURL('alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode='+encodeURIComponent(res.orderInfo));
}
						clearInterval(self.timers||0)
						self.timers = setInterval(self.checkOrderStatus,2000)
						setTimeout(()=>self.showConfirm = true,1000)
						return
						//#endif
					}
				}
			}
		}
	}
</script>

<style>
page {
	background-color: #f6f6f6;
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

.goods-info {
	display: flex;
	align-items: flex-start;
	padding: 20rpx;
	border-radius: 20rpx;
	background-color: #fff;
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

.pay-way {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 0 24rpx 0 20rpx;
}

.pay-way>view {
	height: 108rpx;
}

.submit-box {
	padding: 0 32rpx;
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

.submit-box {
	padding: 0 32rpx;
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
/* 支付弹窗 */
.cu-modal .cu-dialog {
	width: 600rpx;
}
.wait-pay {
	width: 414rpx;
	margin: 0 auto;
}
.wait-pay-box .cu-btn {
	width: 240rpx;
	height: 80rpx;
	margin: 0;
	border-radius: 40rpx;
}
.wait-pay-box .cu-btn[class*="line"]::after {
	display: none;
	border: 0;
}
</style>
