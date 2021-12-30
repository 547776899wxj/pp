<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的收货地址</block>
		</cu-custom>
		<view class="container">
			<view class="address-box mb20" v-for="(add,index) in addressList" :key="index" v-if="addressList.length > 0"
				@click.stop="chooseAddress(add.addressId)">
				<view class="flex-between ac p20">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/address-icon@2x.png'" mode="" class="address-icon mt4 mr20"></image>
						<view class="dflex fdc jc-fs">
							<view class="dflex ai-fe mb8">
								<view class="fs-36 fc-303 fw-b lh-50 mr16">{{add.addressContacts}}</view>
								<view class="fs-28 fc-939 lh-40 mb4">{{add.addressMobile}}</view>
							</view>
							<view class="fs-26 lh-40 fc-939">{{add.addressAllName}}</view>
						</view>
					</view>
					<image @click.stop="goToAdd(add.addressId)" :src="domainStatic+'/img/icon/edit-icon@2x.png'" mode=""
						class="m-icon fs-0 ml34"></image>
				</view>
				<view class="flex-between ac address-operation">
					<label class="dflex jc-fs ac" @click.stop="updateDefaultStatus(index)">
						<checkbox class="hh-radio fs-0 mr16 round"
							:class="add.addressDefaultStatus == 1?'address-checked':''"
							:checked="add.addressDefaultStatus == 1"></checkbox>
						<view class="fs-20 lh-28 fc-939">默认地址</view>
					</label>
					<view class="delete-icon fs-20 lh-28 fc-606" @click.stop="delAddress(add.addressId)">删除</view>
				</view>
			</view>
		</view>
		<!-- tabbar 占位 -->
		<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		<view class="cu-bar dflex ac bg-white tabbar border submit-box">
			<navigator class="cu-btn bg-pp fc-f round wp100" @click="goToAdd()">添加收货地址</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
				needBackAddressId: false,
				domainStatic:this.domainStatic,
			}
		},
		onLoad(e) {
			var needBackAddressId = e.needBackAddressId
			this.needBackAddressId = needBackAddressId
		},
		onShow() {
			this.getAllAddress()
		},
		methods: {
			/** 获取用户收货地址列表 **/
			getAllAddress() {
				uni.$api.getAllAddress().then(res => {
					if (res.success) {
						this.addressList = res.rows || []
					}
				})
			},
			goToAdd(addressId) {
				var url = "/pages/user/address/add"
				if (addressId) {
					url += "?addressId=" + addressId
				}
				uni.navigateTo({
					url: url
				})
			},
			delAddress(addressId) {
				var self = this
				uni.showModal({
					title: "温馨提示",
					content: "确认删除此条收货地址吗?",
					success(res) {
						if (res.confirm) {
							uni.$api.deleteAddress({
								addressId: addressId
							}).then(res => {
								if (res.success) {
									uni.$toast.showToast("删除成功")
									self.getAllAddress()
								}
							})
						}
					}
				})
			},
			updateDefaultStatus(index) {
				var address = this.addressList[index]
				if (address.addressDefaultStatus == 1) {
					return;
				}
				var params = {
					addressId: address.addressId
				}
				uni.$api.setDefaultAddress(params).then(res => {
					this.getAllAddress()
					this.$forceUpdate()
				}).catch(res => {
					uni.$toast.showError(res.message)
				})
			},
			chooseAddress(addressId) {
				if (this.needBackAddressId) {
					var pages = getCurrentPages();
					var prepage = pages[pages.length - 2]; //上一个页面
					prepage.$vm.addressId = addressId;
					uni.navigateBack()
				}
			},

		}
	}
</script>

<style>
	page {
		background-color: #f6f6f6;
	}

	.container {
		padding: 12rpx 20rpx;
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
