<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">拍品转拍</block>
		</cu-custom>
		<view class="container">
			<view class="goods-info mb20">
				<image :src="lotObj.lotImage" mode="" class="goods-image"></image>
				<view class="wp100 goods-msg flex-between fdc">
					<view class="dflex fdc jc-fs">
						<view class="goods-name mb12">{{lotObj.lotName}}</view>
						<view class="fs-20 lh-28 fc-939"></view>
					</view>
					<view class="flex-between ai-fe">
						<view><text class="fs-20 fc-909">拍入价：</text><text class="fs-24 fc-e31">￥</text><text
								class="fs-28 fc-e31">{{lotInPrice[0]}}</text><text
								class="fs-20 fc-e31" v-if="lotInPrice[1]">.{{lotInPrice[1]}}</text></view>
					</view>
				</view>
			</view>
			<view class="auction-price-box">
				<view class="fs-28 fc-303 lh-40 mb16">上架售价</view>
				<view class="price-input mb16 dflex ac">
					<view class="fs-30 lh-40 fc-606">￥</view>
					<input type="number" v-model="lotOutPrice" @blur="getAuctionLotDepositMoney">
				</view>
				<!-- <view class="fs-24 lh-34 fc-939">
					注：转拍价不能高出拍入价{{lotObj.lotInPrice>3000?auctionConfig.auctionMoneyUpLimit:auctionConfig.auctionMoneyUpLimit2}}%，即最高可卖¥{{maxLotOutPrice}}
					</view> -->			
					<!-- <view class="fs-24 lh-34 fc-939" v-if="leaveLotCount>0">
					您的拍品已经流拍{{leaveLotCount}}次了，流拍3次之后只能留下自用
					</view> -->
			</view>
			<!-- <view class="remark-list flex-between ac" v-if="couponEnable">
				<view class="fs-28 fc-303 fw-b">使用券</view>
				<view class="fs-28 fc-606 dflex ac" @click="showCoupon=true">
					<template>{{couponTypeNameObj[putLotObj.couponType+'']||'请选择'}}</template>
					<image src="../../static/img/icon/more-icon.png" mode="" class="m-icon"></image></view>
			</view>
			<view class="remark-list flex-between ac">
				<view class="fs-28 fc-303 fw-b">申请挂拍场次时间</view>
				<view class="fs-28 fc-606" v-if="putLotObj.couponType===''">{{neartime}}</view>
				<picker mode="selector" v-if="putLotObj.couponType===41" :range="priorityDays" @change="changePriority">
					<view  class="dflex ac">
						
					
					<view>{{priorityDay||'请选择'}}</view><image src="../../static/img/icon/more-icon.png" mode="" class="m-icon"></image>
			</view>
				</picker>
				<picker  mode="selector" v-if="putLotObj.couponType===42" :range="topDayDis" @change="changeTop">
						<view  class="dflex ac"><view>{{topDay||'请选择'}}</view><image src="../../static/img/icon/more-icon.png" mode="" class="m-icon"></image>
				</view>
				</picker>
			</view> -->
		</view>
		<view class="cu-bar dflex fdc bg-white tabbar border submit-box">
			<view class="wp100 pt12 pb12 dflex justify-between">
				<label class="dflex jc-fs ac wp100" @tap="changeCheck">
					<checkbox class="hh-radio fs-0 mr16 round" :class="isCheck?'checked':''" :checked="isCheck" >
					</checkbox>
					<view class="fs-22 lh-32 fc-939">我已阅读并同意 <text class="fc-2e8" @click.stop="toAgreement">《拍卖委托协议》</text>
					</view>
				</label>
				<button class="cu-btn bg-pp fc-f round" @tap="pubAuctionLot">确认上架</button>
			</view>
			<!-- <view class="wp100 flex-between ac pt12 pb12">
				<view class="action">
					<view class="dflex ac">
						<view class="fs-20 lh-28 fc-303 mt8">佣金：</view>
						<view class="dflex ai-fe fw-b">
							<view class="fs-24 fc-e31 mb6">￥</view>
							<view class="fs-48 lh-48 fc-e31">{{depositMoney[0]||''}}</view>
							<view class="fs-28 fc-e31 mb6" v-if="depositMoney[1]">.{{depositMoney[1]}}</view>
						</view>
					</view>
					<view class="fs-22 lh-32 fc-939 tl" v-show="lotOutPrice>=lotObj.lotInPrice">佣金为转拍溢价部分的{{auctionConfig.auctionUpAddRate}}%</view>
					<view class="fs-22 lh-32 fc-939 tl" v-show="lotOutPrice<lotObj.lotInPrice">佣金为转拍跌价的{{auctionConfig.auctionLowerRate}}%</view>
				</view>
				<button class="cu-btn bg-pp fc-f round" @tap="pubAuctionLot">确认支付</button>
			</view> -->
		</view>
		<view class="cu-modal agreement-modal" :class="{show:showPop}">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">拍卖委托协议</view>
					
				</view>
				<view class="padding-lg pt0 agreement-content lh-48 fs-28 fc-303">
					<scroll-view scroll-y="true"  style="height: 500rpx;">
						<view v-html="agreementInfo.agreementContent">
						</view>
					</scroll-view>
				</view>
				<view class="padding-lg pt0 cu-bar bg-white fdc jc-c">
					<button class="cu-btn border-btn m-bg-pp-unclick fc-f lg wp100" v-show="count>0">已阅读，本人已知晓上述内容({{count}})</button>
					<button class="cu-btn border-btn bg-pp fc-f lg wp100" v-show="count===0" @click="showPop=false">已阅读，本人已知晓上述内容</button>
				</view>
			</view>
		</view>
		<changeCoupon :show="showCoupon" @cancel="showCoupon = false" @confirm="handleConfirm"></changeCoupon>
	</view>
