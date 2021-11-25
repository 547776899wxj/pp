<template>
	<view>
		<cu-custom bgColor="bg-156" pageClassR="fc-f op75 pr32" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">待接受合拍记录</block>
		</cu-custom>
		<view class="color-bg"></view>
		<view class="container">
			<view class="manage-info">
				<view class="flex-center fdc wp50">
					<view class="fs-40 lh-40 fc-f mb20">{{waitAcceptCount}}</view>
					<view class="fs-24 lh-24 fc-f">待接受笔数</view>
				</view>
				<view class="manage-line"></view>
				<view class="flex-center fdc wp50">
					<view class="fs-40 lh-40 fc-f mb20">{{waitAcceptMoneySum}}</view>
					<view class="fs-24 lh-24 fc-f">待接受金额</view>
				</view>
			</view>
			<view class="">
				<view class="account-title flex-between ac">
					<view class="fs-32 lh-32 fc-f">待接受合拍记录({{list.total}})</view>
					<view class="dflex ac" @click="gotoHistory">
						<view class="fs-24 lh-24 fc-f">历史请求记录</view>
						<text class="cuIcon-right fc-f more-cold"></text>
					</view>
				</view>
				<view class="history-list" v-for="item in list.rows">
					<view class="list-title flex-between ac">
						<view class="fs-24 lh-24 fc-9">发送请求时间 {{item.balanceShareAddTime}}</view>
					</view>
					<view class="list-content">
						<image :src="item.userPhoto||'/static/img/icon/default-user.png'" mode="" class="user-head"></image>
						<view class="list-info flex-1">
							<view class="fs-28 lh-28 fc-3 mb10">{{item.acceptUserCertName}}（{{item.acceptMobile}}）</view>
							<view class="fs-24 lh-24 fc-9 mb18">合拍收益：{{item.balanceShareProfitMoney}}</view>
							<view class="dflex jc-end ai-fe wp100">
								<view class="fs-24 lh-24 fc-9">共享金额</view>
								<view class="fs-32 lh-24 fc-fb2">￥{{item.balanceShareMoney}}</view>
							</view>
						</view>
					</view>
				</view>
				<nomore :pageCount="list.pageCount" :pageNumber="queryParam.pageNumber"></nomore>
			</view>
		</view>
	</view>
</template>

<script>
	import listempty from '@/pages/component/listempty.vue';
	import nomore from '@/pages/component/nomore.vue';
	export default {
		components: {
			listempty,
			nomore
		},
		data() {
			return {
				queryParam:{
					pageNumber: 1,
					pageSize: 99999,
					callBackExtData: uni.$utils.getRandom()
				},
				waitAcceptCount:'',
				waitAcceptMoneySum:'',
				list:{
					loading: false,
					pageCount:0,
					total:0,
					rows:[]
				}
			}
		},
		onLoad() {
			this.getData()
			this.onFetchData()
		},
		onReachBottom(e){
			console.log('onReachBottom',e)
			if(this.queryParam.pageNumber<=this.list.pageCount){
				this.onFetchData()
			}
		},
		methods: {
			getData(){
				uni.$api.getDataByBalanceShareSendNotHandleList().then(res =>{
					let data = res.data || {}
					this.waitAcceptMoneySum = data.waitAcceptMoneySum
					this.waitAcceptCount = data.waitAcceptCount
				})
			},
			onFetchData(){
				if (this.list.loading) return;
				this.list.loading = true
				uni.$api.getBalanceShareSendNotHandleList(this.queryParam).then(res =>{
					console.log('res',res)
					this.list.loading = false
					if (res.callBackExtData == this.queryParam.callBackExtData){
						this.list.rows = this.list.rows.concat(res.rows)
						this.list.pageCount = res.pageCount
						this.list.total = res.total
						this.queryParam.pageNumber ++ 
					}
				}).catch(()=>{
					this.list.loading = false
				})
			},
			gotoHistory(){
				uni.navigateTo({
					url: '/pages/user/cooperauction/historyagreed'
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
</style>
