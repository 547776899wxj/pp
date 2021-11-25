<template>
	<view>
	<!-- 	<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 普通窗口
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="Modal">Modal</button>
			</view>
		</view> -->
		<view class="cu-modal remark-modal" :class="alert?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">添加备注</view>
					<!-- <view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view> -->
				</view>
				<view class="padding-sm pl40 pr40 bg-white">
					<view class="form-group">
						<input class="tl bg-f6" placeholder="添加备注,最多20个字" name="input"
						 placeholder-class="fc-c4cc" v-model="userMessage" maxlength="20">
					</view>
				</view>
					<view class="cu-bar bg-white fdc jc-c">
						<view class="action pb40">
							<button class="l-btn flex-center bg-f line-de6 mr48" @click.stop="hideModal">取消</button>
							<button class="l-btn flex-center m-bg-pp fc-f" @click.stop="confirm">确定</button>
						</view>
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
			remark:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				userMessage:this.remark,
				alert:this.show
			}
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
			confirm () {
				this.$emit('confirm',this.userMessage)
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
</style>
