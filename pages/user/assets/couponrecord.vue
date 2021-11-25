<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true">
			<block slot="content">卡券中心</block>
		</cu-custom>
		<picker mode="selector" :range="couponTypes" range-key="name" @change="couponTypeSelect" class="dflex ac">
			<view class="screen-type">
				<view class="fs-28 lh-28 fc-3 mr12">{{couponTypeName || '类型筛选'}}</view>
				<image src="../../../static/img/icon/dropdown.png" mode="widthFix" class="dropdown"></image>
			</view>
		</picker>
		<view class="bg-white">
			<scroll-view scroll-y="true" :style="'max-height: calc(100vh - 86rpx - ' + CustomBar +'px)'" @scrolltolower="fetchData">
				<view class="record-list" v-for="(coupon,index) in couponUseList">
					<view class="fs-30 lh-30 fc-3 fw-b mb24">{{coupon.couponTypeName}}</view>
					<view class="fs-26 lh-26 fc-3 mb20">{{coupon.withdrawMoney || coupon.lotName}}</view>
					<view class="fs-26 lh-26 fc-9">{{coupon.couponUserUseTime}}</view>
					<image src="../../../static/img/icon/used.png" mode="widthFix" class="coupon-used"></image>
				</view>
				<listempty :list="couponUseList" :loading="couponUseListLoading"></listempty>
				<nomore :pageCount="queryObj.pageCount" :pageNumber="queryObj.pageNumber"></nomore>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	import listempty from 'pages/component/listempty.vue';
	import nomore from 'pages/component/nomore.vue';
	
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				couponUseList:[],
				couponTypes:[],
				couponUseListLoading:false,
				couponTypeName:'',
				queryObj:{
					pageSize:10,
					pageNumber:0,
					pageCount:99,
					couponType:""
				}
			}
		},
		components: {
			listempty,
			nomore
		},
		computed: {
			style() {
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
		},
		created() {
			this.initDict();
		},
		onShow(){
			this.refreshPage();
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh")
			this.refreshPage()
			setTimeout(function (){
				uni.stopPullDownRefresh()
			},1000)
		},
		onReachBottom(e) {
			this.fetchData()
		},
		methods: {
			couponTypeSelect (e) {
				var value = e.detail.value
				this.queryObj.couponType = this.couponTypes[value].value
				this.couponTypeName = this.couponTypes[value].name
				this.getFirstPage()
			},
			initDict(){
				var data = {
					dictKey:"shop_dict_goodsCouponType"
				}
				uni.$api.getDictList(data).then(res => {
					this.couponTypes = res.rows
				})
			},
			fetchData () {
				if (this.couponUseListLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
					return;
				}
				this.couponUseListLoading = true
				this.queryObj.pageNumber++
				console.log(JSON.stringify(this.queryObj))
				uni.$api.getCountUseHistory(this.queryObj).then(res => {
					var dataList = res.rows || []
					this.couponUseList = this.couponUseList.concat(dataList)
					this.couponUseListLoading = false
					this.queryObj.pageCount = res.pageCount || 99
				}).catch(res => {
					uni.$toast.showError(res.message)
					this.couponUseListLoading = false
				})
			},
			refreshPage () {
				this.couponUseList = []
				this.fetchData()
			},
			getFirstPage () {
				this.queryObj.pageNumber = 0
				this.refreshPage()
			},
			resetQuery () {
				this.queryObj = {
					pageSize:10,
					pageNumber:0,
					pageCount:99,
					couponType:""
				}
				this.couponTypeName = ""
			}
		}
	}
</script>

<style>
.screen-type {
	height: 86rpx;
	padding: 0 28rpx;
	display: flex;
	align-items: center;
}
.dropdown {
	width: 24rpx;
	height: 16rpx;
}
.record-list {
	width: calc(100% - 60rpx);
	margin: 0 auto;
	padding: 40rpx 0 30rpx;
	position: relative;
}
.coupon-used {
	position: absolute;
	top: 48rpx;
	right: 1rpx;
	width: 119rpx;
}
.record-list + .record-list {
	border-top: 1rpx solid #e5e5e5;
	box-sizing: content-box;
}
</style>
