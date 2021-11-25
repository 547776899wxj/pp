<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">拓客详情</block>
		</cu-custom>
		<view class="container">
			<!-- <view class="toker-info mb20">
				<view class="dflex ac mb24">
					<view class="info-title fs-28 fc-939 lh-40">姓名</view>
					<view class="fs-28 fc-303 lh-40">{{info.userCertName}}</view>
				</view>
				<view class="dflex ac mb24">
					<view class="info-title fs-28 fc-939 lh-40">手机号码</view>
					<view class="fs-28 fc-303 lh-40">{{info.mobile}}</view>
				</view>
				<view class="dflex ac">
					<view class="info-title fs-28 fc-939 lh-40">消费额</view>
					<view class="fs-28 fc-ff4 lh-40">￥{{info.userConsumeMoneySum}}</view>
				</view>
			</view> -->
			<view class="toker-box mb20">
				<view class="toker-info dflex ac">
					<image :src="info.userPhoto || '/static/img/icon/default-user.png'" mode="" class="toker-head"></image>
					<view class="dflex fdc ai-fs flex-1">
						<view class="fs-28 lh-28 fc-3 mb10">{{info.userCertName}}（{{info.mobile}}）</view>
						<view class="fs-24 lh-24 fc-9 mb10">账户状态：{{info.userMoneyShareStatus==1?'合拍账户':'普通'}}</view>
						<view class="dflex jc-end ai-fe wp100">
							<view class="fs-20 lh-20 fc-3 mr10">消费额</view>
							<view class="fs-36 lh-28 fc-fb2">￥{{info.userConsumeMoneySum}}</view>
						</view>
					</view>
				</view>
				<view class="toker-btn-box dflex jc-end" v-if="info.level == 1">
					<view class="toker-btn flex-center fs-24 lh-24 fc-d52" v-if="info.userMoneyShareStatus==1" @click="gotoAccountDetail">查看详情</view>
					<view class="toker-btn flex-center fs-24 lh-24 fc-d52" v-else @click="gotoUpBalanceShare">升级合拍账户</view>
				</view>
			</view>
			<view class="">
				<view class="dflex ac screen-record">
					<view class="fs-26 lh-90 mr14" :class="{cur:tabbarIndex==0}"  @click="tabbarIndex=0,reset(),onFetchData()">交易记录 <view class="cur-icon"></view></view>
					<view class="fs-26 lh-90" :class="{cur:tabbarIndex==1}" @click="tabbarIndex=1,reset(),onFetchData()">流拍记录<view class="cur-icon"></view></view>
				</view>
				<view class="order-list" v-for="item in list.rows">
					<view class="flex-between ac mb32">
						<view class="fs-24 lh-34 fc-303">{{item.createTime}}</view>
						<view class="fs-24 lh-34 fc-ff4">{{item.statusStr}}</view>
					</view>
					<view class="goods-info dflex ai-fs mb16">
						<image :src="item.goodsImage" class="goods-image mr16" mode=""></image>
						<view class="flex-1">
							<view class="flex-between ai-fs mb16">
								<view class="goods-name">{{item.goodsName}}</view>
							</view>
							<!-- <view class="fs-24 lh-34 fc-939">{{item.goodsSubtitle}}</view> -->
						</view>
					</view>
					<view class="dflex ac jc-end tr" v-if="tabbarIndex!=0">
						<view class="fs-24 lh-34 fc-303">拍下价</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-30 lh-44 fc-303">{{item.lotInPrice}}</view>
					</view>
					<view class="dflex ac jc-end tr">
						<view class="fs-24 lh-34 fc-303">{{tabbarIndex==0?'交易金额':'挂拍价'}}</view>
						<text class="fs-24 fc-303">￥</text>
						<view class="fs-36 lh-44 fc-303 fw-b">{{item.lotOutPrice}}</view>
					</view>
				</view>
				
				<listempty :list="list.rows" :loading="list.loading"></listempty>
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
				tabbarIndex: 0,
				queryParam:{
					pageNumber: 1,
					callBackExtData: uni.$utils.getRandom(),
					userId: ''
				},
				info:{
					userId: '',
					level: 0,
					userCertName: '',
					mobile: '',
					userConsumeMoneySum: '',
				},
				list:{
					loading: false,
					pageCount:0,
					rows:[]
				}
			}
		},
		onLoad(options) {
			let userId = options.userId
			let level = options.level || 0
			console.log('接收到userId',userId)
			this.queryParam.userId = userId
			this.info.userId = userId
			this.info.level = level
			uni.$api.getUserInfoByTeam(this.queryParam).then(({data}) =>{
				this.info.userCertName = data.userCertName
				this.info.userPhoto = data.userPhoto
				this.info.mobile = data.mobile
				this.info.userConsumeMoneySum = data.userConsumeMoneySum
				this.info.userMoneyShareStatus = data.userMoneyShareStatus
			})
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
				console.log('onFetchData')
				if (this.list.loading) return;
				this.list.loading = true
				Promise.resolve().then(()=>{
					if (this.tabbarIndex == 0){
						return uni.$api.getBuyListByTeam(this.queryParam)
					}
					else {
						return uni.$api.getFlopListByTeam(this.queryParam)
					}
				}).then(res =>{
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
			reset(){
				console.log('reset')
				this.list={
					loading: false,
					pageCount:0,
					rows:[]
				}
				this.queryParam.pageNumber = 1
				this.queryParam.callBackExtData = uni.$utils.getRandom()
			},
			gotoUpBalanceShare(){
				let {userId} = this.info
				uni.navigateTo({
					url: `/pages/user/assets/levelaccount?up=1&acceptUserId=${userId}`
				})
			},
			gotoAccountDetail(){
				let {userId} = this.info
				uni.navigateTo({
					url:'/pages/user/cooperauction/detail?userId='+userId
				})
			}
			
			
		}
	}
</script>

<style>
.container {
	padding: 8rpx 20rpx;
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
.fc-d52 {
	color: #d52F2c;
}
.screen-record {
	width: calc(100% + 64rpx);
	height: 78rpx;
	margin-left: -32rpx;
	margin-top: -24rpx;
	border-bottom: 2rpx solid #f7f7fa;
	margin-bottom: 24rpx;
}
.screen-record > view {
	color: #939399;
	padding: 0 32rpx;
	height: 100%;
	position: relative;
}
.screen-record > view.cur {
	color: #FF411C;
}
.cur-icon {
	width: 80rpx;
	height: 4rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	display: none;
	background-color: #FF411C;
}
.screen-record > view.cur .cur-icon {
	display: block;
}
.order-list {
	padding: 16rpx 24rpx;
	border-radius: 20rpx;
	background-color: #fff;
}
.order-list+.order-list {
	margin-top: 24rpx;	
}
.goods-info+.goods-info {
	margin-top: 24rpx;
}
.goods-image {
	width: 160rpx;
	height: 160rpx;
}
.goods-name {
	width: 100%;
	font-size: 28rpx;
	color: #303133;
	line-height: 40rpx;
	display: -webkit-box;    
	-webkit-box-orient: vertical;    
	-webkit-line-clamp: 2;    
	overflow: hidden;
}
.fc-fb2 {
	color: #FB203A;
}
</style>
