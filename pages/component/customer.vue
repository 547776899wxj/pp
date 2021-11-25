<template>
	<view>
		<view class="cu-modal" :class="alert?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系客服</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="flex-center fdc">
						<text class="fs-28 fc-606 mb24">请关注公众号"好获拍拍"</text>
						<image src="../../static/img/images/gzh.jpg" mode="" class="gzh-pic"></image>
					</view>
				</view>
				<!-- <view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view> -->
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
				phone:"13459363632",
				alert:this.show
			}
		},
		created() {
			console.log("create")
			this.getCustomerPhone()
		},
		watch:{
			show (value) {
				this.alert = value
			}
		},
		methods: {
			hideModal(e) {
				this.alert = false
				this.$emit('cancel')
			},
			getCustomerPhone () {
				uni.$api.getCustomerPhone().then(res => {
					this.phone = res.phone
				})
			},
			confirm () {
				
			}
		}
	}
</script>

<style>
.line-de6 {
	color: #303133;
	border: 1px solid #DDDDE6;
}
.remark-modal .cu-dialog {
	border-radius: 24rpx;
	width: 650rpx;
}
.gzh-pic {
	width: 500rpx;
	height: 500rpx;
}
</style>
