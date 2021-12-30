<template>
	<view>
		<view class="cu-modal bottom-modal address-modal" :class="show?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content dflex ac pl28 fw-b wp100">拍品 <view class="fs-28 lh-28 fc-909 fw-5 ml20">请选择拍品后进行申请置换</view></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-sm" style="min-height: calc(100vh - 100rpx);">
					<scroll-view scroll-y="true" class="hp100">
						<view class="bc-f bri-20 mb20" v-for="(item,index) in lotList"  :key="item.lotId">
							<view class="flex-between ac pt20 pl20 pr20">
								<view class="fs-24 lh-34 fc-303">拍下时间 {{item.lotInTime}}</view>
								<view class="fs-24 lh-34 fc-ff4">{{item.lotStatusStr}} - {{item.lotHangupStatusStr}}</view>
							</view>
							<view class="goods-info">
								<image :src="item.lotImage" mode="" class="goods-image"></image>
								<view class="wp100 goods-msg flex-between fdc">
									<view class="dflex fdc jc-fs">
										<view class="goods-name mb12">{{item.lotName}}</view>
										<view class="fs-20 lh-28 tl fc-939">拍品编号 {{item.lotId}}</view>
									</view>
									<view class="flex-between ai-fe">
										<view><text class="fs-20 fc-909">拍入价：</text><text class="fs-24 fc-e31">￥</text><text
												class="fs-28 fc-e31">{{item.lotInPrice | intFormat}}</text><text
												class="fs-20 fc-e31" >{{item.lotInPrice | decimalFormat}}</text></view>
												<view class="small-btn line-btn flex-center" @tap="chooseIndex(index)">选择</view>
									</view>
								</view>
							</view>
						</view>
						<listempty :list="lotList"></listempty>
						<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
					</scroll-view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
		import listempty from 'pages/component/listempty.vue';
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			lotList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				alert:false,
				domainStatic:this.domainStatic
			}
		},
		watch:{
			show (value) {
				this.alert = value
			},
		},
		components:{
			listempty:listempty
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
			chooseIndex(index) {
				
				this.$emit("choose",this.lotList[index])
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
