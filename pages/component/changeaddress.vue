<template>
	<view>
		<view class="cu-modal bottom-modal address-modal" :class="alert?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">请选择收货地址</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm">
					<scroll-view scroll-y="true" class="hp100">
						<view class="address-box mb20" v-for="(add,index) in addressList" v-if="addressList.length > 0">
							<view class="flex-between ac p20">
								<view class="dflex ac">
									<checkbox class="hh-radio fs-0 mr16 round" :class="add.checked?'address-checked':''" :checked="add.checked" @click="chooseAddress(index)"></checkbox>
									<view class="dflex fdc jc-fs">
										<view class="dflex ai-fe mb8">
											<view class="fs-36 fc-303 fw-b lh-50 mr16">{{add.addressContacts}}</view>
											<view class="fs-28 fc-939 lh-40 mb4">{{add.addressMobile}}</view>
										</view>
										<view class="fs-26 lh-40 fc-939 tl">{{add.addressAreaString}}</view>
									</view>
								</view>
								<image src="/static/img/icon/edit-icon@2x.png" @click.stop="goToAdd(add.addressId)" mode="" class="m-icon fs-0 ml34">
								</image>
							</view>
						</view>
						<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
					</scroll-view>
				</view>
				<view class="cu-bar dflex ac bg-white tabbar border submit-box">
					<navigator class="cu-btn bg-pp fc-f round wp100" @click.stop="goToAdd()">添加收货地址</navigator>
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
			addressList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				alert:false
			}
		},
		watch:{
			show (value) {
				this.alert = value
			},
		},
		methods: {
			/** 获取用户收货地址列表 **/
			toAddress () {
				uni.navigateTo({
					url:"/pages/user/address"
				})
			},
			hideModal(e) {
				this.alert = false
				this.$emit('cancel')
			},
			goToAdd (addressId) {
				var url = "/pages/user/address/add"
				if (addressId) {
					url += "?addressId="+addressId
				}
				uni.navigateTo({
					url:url
				})
			},
			chooseAddress (index) {
				for (var i=0;i++;i<this.addressList.length) {
					if (i == index) {
						this.addressList[index].checked = true
					} else {
						this.addressList[index].checked = false
					}
				}
				this.$emit("choose",this.addressList[index])
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
