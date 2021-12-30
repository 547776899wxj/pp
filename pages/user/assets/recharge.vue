<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">充值</block>
		</cu-custom>
		<view class="container">
			<view class="fs-28 lh-28 fc-303 mb20">充值金额</view>
			<view class="form-group">
				<input placeholder="请输入充值金额" name="input" placeholder-class="fc-c4cc" v-model="model.money" >
			</view>
			<view class="fs-28 lh-28 fc-303 mb20" v-if="channelData.length>0">选择支付方式</view>
			<view class="pay-way mb16">
				<view class="flex-between ac" v-for="item in channelData">
					<view class="dflex ac">
						<image :src="item.channelIcon" mode="" class="m-icon mr32"></image>
						<view class="fs-28 fc-303">{{item.channelName}}</view>
					</view>
					<label for="">
						<checkbox class="hh-radio fs-0 mr16 round" :checked="item.channelCheck==1?true:false" @click="onChannelSelect(item)">
						</checkbox>
					</label>
				</view>
			</view>
			<label class="dflex jc-fs ac wp100 mb80" @click="model.payCheck = !model.payCheck">
				<checkbox class="hh-radio fs-0 mr16 round" :class="model.payCheck?'checked':''" :checked="model.payCheck" ></checkbox>
				<view class="fs-22 lh-32 fc-939">我已阅读并同意 <text class="fc-2e8" @click.stop="toAgreement">《支付协议》</text></view>
			</label>
			<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onRecharge()">提交</button>
		</view>
		<view class="cu-modal show" v-show="showConfirm">
			<view class="cu-dialog wait-pay-box bc-f">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">温馨提示</view>

				</view>
				<view class="wait-pay lh-48 fs-28 fc-303 mb80">
					<image :src="domainStatic+'/img/images/waitpay@2x.png'" mode="widthFix" class="mb28"></image>
					<view class="fs-30 lh-30 fc-9">正在支付中……</view>
				</view>
				<view class="padding-lg pt0 cu-bar bg-white dflex jc-c">
					<button class="cu-btn border-btn pp-line-btn mr40" @tap="showConfirm=false">已取消支付</button>
					<button class="cu-btn border-btn bg-pp fc-f" @tap="showConfirm=false">已完成支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				channelData:[],
				orderId:'',
				showConfirm:false,
				model:{
					payCheck:true,
					money:'',
					payId:'',
					channelType:''
				},
				domainStatic:this.domainStatic,
			}
		},
		created:function(){
			var self = this;
			// #ifndef MP-WEIXIN
				uni.$api.getPayChannel({}).then(res => {
					self.channelData = res.data;
				});
			// #endif
		},
		beforeDestroy() {
			if(this.timers){
				clearInterval(this.timers)
				this.timers = ''
			}
		},
		methods: {
			toAgreement () {
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=3"
				})
			},
			onChannelSelect:function(item){
				// for(var i = 0;i<this.channelData.length;i++){
				// 	this.channelData[i].channelCheck = 0;
				// 	if(this.channelData[i].channelType == val){
				// 		this.channelData[i].channelCheck =1;
				// 	}
				// }
				this.channelData.map(e => {
					if (e.payId == item.payId){
						e.channelCheck = e.channelCheck==1?0:1
					}
					else {
						e.channelCheck=0
					}
					return e
				})
			},
			checkOrderStatus(){
				uni.$api.getOrderPayStatus({orderId:this.orderId}).then(res =>{
					if(res.orderPayStatus===1){
						if(this.timers){
							clearInterval(this.timers)
							this.timers = ''
						}
					uni.$toast.showToast('充值成功！');
					setTimeout(()=>{
						uni.navigateBack();
					},1000)
					}
				})
			},
			onRecharge:function(){

				if(this.model.money == ''){
					uni.$toast.showError('请输入充值金额！');
					return;
				}
				if(!this.model.payCheck){
					uni.$toast.showError('请勾选同意支付协议！');
					return;
				}
				// 除了微信小程序
				// #ifndef MP-WEIXIN 
					var item = this.channelData.find(e => {
						return e.channelCheck == 1
					})
					if (!item) {
						uni.$toast.showToast('请选择支付方式')
						return
					}
					this.model.payId = item.payId;
					this.model.channelType = item.channelType;
				// #endif
				//微信小程序
				// #ifdef MP-WEIXIN
					this.model.payId = 204;
					this.model.channelType = 2;
					this.model.payType = 1;
				// #endif

				var self = this;
				uni.$api.payRecharge(this.model).then(res =>{
					console.log(JSON.stringify(res.data))
					var istest = false;
					if(res.hasOwnProperty("data")){
						if(res.data.hasOwnProperty("package")){
							if(res.data.package.indexOf("test_")>=0){
								istest = true;
							}
						}
					}

					if(istest){   //测试支付

						uni.$api.testPay({
						  'timeStamp': res.data.timeStamp,
						  'nonceStr': res.data.nonceStr,
						  'package': res.data.package,
						  'paySign': res.data.paySign
						}).then(notifyres => {
						  if (notifyres.success) {
						    uni.$toast.showToast('测试支付成功');
							setTimeout(()=>{
								uni.navigateBack();
							},1000)
						  }else{
							  uni.$toast.showError('测试支付失败！');
						  }
						});

					}else{  //走真实支付接口

						if (self.model.channelType == 2) {
							var provider = "wxpay";
							uni.requestPayment({
								provider: provider,
								orderInfo: res.orderInfo, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package:  res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.$toast.showToast('充值成功！');
									setTimeout(() => {
										uni.navigateBack();
									}, 1000)
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									let errMsg = err.errMsg
									if (errMsg.indexOf("取消")){
										
									}
									else {
										uni.$toast.alert(JSON.stringify(err))
									}
								}
							});
						}
						if (self.model.channelType == 3) {
							var provider = "alipay";
							uni.requestPayment({
								provider: provider,
								orderInfo: res.orderInfo, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.$toast.showToast('充值成功！');
									setTimeout(() => {
										uni.navigateBack();
									}, 1000)
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									let errMsg = err.errMsg
									if (errMsg.indexOf("取消")){
										
									}
									else {
										uni.$toast.alert(JSON.stringify(err))
									}
								}
							});
						}

						if(self.model.channelType === 4){
							//#ifdef APP-PLUS
							self.orderId = res.orderId
							plus.runtime.openURL('alipays://platformapi/startapp?appId=20000067&url='+encodeURIComponent(res.orderInfo.qrCode));
							clearInterval(self.timers||0)
							self.timers = setInterval(self.checkOrderStatus,2000)
							setTimeout(()=>self.showConfirm = true,1000)
							return
							//#endif
						}
						if(self.model.channelType === 5){
							//#ifdef APP-PLUS
							self.orderId = res.orderId
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
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding: 32rpx 60rpx;
}
.pay-way {
	background-color: #fafafa;
	border-radius: 20rpx;
	padding: 0 32rpx;
}
.pay-way > view {
	padding: 32rpx 0 28rpx;
}
.border-btn {
	border-radius: 45rpx;
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
