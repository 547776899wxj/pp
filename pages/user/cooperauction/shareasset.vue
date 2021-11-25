<template>
	<view>
		<cu-custom bgColor="bg-156" pageClassR="fc-f op75 pr32" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">共享余额</block>
		</cu-custom>
		<view class="color-bg"></view>
		<view class="container">
			<view class="flex-center fdc">
				<view class="fs-24 lh-24 fc-fef mb18">我的零钱余额</view>
				<view class="fs-60 lh-60 fc-fef mb100">53097.42</view>
				<view class="share-people mb20">
					<image src="" mode="" class="share-head"></image>
					<view class="dflex fdc ai-fs">
						<view class="fs-32 lh-32 fc-3 mb18">被共享人姓名：某某某</view>
						<view class="fs-24 lh-24 fc-9">被共享人手机号码：17759008262</view>
					</view>
				</view>
				<view class="share-assets mb40">
					<view class="fs-28 lh-28 fc-3 mb20">共享金额</view>
					<view class="input-box mb28">
						<input type="text" placeholder="共享金额" class="fs-28 lh-28 fc-3" placeholder-class="fs-28 lh-28 fc-9">
					</view>
					<view class="fs-28 lh-28 fc-3 mb20">合拍收益</view>
					<view class="input-box">
						<input type="text" placeholder="合拍收益" class="fs-28 lh-28 fc-3" placeholder-class="fs-28 lh-28 fc-9">
					</view>
				</view>
				<view class="sure-btn flex-center fs-32 lh-32 fc-f">确定</view>
			</view>
			
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
	.color-bg {
		width: 100%;
		height: 976rpx;
		background: linear-gradient(180deg, #156FE6 0%, #227CE7 26%, #5DC3E6 57%, #F6F6F6 100%);
		position: absolute;
		left: 0;
		z-index: 0;
	}
	
	.container {
		padding: 40rpx 32rpx;
		position: relative;
		z-index: 1;
	}
	
	.share-people {
		width: 100%;
		height: 176rpx;
		padding: 28rpx;
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.share-head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		margin-right: 12rpx;
	}
	
	.share-assets {
		width: 100%;
		padding: 28rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.input-box {
		width: 100%;
		height: 82rpx;
		background-color: #f6f6f6;
		border-radius: 20rpx;
	}
	
	.input-box input {
		width: 100%;
		height: 100%;
		padding: 0 28rpx;
	}
	
	.sure-btn {
		width: 100%;
		height: 100rpx;
		border-radius: 50rpx;
		background: linear-gradient(90deg, #D52F2C 0%, #F2573C 100%);
	}
	
	.fc-fef {
		color: #fefefe;
	}
	
	.mb100 {
		margin-bottom: 100rpx;
	}
</style>
