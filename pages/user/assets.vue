<template>
	<view>
		<cu-custom bgColor="bg-156" rightUrl="./assets/balance" pageClassR="fc-f op75 pr32" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">资产</block>
			<!-- #ifndef MP-WEIXIN -->
				<block slot="right">余额明细</block>
			<!-- #endif -->
		</cu-custom>
		<view class="color-bg"></view>
		<view class="container">
			<view class="flex-center fdc">
				<view class="fs-26 fc-f lh-36 mb20" v-if="info.userMoneyShareStatus == 1">合拍账户余额</view>
				<view class="fs-26 fc-f lh-36 mb20" v-else>零钱余额</view>
				<view class="fs-64 lh-80 fc-f mb20">{{info.money}}</view>
				<view class="pr" v-if="info.frozenMoney>0">
					<navigator  url="./assets/cold">
						<view class="fs-28 fc-f lh-40">冻结 {{info.frozenMoney}}</view>
						<text class="cuIcon-right fc-f more-cold"></text>
					</navigator>
				</view>
				<view class="pr mt48 mb48">
				</view>
				<view class="dflex ac wp100 mb20">
					<navigator class="operation-btn shallow flex-center fc-f mr20" url="../login/bankcard">
						绑定银行卡
					</navigator>
					<navigator class="operation-btn shallow flex-center fc-f mr20" url="assets/withdrawal">
						提现
					</navigator>
					<navigator class="operation-btn shallow flex-center fc-f" url="assets/recharge">
						余额充值
					</navigator>
				</view>
				<!-- #ifdef MP-WEIXIN -->
					<view class="flex  wp100 mb20">
						<navigator class="operation-btn shallow flex-center fc-f" url="./assets/balance">
							余额明细
						</navigator>
					</view>
				<!-- #endif -->
				<!-- <view class="profit-box">
					<view class="pl40 dflex ac mb32">
						<image :src="domainStatic+'/img/icon/profit-icon@2x.png'" mode="" class="m-icon"></image>
						<view class="fs-32 lh-44 fc-303 fw-b">收入统计(￥)</view>
					</view>
					<view class="flex-between ac mb40">
						<view class="profit-info">
							<view class="fs-38 fc-303 lh-46 fw-b mb8">{{info.resellMoneySum}}</view>
							<view class="fs-24 lh-34 fc-939">累计转拍收益</view>
						</view>
						<view class="profit-info">
							<view class="fs-36 fc-303 lh-44 fw-b mb8">{{info.teamIncomeMoney}}</view>
							<view class="fs-24 lh-34 fc-939">累计团队收益</view>
						</view>
					</view>
					<view class="flex-between ac mb40">
						<view class="profit-info">
							<view class="fs-38 fc-303 lh-46 fw-b mb8">{{info.recUserIncomeMoney}}</view>
							<view class="fs-24 lh-34 fc-939">累计直推收益</view>
						</view>
						<view class="profit-info">
							<view class="fs-36 fc-303 lh-44 fw-b mb8">{{info.secUserIncomeMoney}}</view>
							<view class="fs-24 lh-34 fc-939">累计间推收益</view>
						</view>
					</view>
					<view class="flex-between ac">
						<view class="profit-info">
							<view class="fs-38 fc-303 lh-46 fw-b mb8">{{info.balanceShareNoteProfitMoneySum}}</view>
							<view class="fs-24 lh-34 fc-939">累计合拍收益</view>
						</view>
					</view>
				</view> -->
				<view class="profit-box mt20">
					<view class="pl40 dflex ac mb32">
						<image :src="domainStatic+'/img/icon/profit-icon@2x.png'" mode="" class="m-icon"></image>
						<view class="fs-32 lh-44 fc-303 fw-b">其他统计(￥)</view>
					</view>
					<view class="flex-between ac mb40">
						<view class="profit-info">
							<view class="fs-38 fc-303 lh-46 fw-b mb8">{{info.saleIncomeMoney}}</view>
							<view class="fs-24 lh-34 fc-939">累计转拍金额</view>
						</view>
						<view class="profit-info">
							<view class="fs-36 fc-303 lh-44 fw-b mb8">{{info.unPerformanceMakeUpSum}}</view>
							<view class="fs-24 lh-34 fc-939">累计未履约补偿</view>
						</view>
					</view>
					<view class="flex-between ac">
						<view class="profit-info">
							<view class="fs-38 fc-303 lh-46 fw-b mb8">{{info.withdrawSum}}</view>
							<view class="fs-24 lh-34 fc-939">累计提现</view>
						</view>
						<view class="profit-info" @click="gotoBreakRecord">
							<view class="fs-36 fc-303 lh-44 fw-b mb8">{{info.breakCount}}条</view>
							<view class="fs-24 lh-34 fc-939">违约记录</view>
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
				info:{},
				reqList:[],
				noteList:[],
				reqSum:0,
				noteSum:0
			}
		},
		// mounted() {
		// 	this.initData();
		// },
		onShow(){
			this.initData();
			this.fetchShareData();
		},
		methods: {
			fetchShareData(){
				uni.$api.getBalanceShareList().then(res => {
					this.reqList = res.rows;
					this.noteList = res.noteRows;
					
					this.reqSum = this.getMoneySum(this.reqList);
					this.noteSum = this.getMoneySum(this.noteList);
				})
			},
			handleCancelShare(balanceShareNoteId){
				var self = this;
				uni.$toast.confirm('确认取消共享吗').then(()=>{
					uni.$api.endBalanceShareNote({balanceShareNoteId:balanceShareNoteId}).then(()=>{
						uni.$toast.showSuccess('操作成功');
						self.fetchShareData();
						self.initData();
					})
				})
			},
			handleAgree(balanceShareId){
				var self = this;
				uni.$toast.confirm('确认要同意吗').then(()=>{
					uni.$api.acceptBalanceShareApply({balanceShareId:balanceShareId}).then(()=>{
						uni.$toast.showSuccess('操作成功');
						self.fetchShareData();
						self.initData();
					})
				})
			},
			handleRefuse(balanceShareId){
				var self = this;
				uni.$toast.confirm('确认要拒绝吗').then(()=>{
					uni.$api.refuseBalanceShareApply({balanceShareId:balanceShareId}).then(()=>{
						uni.$toast.showSuccess('操作成功');
						self.fetchShareData();
						self.initData();
					})
				})
			},
			getMoneySum(list){
				var sum = 0;
				list.map(e=>{
					sum += e.money;
				})
				return sum.toFixed(2);
			},
			initData:function(){
				uni.$api.getUserMoneyCountInfo().then(res =>{
					this.info = res
				})
			},
			uiClose: function() {
				uni.navigateBack()
			},
			goToRecord: function() {
				uni.navigateTo({
					url: "assets/balance"
				})
			},
			gotoBreakRecord: function() {
				uni.navigateTo({
					url: "assets/balance_break"
				})
			},
		}
	}
