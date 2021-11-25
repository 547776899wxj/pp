<template>
	<view>
		<cu-custom bgColor="bg-f6" class="solid-bottom" :isBack="true"><block slot="content">关于我们</block></cu-custom>
		<div class="container" v-html="shopInfo.shopAbout"></div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopInfo:{}
			}
		},
		onLoad(){
			this.fetchData();
		},
		methods: {
			fetchData(){
				uni.$api.getShopInfo().then(res=>{
					this.shopInfo = res.data || {};
					if(this.shopInfo && this.shopInfo.shopAbout){
							this.shopInfo.shopAbout = uni.$utils.formatRichTextImage(this.shopInfo.shopAbout);
					}
				})
			}
		}
	}
</script>

<style>
page {
	background: #fff;
}
.container {
	padding: 32rpx 40rpx;
	font-size: 28rpx;
	line-height: 48rpx;
	color: #303133;
}
</style>
