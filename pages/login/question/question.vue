<template>
	<view>
		<cu-custom bgColor="bg-f6" class="solid-bottom" :isBack="true"><block slot="content">常见问题</block></cu-custom>
		<view class="container">
			<text class="fs-32 lh-32 fw-b db mb32">无法收接短信验证码？</text>
			1、网络通讯异常可能会造成短信丢失或发送延迟，请重新获取或稍后再试。<br/>
2、请核实您的手机是否已停机或开启了飞行模式，或者是否屏蔽了该类短信。您可进入短信箱或垃圾短信箱中查找。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page {
	background: #fff;
}
.container {
	padding: 32px 40rpx;
	font-size: 28rpx;
	line-height: 48rpx;
}
</style>
