<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">VIP券管理</block>
		</cu-custom>
		<view class="container">
			<!-- 滚动一个vip券的距离显示（以后） -->
			<view class="flex-between ac screen-record fixed" v-show="showSticky">
				<view @click="queryObj.couponType=1,getAuctionCoupons()" class="fs-26 lh-76" :class="{
					cur:queryObj.couponType===1
				}">使用记录({{useCount}}) <view class="cur-icon"></view></view>
				<view @click="queryObj.couponType=2,getAuctionCoupons()" class="fs-26 lh-76" :class="{
					cur:queryObj.couponType===2
				}">赠送记录({{sendCount}}) <view class="cur-icon"></view></view>
				<view @click="queryObj.couponType=3,getAuctionCoupons()" class="fs-26 lh-76" :class="{
					cur:queryObj.couponType===3
				}">获取记录({{receiveCount}})<view class="cur-icon"></view></view>
			</view>
			<scroll-view scroll-y="true" :style="'height: calc(100vh - 48rpx - ' + CustomBar +'px)'" @scroll="scroll" @scrolltolower="loadMore">
				<view>
					<view class="vip-coupon mb20">
						<image src="../../static/img/bg/vipcoupon-bg@2x.png" class="wp100 hp100" mode=""></image>
						<view class="coupon-number dflex jc-c ai-fe">
							<view class="fs-64 lh-80 fc-f fw-b mr8">{{couponCount}}</view>
							<view class="fs-28 fc-f lh-40 mb10">张</view>
						</view>
						<image src="../../static/img/images/transfer@2x.png" v-if="canSend" class="transfer-btn" mode="" @tap="showSendDialog=true"></image>
					</view>
					<view class="vip-record">
						<view class="record-list">
							<view class="flex-between ac screen-record ">
								<view @click="queryObj.couponType=1,getAuctionCoupons()" class="fs-26 lh-76" :class="{
									cur:queryObj.couponType===1
								}">使用记录({{useCount}}) <view class="cur-icon"></view></view>
								<view @click="queryObj.couponType=2,getAuctionCoupons()" class="fs-26 lh-76" :class="{
									cur:queryObj.couponType===2
								}" v-if="canSend">赠送记录({{sendCount}}) <view class="cur-icon"></view></view>
								<view @click="queryObj.couponType=3,getAuctionCoupons()" class="fs-26 lh-76" :class="{
									cur:queryObj.couponType===3
								}">获取记录({{receiveCount}})<view class="cur-icon"></view></view>
							</view>
							<view class="record-list"  v-for="(item,index) in couponList" v-if="index===0" :key="queryObj.couponType+'-'+index">
								<template v-if="queryObj.couponType===1">
									<view class="flex-between ac mb8">
										<view class="fs-30 lh-44 fc-303">{{item.auctionName}}</view>
										<view class="fs-22 lh-32 fc-ff4">已使用</view>
									</view>
									<view class="fs-24 lh-34 fc-939">{{item.couponUserUseTime}}</view>
								</template>
								<template v-if="queryObj.couponType===2">
									<view class="flex-between ac mb8">
										<view class="fs-30 lh-44 fc-303">赠送给{{item.receiveUserName}}</view>
										<view class="fs-22 lh-32 fc-ff4">已赠送</view>
									</view>
									<view class="fs-24 lh-34 fc-939">{{item.couponUserTransferTime}}</view>
								</template>	
								<template v-if="queryObj.couponType===3">
									<view class="flex-between ac mb8">
										<view class="fs-30 lh-44 fc-303" v-if="item.couponTransferUserId==='0'">系统发放</view>
										<view class="fs-30 lh-44 fc-303" v-else>他人赠送（{{item.transferUserName}}）</view>
										<view class="fs-22 lh-32 fc-ff4">{{item.couponTransferAmount}}</view>
									</view>
									<view class="fs-24 lh-34 fc-939">{{item.couponUserTransferTime}}</view>
								</template>
							
							</view>
							<listempty :list="couponList"/>
						</view>
						<view class="record-list"  v-for="(item,index) in couponList" v-if="index>0" :key="queryObj.couponType+'-'+index">
							<template v-if="queryObj.couponType===1">
								<view class="flex-between ac mb8">
									<view class="fs-30 lh-44 fc-303">{{item.auctionName}}</view>
									<view class="fs-22 lh-32 fc-ff4">已使用</view>
								</view>
								<view class="fs-24 lh-34 fc-939">{{item.couponUserUseTime}}</view>
							</template>
							<template v-if="queryObj.couponType===2">
								<view class="flex-between ac mb8">
									<view class="fs-30 lh-44 fc-303">赠送给{{item.receiveUserName}}</view>
									<view class="fs-22 lh-32 fc-ff4">已赠送</view>
								</view>
								<view class="fs-24 lh-34 fc-939">{{item.couponUserTransferTime}}</view>
							</template>	
							<template v-if="queryObj.couponType===3">
								<view class="flex-between ac mb8">
									<view class="fs-30 lh-44 fc-303" v-if="item.couponTransferUserId==='0'">系统发放</view>
									<view class="fs-30 lh-44 fc-303" v-else>他人赠送（{{item.transferUserName}}）</view>
									<view class="fs-22 lh-32 fc-ff4">{{item.couponTransferAmount}}</view>
								</view>
								<view class="fs-24 lh-34 fc-939">{{item.couponUserTransferTime}}</view>
							</template>
						
						</view>
						
						<nomore :pageCount="pageCount" :pageNumber="queryObj.pageNumber"/>
					</view>
				</view>
			</scroll-view>
			<view class="cu-modal" :class="showSendDialog?'show':''" >
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">转赠VIP券</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="cu-form-group">
							<view class="title">赠送用户手机号</view>
							<input placeholder="赠送用户手机号" v-model="transferObj.mobile" maxlength="11"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">赠送数量</view>
							<input type="number" placeholder="赠送数量" v-model="transferObj.amount" maxlength="2"></input>
						</view>
					</view>
					<view class="padding-lg pt0">
						<view class="flex-center">
							<button class="l-btn flex-center bg-grey line-de6 mr40" @tap="hideModal">取消</button>
							<button class="l-btn flex-center m-bg-pp fc-f" @tap="transferAuctionCouponToUser">确定</button>
			
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listempty from '../component/listempty.vue';
	import nomore from '../component/nomore.vue';
	export default {
		components: {
			listempty,
			nomore
		},
		data() {
			return {
				couponList:[],
				more:'loading',
				couponCount:'',
				showSendDialog:false,
				showSticky:false,
				canSend:false,
				useCount:'',
				sendCount:'',
				receiveCount:'',
				pageCount:0,
				pageIndex:0,
				queryObj:{
					couponType:1,
					pageNumber:1
				},
				transferObj:{
					mobile:'',
					amount:1
				},
				CustomBar: this.CustomBar,
			}
		},
		computed: {
			style() {
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
		},
		onShow() {
			this.getAuctionCoupons()
		},
		onPullDownRefresh() {
			setTimeout(uni.stopPullDownRefresh,500)
			this.getAuctionCoupons()
		},
		methods: {
			hideModal(){
				this.showSendDialog=false
			},
			transferAuctionCouponToUser(){
				const transferObj = this.transferObj
				if(!transferObj.mobile || transferObj.mobile.length<11){
					uni.$toast.showError('请输入正确的手机号')
					return
				}else if(!transferObj.amount){
					
					uni.$toast.showError('请输入正确的数量')
					return
				}
				uni.$api.transferAuctionCouponToUser(transferObj).then(res => {
					this.hideModal()
					uni.$toast.showSuccess('赠送成功')
					
				}).catch(e => uni.$toast.showError(e.message))
			},
			getAuctionCoupons(){
				this.couponList = []
				this.queryObj.pageNumber = 1
				this.getAuctionCouponsCount()
				uni.$api.getAuctionCoupons(this.queryObj).then(res => {
					this.couponList = res.rows||[]
					this.pageIndex = res.pageIndex
					this.pageCount = res.pageCount
				})
			},
			getAuctionCouponsCount(){
				uni.$api.getAuctionCouponsCount(this.queryObj).then(res => {
					this.couponCount = res.data || 0
					this.useCount = res.useCount || 0
					this.sendCount = res.sendCount || 0
					this.receiveCount = res.receiveCount || 0
					this.canSend = res.canSend || false
				})
			},
			loadMore() {
				if(this.queryObj.pageNumber<this.pageCount){
					this.queryObj.pageNumber ++ 
					uni.$api.getAuctionCoupons(this.queryObj).then(res => {
						this.couponList.push(...res.rows)
					})
				}
				
			},
			scroll(e) {
				const {scrollTop} = e.detail
				if(scrollTop>=150){
					this.showSticky = true
				}else{
					this.showSticky = false
				}
			}
		}
	}
</script>

<style>
.container {
	padding: 24rpx 32rpx;
	position: relative;
}
.vip-coupon {
	width: 100%;
	height: 200rpx;
	position: relative;
}
.coupon-number {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 40rpx;
	margin: 0 auto;
}
.transfer-btn {
	width: 190rpx;
	height: 64rpx;
	position: absolute;
	right: 38rpx;
	bottom: 44rpx;
	z-index: 2;
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
.fixed.screen-record {
	position: absolute;
	top: 0;
	left: 0;
	padding: 0 32rpx;
	width: 100%;
	background-color: #fff;
	margin: 0;
	bottom: 0;
	z-index: 3;
}
.record-list {
	padding: 24rpx 32rpx 32rpx;
	border-radius: 20rpx;
	background-color: #fff;
	overflow: hidden;
	margin-bottom: 20rpx;
}
</style>
