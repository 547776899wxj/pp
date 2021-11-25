<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">历史共享记录</block>
		</cu-custom>
		<view class="container">
			<view class="history-list" v-for="item in list.rows">
				<view class="list-title flex-between ac">
					<view class="fs-24 lh-24 fc-9">共享时间 {{item.balanceShareNoteAddTime}}</view>
				</view>
				<view class="list-content">
					<image :src="item.acceptUserPhoto ||'/static/img/icon/default-user.png'" mode="" class="user-head"></image>
					<view class="list-info">
						<view class="fs-28 lh-28 fc-3 mb10">{{item.acceptUserCertName}}（{{item.acceptMobile}}）</view>
						<view class="fs-24 lh-24 fc-9 mb18">取消共享时间 {{item.balanceShareNoteEndTime}}</view>
						<view class="flex-between ai-fe">
							<view class="fs-20 lh-20 fc-9 mb2">合拍收益：{{item.balanceShareNoteProfitMoney}}</view>
							<view class="dflex ai-fe">
								<view class="fs-24 lh-24 fc-9">共享金额</view>
								<view class="fs-32 lh-24 fc-3">￥{{item.balanceShareNoteMoney}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<listempty :list="list.rows" :loading="list.loading"></listempty>
			<nomore :pageCount="list.pageCount" :pageNumber="queryParam.pageNumber"></nomore>
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
					callBackExtData: uni.$utils.getRandom()
				},
				list:{
					loading: false,
					pageCount:0,
					rows:[]
				}
			}
		},
		onLoad() {
			this.onFetchData()
		},
		onReachBottom(e){
			console.log('onReachBottom',e)
			if(this.queryParam.pageNumber<=this.list.pageCount){
				this.onFetchData()
			}
		},
		methods: {
			onFetchData(){
				if (this.list.loading) return;
				this.list.loading = true
				uni.$api.getBalanceShareNoteHistoryList(this.queryParam).then(res =>{
					console.log('res',res)
					this.list.loading = false
					if (res.callBackExtData == this.queryParam.callBackExtData){
						this.list.rows = this.list.rows.concat(res.rows)
						this.list.pageCount = res.pageCount
						this.queryParam.pageNumber ++ 
					}
				}).catch(()=>{
					this.list.loading = false
				})
			},
		}
	}
</script>

<style>
.container {
	padding: 20rpx 32rpx;
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
</style>