</script>

<style>
	.action.middle {
		position: absolute;
		left: 0;
		right: 0;
	}

	.color-bg {
		width: 100%;
		height: 976rpx;
		background: linear-gradient(180deg, #156FE6 0%, #227CE7 26%, #5DC3E6 57%, #F6F6F6 100%);
		position: absolute;
		left: 0;
		z-index: 0;
	}

	.container {
		padding: 36rpx 32rpx;
		position: relative;
		z-index: 1;
	}

	.more-cold {
		position: absolute;
		padding: 6rpx 8rpx;
		right: -44rpx;
		top: 0;
	}

	.operation-btn {
		width: 212rpx;
		height: 90rpx;
		border-radius: 12rpx;
		background: #fff;
		font-size: 32rpx;
		line-height: 32rpx;
	}

	.operation-btn.shallow {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.profit-box {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 32rpx 0;
	}

	.profit-info {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	.cooper-box {
		width: 100%;
		padding: 0 28rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	.cooper-title {
		height: 82rpx;
		border-bottom: 1rpx solid #f6f6f6;
		box-sizing: content-box;
	}
	.toker-box {
		background-color: #fff;
		border-radius: 20rpx;
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
	.agree-btn {
		width: 150rpx;
		height: 60rpx;
		border-radius: 30rpx;
		border: 2rpx solid #d52F2c;
	}
	.refuse-btn {
		width: 150rpx;
		height: 60rpx;
		border: 2rpx solid #999999;
		border-radius: 30rpx;
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
</style>
