<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">置换</block>
		</cu-custom>
		<view class="container">
			<view class="bc-f bri-20 mb20">
				<view class="flex-between ac pt20 pl20 pr20">
					<view class="fs-24 lh-34 fc-303">拍下时间  {{lotObj.lotInTime}}</view>
					<view class="fs-24 lh-34 fc-ff4">{{lotObj.lotStatusStr}} - {{lotObj.lotHangupStatusStr}}</view>
				</view>
				<view class="goods-info">
					<image :src="lotObj.lotImage" mode="" class="goods-image"></image>
					<view class="wp100 goods-msg flex-between fdc">
						<view class="dflex fdc jc-fs">
							<view class="goods-name mb12">{{lotObj.lotName}}</view>
							<view class="fs-20 lh-28 fc-939">拍品编号 {{lotObj.lotId}}</view>
						</view>
						<view class="flex-between ai-fe">
							<view><text class="fs-20 fc-909">拍入价：</text><text class="fs-24 fc-e31">￥</text><text
									class="fs-28 fc-e31">{{lotObj.lotInPrice|intFormat}}</text><text
									class="fs-20 fc-e31" >{{lotObj.lotInPrice|decimalFormat}}</text></view>
							<view class="small-btn line-btn flex-center" @tap="showLot=true">切换</view>
						</view>
					</view>
				</view>
			</view>
			<view class="remark-list flex-between ac mb20">
				<view class="fs-28 fc-303">置换券</view>
				<view class="fs-28 fc-ff4">{{couponCount}}张</view>
			</view>
			<view class="auction-price-box">
				<view class="fs-28 fc-303 lh-40 fw-b mb16">说明</view>
				<view class="fs-24 lh-34 fc-939">1.仅支持3000以上非留下自用拍品</view>
				<view class="fs-24 lh-34 fc-939">2.置换拍品需消耗一张置换券</view>
				<view class="fs-24 lh-34 fc-939">3.如果拍品状态为申请挂拍，则会自动取消挂拍，挂拍申请佣金会自动返还零钱账户</view>
				<view class="fs-24 lh-34 fc-939" v-if="couponCount===0 && rate>0">4.如未使用置换券则需接受{{rate}}%的差价置换</view>
			</view>
		</view>
		<view class="cu-bar dflex fdc bg-white tabbar border submit-box">
			<view class="wp100 pt12 pb12">
				<label class="dflex jc-fs ac wp100" @tap="changeCheck">
					<checkbox class="hh-radio fs-0 mr16 round" :class="isCheck?'checked':''" :checked="isCheck" >
					</checkbox>
					<view class="fs-22 lh-32 fc-939 mr16">我已阅读并同意 <text class="fc-2e8" @click.stop="toAgreement">《物品置换协议》</text>
					</view>
					<button class="cu-btn bg-pp fc-f round" @tap="createLotApply">申请置换</button>
				</label>
			</view>
		</view>
		
		<changeAuction :show="showLot" @choose="handleChoose" :lotList="lotList" @cancel="showLot = false"></changeAuction>
	</view>
</template>

<script>
	import changeAuction from 'pages/component/changeauction.vue';
	export default {
		data() {
			return {
				isCheck: true,
				showPop: true,
				lotObj: {},
				count:5,
				couponCount:0,
				coupons: [],
				agreementInfo: {},
				neartime: '',
				auctionConfig: {},
				rate: '',
				lotList: [],
				showLot: true,
			}
		},
		components:{
			changeAuction,
		},
		onLoad(option) {
			
			this.getAggreemnt()
		},
		onShow() {
			this.getExchangeCouponInfo()
			this.getCanExchangeLotList()
		},
		methods: {
			getCanExchangeLotList() {
				uni.$api.getCanExchangeLotList().then(res =>{
					this.lotList=res.rows 
					if(res.rows.length){
						
					this.lotObj = res.rows[0]
					}
				})
			},
			getExchangeCouponInfo(){
				uni.$api.getExchangeCouponInfo().then(res =>{
					this.couponCount = res.couponCount||0
					this.coupons = res.coupons||[]
					this.rate = res.ratio
				})
			},
			changeCheck(){
				this.isCheck = !this.isCheck
				/* if(this.isCheck){
					uni.setStorageSync('transferLotTips',true)
				} */
			},
			createLotApply() {
				if(!this.isCheck){
					 uni.$toast.showError('请先同意协议')
					return 
				}
				
				uni.$api.createLotApply(this.lotObj).then(res => {
					uni.$toast.showSuccess('提交成功！')
					setTimeout(function(){
									uni.navigateBack({});
					},400)
				}).catch(e => uni.$toast.showError(e.message))
			},
			handleChoose(val) {
				console.log(val)
				this.lotObj = val
				this.showLot=false
			},
			getAggreemnt(){
				uni.$api.getLotAgreementInfo({agreementId:5}).then(res=>{
					const agreementInfo = res.data || {};
						if(agreementInfo.agreementContent){
							agreementInfo.agreementContent = uni.$utils.formatRichTextImage(agreementInfo.agreementContent)
						}
					this.agreementInfo = agreementInfo
					this.count = res.timeout
				})
			},
			
			toAgreement(){
				uni.navigateTo({
					url:"/pages/login/agreement/agreement?agreementId=5"
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
