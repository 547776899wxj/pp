<template>
	<view class="">
		<cu-custom bgColor="bg-f6" class="solid-bottom" :isBack="true"><block slot="content">{{agreementInfo.agreementName || '好获拍拍服务协议'}}</block></cu-custom>
		<div class="container" v-html="agreementInfo.agreementContent"></div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreementId:'',
				agreementInfo:{}
			}
		},
		onLoad(e){
			if(e.agreementId){
				this.agreementId = e.agreementId;
				this.fetchData();
			}
		},
		methods: {
			fetchData(){
				uni.$api.getAgreement({id:this.agreementId}).then(res=>{
					this.agreementInfo = res.data || {};
					if(this.agreementInfo && this.agreementInfo.agreementContent){
						this.agreementInfo.agreementContent = uni.$utils.formatRichTextImage(this.agreementInfo.agreementContent);
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