</template>

<script>
	import changeCoupon from 'pages/component/changecoupon.vue';
	export default {
		data() {
			return {
				isCheck: true,
				showPop: true,
				leaveLotCount: '',
				lotOutPrice: '',
				maxLotOutPrice: '',
				lotInPrice: ['0', '0'],
				depositMoney: ['0', '0'],
				putLotObj: {
					autionDate:'',
					couponType:'',
					acutionNo:''
				},
				couponTypeNameObj:{
					'41':'优先上架券',
					'42':'拍场置顶券'
				},
				lotObj: {},
				count:5,
				agreementInfo: {},
				neartime: '',
				topDay: '',
				priorityDay: '',
				auctionConfig: {},
				priorityDaysValue: [],
				priorityDays: [],
				topDayDis: [],
				topDayValue: [],
				rate: '',
				couponEnable:false,
				showCoupon:false,
			}
		},
		components:{
			changeCoupon
		},
		onLoad(option) {
			this.putLotObj.lotId = option.lotId 
			this.getAuctionLot()
			this.getAggreemnt()
			this.getCouponDetails()
		},

		methods: {
			handleConfirm(value){
				this.putLotObj.couponType=value
				if(value===''){
					this.putLotObj.autionDate = this.neartime
				}
			},
			changePriority({detail}){
				this.priorityDay=this.priorityDays[detail.value]||''
				this.putLotObj.autionDate = this.priorityDaysValue[detail.value]||''
			},	
			changeTop({detail}){
				this.topDay=this.topDayDis[detail.value]||''
				var val = this.topDayValue[detail.value]||''
				if(val){
					this.putLotObj.autionDate = val.split(':')[0]
					this.putLotObj.auctionNo = val.split(':')[1]
				}
			},
			getCouponDetails(){
				uni.$api.getLotShopGoodsCouponDetails().then(res=>{
					this.priorityDays = res.priorityDays||[]
					this.priorityDaysValue = res.priorityDaysValue||[]	
					this.topDayDis = res.topDayDis||[]
					this.topDayValue = res.topDayValue||[]
					this.couponEnable = res.enable||false
				})
			},
			getAuctionLot() {
				uni.$api.getLotByTurn(this.putLotObj).then(res => {
					this.lotObj = res.data
					if(res.data.lotInPrice){
						this.lotInPrice =( res.data.lotInPrice+'').split('.')
					}
					this.putLotObj.lotId = this.lotObj.lotId;
					this.maxLotOutPrice = res.maxLotOutPrice;
					this.lotOutPrice = this.lotInPrice[0];
					this.leaveLotCount = res.leaveLotCount;
					this.neartime = res.neartime
					this.auctionConfig = res.config
					this.getAuctionLotDepositMoney();
				})

			},
		
			changeCheck(){
				this.isCheck = !this.isCheck
				/* if(this.isCheck){
					uni.setStorageSync('transferLotTips',true)
				} */
			},
			pubAuctionLot() {
				if(!this.isCheck){
					 uni.$toast.showError('请先同意协议')
					return 
				}
				if(!this.putLotObj.lotOutPrice){
					uni.$toast.showError('请输入转拍售价')
					return 
				}
				// if(this.putLotObj.couponType && !this.putLotObj.autionDate){
				// 	uni.$toast.showError('请选择挂拍场次时间')
				// 	return
				// }
				// if(this.putLotObj.couponType ===''){
				// 	this.putLotObj.autionDate = this.neartime;
				// }
				uni.$api.shelvesLot(this.putLotObj).then(res => {
					uni.$toast.showSuccess('上架成功成功！')
					setTimeout(function(){
									uni.navigateBack({});
					},400)
				}).catch(e => uni.$toast.showError(e.message))
			},
			getAuctionLotDepositMoney() {
				this.putLotObj.lotOutPrice = this.lotOutPrice
				this.putLotObj.lotPrice = this.lotOutPrice
				if (this.lotOutPrice) {
					uni.$api.getAuctionLotDepositMoney(this.putLotObj).then(res => {
						this.depositMoney = (res.data + '').split('.')
						console.log(res)
					}).catch(e => uni.$toast.showError(e.message))
				}
			},
			getAggreemnt(){
				uni.$api.getLotAgreementInfo({agreementId:2}).then(res=>{
					const agreementInfo = res.data || {};
						if(agreementInfo.agreementContent){
							agreementInfo.agreementContent = uni.$utils.formatRichTextImage(agreementInfo.agreementContent)
						}
					this.agreementInfo = agreementInfo
					this.count = res.timeout
					this.countDown()
				})
			},
			countDown(){
				const _this = this
				const timer = setInterval(()=>{
					_this.count -- 
					if(_this.count<=0){
						clearInterval(timer)
					}
				},1000)
			},
			toAgreement(){
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=2"
				})
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

	.container {
		padding: 8rpx 20rpx;
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

	.remark-list {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.auction-price-box {
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}

	.price-input {
		width: 100%;
		height: 90rpx;
		border: 2rpx solid #dddde6;
		border-radius: 16rpx;
		padding: 0 32rpx;
	}

	.price-input input {
		height: 100%;
		font-size: 36rpx;
		line-height: 44rpx;
		font-weight: bold;
		color: #303133;
		margin-left: 32rpx;
	}

	.cu-bar.tabbar.submit-box {
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
</style>
