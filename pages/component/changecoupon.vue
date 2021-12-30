<template>
	<view>
		<view class="cu-modal bottom-modal address-modal" :class="alert?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content dflex ac pl28 fw-b wp100">券 <view class="fs-28 lh-28 fc-909 fw-5 ml20">请选择置顶或者优先上架券</view></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm" style="min-height: calc(100vh - 100rpx);">
					<scroll-view scroll-y="true" class="hp100">
						<view class="address-box mb20">
							<view class="flex-between ac">
								<view class="dflex ac">
									<view class="fs-36 fc-303 fw-b lh-50 mr16">不使用券</view>
								</view>
									<checkbox-group @change="changeCoupon">
								<checkbox :checked="couponType===''"  class="hh-radio fs-0 mr16 round" value=""></checkbox>
								</checkbox-group>
							</view>
						</view>
						<view class="address-box mb20">
							<view class="flex-between ac">
								<view class="dflex ac">
									<view class="dflex fdc jc-fs">
										<view class="dflex ai-fe mb18">
											<view class="fs-36 fc-303 fw-b lh-50 mr16">优先上架券</view>
											<view class="fs-30 fc-fb2 lh-40 mb4">{{priorityCouponCount}}张</view>
										</view>
										<view class="fs-26 lh-40 fc-939 tl" >使用该券后可以安排</view>
									</view>
								</view>
								<checkbox-group @change="changeCoupon">
								<checkbox :checked="couponType===41"  class="hh-radio fs-0 mr16 round" :disabled="priorityCouponCount===0" value="41"></checkbox>
								</checkbox-group>
							</view>
						</view><view class="address-box mb20">
							<view class="flex-between ac">
								<view class="dflex ac">
									<view class="dflex fdc jc-fs">
										<view class="dflex ai-fe mb18">
											<view class="fs-36 fc-303 fw-b lh-50 mr16">拍场置顶券</view>
											<view class="fs-30 fc-fb2 lh-40 mb4">{{topCouponCount}}张</view>
										</view>
										<view class="fs-26 lh-40 fc-939 tl">使用该券后可以显示在拍场的最前面</view>
									</view>
								</view>
								<checkbox-group @change="changeCoupon">
								<checkbox :checked="couponType===42" class="hh-radio fs-0 mr16 round" value="42" :disabled="topCouponCount===0"></checkbox>
								</checkbox-group>
							</view>
						</view>
						<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
					</scroll-view>
				</view>
				<view class="cu-bar dflex ac bg-white tabbar border submit-box">
					<view class="cu-btn bg-pp fc-f round wp100" @click="confirmCoupon">确定</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
				alert:false,
				topCouponCount:0,
				priorityCouponCount:0,
				couponType:'',
				domainStatic:this.domainStatic
			}
		},
		created() {
			uni.$api.getLotShopGoodsCouponDetails().then(res=>{
				this.priorityCouponCount = res.priorityCouponCount||0
				this.topCouponCount = res.topCouponCount||0
			})
		},
		watch:{
			show (value) {
				this.alert = value
			},
		},
		methods: {
			changeCoupon({detail}){
				var value = parseInt(detail.value[0]||'')||''
				this.couponType = value
			},
			hideModal(e) {
				this.alert = false
				this.$emit('cancel')
			},
			confirmCoupon(){
				this.$emit('confirm',this.couponType)
				this.hideModal()
			}
		}
	}
</script>

<style>
	.cu-modal.bottom-modal.address-modal .cu-dialog {
		border-radius: 40rpx 40rpx 0 0;
		max-height: 1000rpx;
	}
	
	.cu-modal.bottom-modal.address-modal .cu-dialog .padding-sm {
		max-height: 900rpx;
	}
	
	.address-modal .cu-dialog .padding-sm scroll-view {
		max-height: 880rpx;
	}
	
	.address-box {
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 24rpx;
		/* box-shadow: 0px 12rpx 7px rgba(196,167,123,0.2); */
		/* box-shadow:0px 0rpx 8rpx 0px rgba(49,47,40,0.3); */
		/* box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06); */
		/* border: 2rpx solid #DDDDE6; */
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
	
	.submit-box {
		padding: 0 32rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		min-height: 100rpx;
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
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
