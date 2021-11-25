<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="content">确认订单</block>
		</cu-custom>
		<view class="container">
			<view class="order-list">
				<image src="../../static/img/images/blindbox.png" mode="widthFix" class="blindbox-pic"></image>
				<view class="blindbox-info">
					<view class="fs-30 lh-30 fc-3 fw-b">{{info.goodsTitle}}</view>
					<view class="fs-34 lh-34 fc-fb2 fw-b dflex ai-fe"><view class="fs-26 lh-26 mb2">¥</view>{{info.gameBoxPrice}}</view>
					<view class="sku-num">
						<view class="fs-24 lh-24 fc-9 dflex ai-fe">库存：{{info.gameBoxStock}}</view>
					</view>
					<view class="operation-num">
						<image src="../../static/img/icon/delete.png" mode="" class="operation-btn" @click="onSubCount"></image>
						<input type="number"  maxlength="5" v-model="form.count" 
						class="fs-28 lh-28 fc-3 tc order-num" 
						@blur="onInputCount"  />
						<image src="../../static/img/icon/add.png" mode="" class="operation-btn" @click="onAddCount"></image>
					</view>
				</view>
			</view>
			
			<view class="pay-way mt20">
				<view class="flex-between ac" v-for="(item,index) in channelData" :key="index" @click.stop="onChannelSelect(item)">
					<view class="dflex ac">
						<image :src="item.channelIcon" mode="" class="m-icon mr32"></image>
						<view class="fs-28 fc-303">{{item.channelName}}</view>
					</view>
					<label for="">
						<checkbox class="hh-radio fs-0 mr16 round" :checked="item.channelCheck==1?true:false">
						</checkbox>
					</label>
				</view>
			</view>
		</view>
		<view class="cu-bar dflex fdc bg-white tabbar border submit-box">
			<view class="wp100 flex-between ac pt12 pb12">
				<view class="action">
					<view class="dflex ai-fe">
						<view class="fs-20 lh-28 fc-303">合计：</view>
						<view class="dflex ai-fe fw-b">
							<view class="fs-24 fc-e31 mb2">￥</view>
							<view class="fs-32 lh-32 fc-e31">{{getMoneyForYuan(payMoney)}}</view>
							<view class="fs-20 fc-e31 mb2">{{getMoneyForFen(payMoney)}}</view>
						</view>
					</view>
				</view>
				<button class="cu-btn bg-pp fc-f round" v-if="checkPaying">请稍后</button>
				<button class="cu-btn bg-pp fc-f round" v-else-if="paying">支付中</button>
				<button class="cu-btn bg-pp fc-f round" v-else @click="orderPay">立即购买</button>
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
					<button class="cu-btn border-btn pp-line-btn mr40" @tap="onCancelPay">已取消支付</button>
					<button class="cu-btn border-btn bg-pp fc-f" @tap="onConfirmPay">已完成支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkPaying: false,
				paying: false,
				showConfirm: false,
				channelData:[],
				info: {},
				limitCount: '',
				form:{
					gameBoxId: '',
					count: 1,
				},
				payMoney: 0,
				orderId: '',
				countInputStr: '',
			}
		},
		onShow() {
			this.fetchGameBox()
		},
		onLoad() {
			this.initPayChannel()
		},
		methods: {
			fetchGameBox(){
				uni.$api.getOnSaleTopOne().then(res =>{
					this.info = res.data || {}
					this.limitCount = res.limitCount || ''
					this.form.gameBoxId = this.info.gameBoxId || ''
					if (!this.form.gameBoxId){
						uni.$toast.alert('盲盒活动已结束').then(()=>{
							uni.switchTab({
								url:'/pages/index/main'
							})
						})
					}
					this.calcPayMoney()
				})
			},
			initPayChannel(){
				var self = this;
				uni.$api.getPayChannel({}).then(res =>{
					self.channelData = res.data;
				});
			},
			onChannelSelect(item){
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
			onCheckCount(){
				if (this.limitCount > 0){
					if (this.limitCount < this.info.gameBoxStock){
						//限制数量小于库存数量，校验限制数量
						if (this.limitCount < this.form.count){
							uni.$toast.showToast('一次性最多只能购买'+this.limitCount+'份')
							this.form.count = this.limitCount
						}
					}
					else {
						//限制数量小于库存数量，校验库存
						if (this.form.count > this.info.gameBoxStock){
							this.form.count = this.info.gameBoxStock
							uni.$toast.showToast('库存不足')
						}
					}
				}
				else {
					if (this.form.count > this.info.gameBoxStock){
						this.form.count = this.info.gameBoxStock
						uni.$toast.showToast('库存不足')
					}
				}
				if (this.form.count <= 1){
					this.form.count = 1
				} 
				this.calcPayMoney()
			},
			onInputCount(e){
				let value = e.detail.value				
				if (!value) value = 1
				this.form.count = parseInt(value)
				this.onCheckCount()
			},
			onSubCount(){
				if (this.form.count == 1) return
				this.form.count -= 1
				this.onCheckCount()
			},
			onAddCount(){
				this.form.count += 1
				this.onCheckCount()
			},
			calcPayMoney(){
				this.payMoney = (this.info.gameBoxPrice * this.form.count).toFixed(2)
			},
			orderPay(){
				var channel = this.channelData.find(e =>{
					return e.channelCheck == 1
				})
				if (!channel) {
					uni.$toast.showToast('请选择支付方式')
					return
				}
				if (this.form.count <= 0){
					uni.$toast.showToast('请选择购买数量')
					return
				}
				if (this.paying) return
				if (this.checkPaying) return
				this.paying = true
				//清掉定时器
				if(this.timers){
					clearInterval(this.timers)
					this.timers = ''
				}
				uni.$api.createGameBoxOrderPayPlan({
					...this.form
				}).then(res =>{
					this.orderId = res.orderId || ''
					return this.pay(channel)
				}).then(()=>{
					console.log('检查支付')
					setTimeout(()=>this.showConfirm = true,1000)
					// if (channel.channelType < 4 || channel.channelType==99){
					// 	setTimeout(()=>{
					// 		uni.redirectTo({
					// 			url:"/pages/order/paysuccess?orderId="+this.orderId
					// 		})
					// 	}, 1000)
					// }
					// else if (channel.channelType == 4){
					// 	//需要检查是否支付成功
						this.timers = setInterval(this.checkOrderStatus,2000)
						this.checkPaying = true;
					// }
					// else if (channel.channelType == 5){
					// 	//需要检查是否支付成功
					// 	this.timers = setInterval(this.checkOrderStatus,2000)
					// 	this.checkPaying = true;
					// }
					this.paying = false
				}).catch(err =>{
					this.paying = false
					let {code,count=0,stock} = err
					if (code == 2){
						if (count > 0){
							//有盲盒再销售
							uni.$toast.alert('盲盒活动信息已更新').then(()=>{
								this.fetchGameBox()
							})
						}
						else {
							//无盲盒再销售
							uni.$toast.alert('盲盒活动已结束').then(()=>{
								uni.switchTab({
									url:'/pages/index/main'
								})
							})
						}
					}
					if (stock !== undefined){
						this.info.gameBoxStock = stock
					}
				})
			},
			pay(channel){
				return new Promise((resolve,reject) => {
					var param = {
						orderId: this.orderId,
						payId: channel.payId,
						channelType: channel.channelType
					}
					var self = this;
					uni.$api.appPay(param).then(res =>{
							console.log(JSON.stringify(res))
							var istest = false;
							if(res.hasOwnProperty("data")){
								if(res.data.hasOwnProperty("package")){
									if(res.data.package.indexOf("test_")>=0){
										istest = true;
									}
								}
							}
							if(istest){  //测试支付
								uni.$api.testPay({
								  'timeStamp': res.data.timeStamp,
								  'nonceStr': res.data.nonceStr,
								  'package': res.data.package,
								  'paySign': res.data.paySign
								}).then(notifyres => {
								  if (notifyres.success) {
									uni.$toast.showToast('测试支付成功');
									resolve('测试支付成功')
								  }else{
									  uni.$toast.showError('测试支付失败！');
									  reject('测试支付失败')
								  }
								}).catch(reject);
	
							}else{  //走真实支付接口
								if(param.channelType < 4){
									setTimeout(()=>{resolve('检查支付')},1000)
									var provider = "wxpay";
									switch(param.channelType){
										case 2: provider = "wxpay"; break;
										case 3: provider = "alipay"; break;
									}
									uni.requestPayment({
										provider: provider,
										orderInfo: res.orderInfo, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
										success: function (res) {
											console.log('success:' + JSON.stringify(res));
											// resolve(res)
										},
										fail: function (err) {
											console.log('fail:' + JSON.stringify(err));
											// uni.$toast.showToast(JSON.stringify(err))
											// reject(err)
										},
									});
								}
								if(param.channelType === 4){
									//#ifdef APP-PLUS
									plus.runtime.openURL('alipays://platformapi/startapp?appId=20000067&url='+encodeURIComponent(res.orderInfo.qrCode));
									// setTimeout(()=>self.showConfirm = true,1000)
									resolve('检查支付')
									return
									//#endif
								}
								if(param.channelType === 5){
									//#ifdef APP-PLUS
									if(uni.getSystemInfoSync().platform==='ios'){
										plus.runtime.openURL('https://ds.alipay.com/?from=mobilecodec&scheme='+encodeURIComponent('alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode='+encodeURIComponent(res.orderInfo+'?s=web-other')));
									}else{
										plus.runtime.openURL('alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode='+encodeURIComponent(res.orderInfo));
									}
									resolve('检查支付')
									// setTimeout(()=>self.showConfirm = true,1000)
									return
									//#endif
								}
							}
						})
						.catch(err =>{
							reject(err)
						})
				})
				
			},
			checkOrderStatus(){
				var self = this
				uni.$api.getOrderPayStatus({orderId:this.orderId}).then(res =>{
					if(res.orderPayStatus>=1){
						if(this.timers){
							clearInterval(this.timers)
							this.timers = ''
						}
						if (this.showConfirm) this.showConfirm = false
						if (this.checkPaying){
							this.checkPaying = false
							uni.hideLoading()
						}
						uni.$toast.showToast('支付成功');
						setTimeout(function(){
							uni.redirectTo({
								url:"/pages/order/paysuccess?orderId="+self.orderId
							})
						},1000)
					}
				})
			},
			onCancelPay(){
				clearInterval(this.timers)
				this.timers = ''
				this.showConfirm = false
				this.checkPaying = false;
			},
			onConfirmPay(){
				this.showConfirm = false
				uni.showLoading({
				    title: '检查支付中'
				});
				this.checkPaying = true;
				var timer = this.timers
				setTimeout(()=>{
					if (timer === this.timers){
						clearInterval(this.timers)
						this.timers = ''
						this.checkPaying = false
						uni.hideLoading()
						uni.$toast.showToast('订单未支付')
					}
				},15000)
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
		}
	}
</script>

<style>
.container {
	padding: 22rpx 24rpx;
	width: 100%;
}
.order-list {
	padding: 30rpx 24rpx;
	background-color: #fff;
	border-radius: 10rpx;
	display: flex;
	align-items: flex-start;
	position: relative;
}
.blindbox-pic {
	width: 140rpx;
	height: 140rpx;
	margin-right: 22rpx;
}
.blindbox-info {
	width: calc(100% - 162rpx);
	display: flex;
	justify-content: space-between;
}
.sku-num {
	position: absolute;
	bottom: 40rpx;
	display: flex;
	align-items: center;
}
.operation-num {
	position: absolute;
	bottom: 18rpx;
	right: 12rpx;
	display: flex;
	align-items: center;
}
.operation-btn {
	width: 44rpx;
	height: 44rpx;
	padding: 12rpx;
	flex-shrink: 0;
	box-sizing: content-box;
}
.order-num {
	max-width: 80rpx;
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
.pay-way {
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 24rpx 0 20rpx;
}

.pay-way>view {
	height: 108rpx;
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
