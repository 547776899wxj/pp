<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的消息</block>
		</cu-custom>
		<view class="container">
			<view class="message-list" v-for="(item,index) in messageList" :key="index">
				<view class="flex-between ac message-head mb20">
					<view class="fs-26 lh-36 fc-939">{{item.userMsgTitle}}</view>
					<view class="fs-26 lh-36 fc-939">{{item.userMsgCreateTime}}</view>
				</view>
				<view class="fs-30 lh-48 fc-303">{{item.userMsgContent}}</view>
			</view>
			<listempty :list="messageList" :loading="messageLoading"></listempty>
			<nomore :pageCount="queryObj.pageCount" :pageNumber="queryObj.pageNumber"></nomore>
		</view>
	</view>
</template>

<script>
	
	import listempty from 'pages/component/listempty.vue';
	import nomore from 'pages/component/nomore.vue';
	
	export default {
		data() {
			return {
				messageList:[],
				messageLoading:false,
				queryObj:{
					pageNumber:0,
					pageSize:20,
					pageCount:99
				}
			}
		},
		components:{
			listempty,
			nomore
		},
		onPullDownRefresh() {
			this.refreshPage()
		},
		onReachBottom(e) {
			this.getMsgList()
		},
		onShow () {
			this.getMsgList()
			this.readAllMsg()
		},
		methods: {
			getMsgList () {
				if (this.messageLoading || this.queryObj.pageNumber >= this.queryObj.pageCount) {
					return;
				}
				this.messageLoading = true
				this.queryObj.pageNumber++
				uni.$api.getMsgList(this.queryObj).then(res => {
					var list = res.rows || []
					this.messageList = this.messageList.concat(list)
					this.messageLoading = false
					this.queryObj.pageCount = res.pageCount || 99
				}).catch( res => {
					uni.$toast.showError(res.message)
					this.messageLoading = false
				})
			},
			readAllMsg () {
				uni.$api.readAllMsg()
			},
			refreshPage () {
				this.resetQuery()
				this.getMsgList()
			},
			resetQuery () {
				this.queryObj.pageNumber = 0;
				this.queryObj.pageCount = 99;
				this.messageList = [];
			},
		}
	}
</script>

<style>
.container {
	padding: 8rpx 20rpx;
}
.message-list {
	padding: 0 20rpx 20rpx;
	border-radius: 20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}
.message-head {
	height: 84rpx;
	border-bottom: 2rpx solid #f7f7fa;
}
</style>
