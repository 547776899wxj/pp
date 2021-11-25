<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @click.stop="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<!-- <view class="action" @tap="BackPage" v-if="isClose">
					<text class="cuIcon-close"></text>
					<slot name="backText"></slot>
				</view> -->
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view class="right" :class="pageClassR" @tap="goToUrl">
					<slot name="right"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			backMethod:{
				type:String,
				default:""
			},
			delta:{
				type: [Number, String],
				default: 1
			},
			// isClose: {
			// 	type: [Boolean, String],
			// 	default: false
			// },
			bgImage: {
				type: String,
				default: ''
			},
			rightUrl: {
				type: String,
				default: ''
			},
			pageClassR: {
				type: String,
				default: ''
			}
		},
		methods: {
			BackPage() {
				console.log("BackPage")
				console.log(this.backMethod)
				if (this.backMethod != '') {
					console.log("backMethod:",this.backMethod)
					uni.$emit(this.backMethod)
				} else {
					uni.navigateBack({
						delta: Number(this.delta)
					});
				}
			},
			goToUrl:function(){
				
				uni.navigateTo({
					url:this.rightUrl
				})
				
			}
		}
	}
</script>

<style>
.right {
	padding-right: 32rpx;
}
</style>
