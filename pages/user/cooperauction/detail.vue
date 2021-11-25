<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">合拍账户详情</block>
		</cu-custom>
		<view class="container">
			<view class="toker-box mb20">
				<view class="toker-info dflex ac">
					<image :src="info.userPhoto || '/static/img/icon/default-user.png'" mode="" class="toker-head"></image>
					<view class="dflex fdc ai-fs flex-1">
						<view class="fs-28 lh-28 fc-3 mb10">{{info.userCertName}}（{{info.mobile}}）</view>
						<view class="fs-24 lh-24 fc-9 mb16">账户状态：{{info.dict}}</view>
						<view class="flex-between ai-fe wp100">
							<view class="fs-20 lh-20 fc-9">合拍收益：{{info.totalBalanceShareNoteProfitMoney}}</view>
							<view class="dflex ai-fe">
								<view class="fs-24 lh-24 fc-9 mr10">共享金额</view>
								<view class="fs-32 lh-24 fc-fb2">￥{{info.totalBalanceShareNoteMoney}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="toker-btn-box dflex jc-end">
					<view class="toker-btn flex-center fs-28 lh-28 fc-d52" @tap="toShare()">共享余额</view>
				</view>
			</view>
			<view class="detail-info-list mb20" v-for="item in list">
				<view class="info-list flex-between ac">
					<view class="fs-28 lh-28 fc-9">共享金额</view>
					<view class="fs-28 lh-28 fc-3">￥{{item.balanceShareNoteMoney}}</view>
				</view>
				<view class="info-list flex-between ac">
					<view class="fs-28 lh-28 fc-9">合拍收益</view>
					<view class="fs-28 lh-28 fc-3">￥{{item.balanceShareNoteProfitMoney}}</view>
				</view>
				<view class="info-list flex-between ac">
					<view class="fs-28 lh-28 fc-9">共享时间</view>
					<view class="fs-28 lh-28 fc-3">{{item.balanceShareNoteAddTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				list:[],
				userId:''
			}
		},
		onLoad(e){
			this.userId = e.userId;
			this.fetchData();
		},
		methods: {
			fetchData(){
				uni.$api.getBalanceShareInfoDetail({acceptUserId:this.userId}).then(res=>{
					this.info = res.accountData;
					this.list = res.rows;
				})
			},
			toShare(){
				uni.navigateTo({
					url:'/pages/user/assets/levelaccount?acceptUserId='+this.userId
				})
			}
		}
	}
</script>

<style>
.container {
	padding: 20rpx 32rpx;
}
.toker-box {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 0 28rpx;
}
.toker-info {
	padding: 32rpx 0;
	background-color: #fff;
	border-radius: 20rpx;
	border-bottom: 1rpx solid #f6f6f6;
}
.toker-head {
	width: 120rpx;
	height: 120rpx;
	border-radius: 20rpx;
	margin-right: 10rpx;
}
.info-title {
	width: 176rpx;
}
.toker-btn-box {
	padding: 20rpx 28rpx;
}
.toker-btn {
	width: 280rpx;
	height: 60rpx;
	border-radius: 30rpx;
	border: 2rpx solid #d52F2c;
}
.fc-fb2 {
	color: #fb203a;
}
.fc-d52 {
	color: #D52F2C;
}
.detail-info-list {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 0 28rpx;
}
.info-list {
	height: 82rpx;
	box-sizing: content-box;
}
.info-list+.info-list {
	border-top: 1rpx solid #f6f6f6;
}
</style>
