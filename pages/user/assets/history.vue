<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">提现历史</block>
		</cu-custom>
		<view class="container">
			<view class="history-list mb20" v-for="item in list.rows">
				<view class="flex-between ac mb16">
					<view class="dflex ac">
						<view class="fs-30 lh-44 fc-303 mr24">{{item.withdrawCardBankName}}&nbsp; 提现{{item.withdrawMoney}}<text class="fs-26 lh-36 fc-ff4 ml10" v-if="item.withdrawCouponUserKeyId">(已用券)</text></view>
						<view class="fs-26 lh-36 fc-ff4">{{item.withdrawStatusStr}}</view>
					</view>
					<view class="fs-36 lh-44 fw-b fc-303">实到{{item.withdrawRealMoney}}</view>
				</view>
				<view class="flex-between ac">
					<view class="fs-24 lh-34 fc-939">{{item.withdrawCardNoStr}}&nbsp;手续费{{item.withdrawFee}}</view>
					<view class="fs-24 lh-34 fc-939">{{item.withdrawAddTime}}</view>
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
				},
				list:{
					loading: false,
					pageCount:0,
					rows:[]
				}
			}
		},
		onLoad(){
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
				uni.$api.getHistoryByWithdraw(this.queryParam).then(res =>{
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
			}
		}
	}
</script>

<style>
.container {
	padding: 8rpx 20rpx;
}
.history-list {
	padding: 24rpx 20rpx;
	border-radius: 20rpx;
	background-color: #fff;
}
</style>
