<template>
	<view>
		<cu-custom bgColor="bg-156" pageClassR="fc-f op75 pr32" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">合拍账户管理</block>
		</cu-custom>
		<view class="color-bg"></view>
		<view class="container">
			<view class="manage-info">
				<view class="flex-center fdc wp50">
					<view class="fs-52 lh-40 fc-f mb20">{{accountData.totalBalanceShareMoney}}</view>
					<view class="fs-24 lh-24 fc-f">总共享余额</view>
				</view>
				<view class="manage-line"></view>
				<view class="flex-center fdc wp50">
					<view class="fs-52 lh-40 fc-f mb20">{{accountData.totalBalanceShareProfitMoney}}</view>
					<view class="fs-24 lh-24 fc-f">预计合拍收益</view>
				</view>
			</view>
			<view class="auction-static mb10">
				<view class="flex-between ac wait-info">
					<view class="fs-28 lh-28 fc-3">待接受合拍 {{accountData.waitAcceptCount}}笔（总计{{accountData.totalWaitAcceptMoney}}）</view>
					<view class="fs-24 lh-24 fc-146" @tap="toWaitRecord()">查看</view>
				</view>
				<view class="flex-between ac ca-info">
					<view class="fs-24 lh-24 fc-9">您可以选择一个被您推荐的人进行共享余额</view>
					<view class="fs-24 lh-24 fc-146" @tap="toShare()">去共享</view>
				</view>
			</view>
			<view class="">
				<view class="account-title flex-between ac">
					<view class="fs-32 lh-32 fc-f">合拍账户({{list.length}})</view>
					<view class="dflex ac" @tap="toHistory()">
						<view class="fs-24 lh-24 fc-f">历史共享记录</view>
						<text class="cuIcon-right fc-f more-cold"></text>
					</view>
				</view>
				<view class="history-list" v-for="item in list">
					<view class="list-title flex-between ac">
						<view class="fs-24 lh-24 fc-9"></view>
						<view class="fs-28 lh=28 fc-d52" @tap="toDetail(item.userId)">查看账户详情</view>
					</view>
					<view class="list-content">
						<image :src="item.userPhoto || '/static/img/icon/default-user.png'" mode="" class="user-head"></image>
						<view class="list-info flex-1">
							<view class="fs-28 lh-28 fc-3 mb10">{{item.userCertName}}（{{item.mobile}}）</view>
							<view class="fs-24 lh-24 fc-9 mb18">合拍收益：{{item.totalBalanceShareNoteProfitMoney}}</view>
							<view class="dflex jc-end ai-fe wp100">
								<view class="fs-24 lh-24 fc-9">共享金额</view>
								<view class="fs-32 lh-24 fc-fb2">￥{{item.totalBalanceShareNoteMoney}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountData:{},
				list:[]
			}
		},
		onShow() {
			this.fetchData();
		},
		methods: {
			fetchData(){
				uni.$api.getBalanceShareInfo().then(res=>{
					this.accountData = Object.assign(res.waitAcceptData,res.totalMoneyData);
					this.list = res.rows;
				})
			},
			toHistory(){
				uni.navigateTo({
					url:'/pages/user/cooperauction/historycooper'
				})
			},
			toDetail(userId){
				uni.navigateTo({
					url:'/pages/user/cooperauction/detail?userId='+userId
				})
			},
			toShare(){
				uni.navigateTo({
					url:'/pages/user/expand'
				})
			},
			toWaitRecord(){
				uni.navigateTo({
					url:'/pages/user/cooperauction/waitrecord'
				})
			}
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
		padding: 0 32rpx;
		position: relative;
		z-index: 1;
	}
	.manage-info {
		display: flex;
		padding: 100rpx 0;
	}
	.manage-line {
		width: 2rpx;
		height: 80rpx;
		background: #fff;
	}
	.auction-static {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 0 28rpx;
	}
	.wait-info {
		height: 82rpx;
		border-bottom: 1rpx solid #f6f6f6;
		box-sizing: content-box;
	}
	.ca-info {
		height: 80rpx;
	}
	.account-title {
		height: 70rpx;
	}
	.history-list {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		padding: 0 28rpx;
	}
	.list-title {
		height: 83rpx;
		border-bottom: 1rpx solid #f6f6f6;
	}
	.list-content {
		padding: 28rpx 0;
		display: flex;
		align-items: center;
	}
	.user-head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}
	.list-info {
		flex: 1;
	}
	.fc-37a {
		color: #37a451;
	}
	.fc-fb2 {
		color: #FB203A ;
	}
	.fc-d52 {
		color: #d52F2c;
	}
	.bg-156 {
		background-color: #156fe6;
	}
</style>
