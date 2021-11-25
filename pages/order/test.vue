
<template v-if="old>0">
	<view>
		<image src="/static/img/bg/user-bg.png" class="user-index-bg" mode="widthFix"></image>
		<view style="height: 60rpx;"></view>
		<view class="cu-bar">
			<view class="action pr">
				<!-- <navigator url="/pages/user/message">
					<image src="/static/img/icon/message-icon@2x.png" mode="" class="m-icon"></image>
					<view class="new-message" v-if="notReadMsgNum > 0"></view>
				</navigator> -->
			</view>
			<view class="action">
				<navigator url="/pages/user/set">
					<image src="/static/img/icon/set-icon@2x.png" mode="" class="m-icon"></image>
				</navigator>
			</view>
		</view>
		<view class="user-info dflex ac pt0 mt-12">
			<image class="user-image" :src="user.userPhoto?user.userPhoto:'/static/img/icon/default-user.png'"></image>
			<view class="dflex fdc jc-fs">
				<view class="fs-36 lh-48 fc-f fw-b mb12">{{user.userCertName}}
					<template v-if="user.userNickName">({{user.userNickName}})</template>
				</view>
				<view class="fs-26 lh-32 fc-f op8">{{user.mobile}}</view>
			</view>
		</view>
		<view class="user-info user-assets dflex mb28">
			<view class="all flex-center fdc">
				<view class="fs-36 lh-36 fc-f dflex ai-fe mb8">
					<view class="fs-24 lh-28">￥</view>15230
				</view>
				<view class="fs-26 lh-36 fc-f op8">零钱</view>
			</view>
			<view class="assets-type">
				<view class="type-list flex-center fdc">
					<view class="fs-36 lh-36 fc-f dflex ac mb8">
						<!-- <view class="fs-48 lh-28 mr8">+</view> -->
						<view class="fs-48 lh-28 mr8">-</view>
						6.65%
					</view>
					<view class="fs-26 lh-36 fc-f op8">盈亏比</view>
				</view>
				<view class="type-list flex-center fdc">
					<view class="fs-36 lh-36 fc-f dflex ai-fe mb8">
						<view class="fs-24 lh-28">￥</view>15230
					</view>
					<view class="fs-26 lh-36 fc-f op8">累计收益</view>
				</view>
				<view class="type-list flex-center fdc">
					<view class="fs-36 lh-36 fc-f dflex ai-fe mb8">
						<view class="fs-24 lh-28">￥</view>15230
					</view>
					<view class="fs-26 lh-36 fc-f op8">累计充值</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="user-info-list">
				<view class="user-info-title" @tap="toAuctionGoods()">
					<view class="dflex ac">
						<image src="../../static/img/icon/user-info-icon1@2x.png" mode="" class="m-icon mr20"></image>
						<text class="fs-28 lh-28 fc-303">拓客管理</text>
					</view>
					<image src="../../static/img/icon/more-icon.png" mode="widthFix" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toAuctionGoods()">
						<image src="../../static/img/icon/invite-icon.png" mode="" class="invite-icon mb8"></image>
						<view class="fs-26 lh-36 fc-606">我要邀请</view>
					</view>
					<view class="flex-center fdc">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{user.userCount.recUserCount || 0}}</view>
						<view class="fs-26 lh-36 fc-606">直推会员</view>
					</view>
					<view class="flex-center fdc">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{user.userCount.secondRecUserCount || 0}}</view>
						<view class="fs-26 lh-36 fc-606">间推会员</view>
					</view>
				</view>
			</view>
			<view class="user-info-list banner" @click.stop="toBlindBox" v-if="onSaleGameBoxCount > 0">
				<image class="wp100" src="../../static/img/images/blind-banner.png" mode="widthFix"></image>
			</view>
			<view class="user-info-list">
				<view class="user-info-title" @tap="toAuctionGoods()">
					<view class="dflex ac">
						<image src="../../static/img/icon/user-info-icon2@2x.png" mode="" class="m-icon mr20"></image>
						<text class="fs-28 lh-28 fc-303">我的拍品</text>
					</view>
					<image src="../../static/img/icon/more-icon.png" mode="widthFix" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toAuctionGoods()">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{lots.all}}</view>
						<view class="fs-26 lh-36 fc-606">全部</view>
					</view>
					<view class="flex-center fdc" @tap="toAuctionGoods('?lotType=1')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{lots.sale}}</view>
						<view class="fs-26 lh-36 fc-606">已拍下</view>
					</view>
					<view class="flex-center fdc" @tap="toAuctionGoods('?lotType=2')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{lots.handUp}}</view>
						<view class="fs-26 lh-36 fc-606">转卖中</view>
					</view>
					<view class="flex-center fdc" @tap="toAuctionGoods('?lotType=3')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{lots.take}}</view>
						<view class="fs-26 lh-36 fc-606">留下自用</view>
					</view>
				</view>
			</view>
			<view class="user-info-list">
				<view class="user-info-title" @tap="toPpRecords()">
					<view class="dflex ac">
						<image src="../../static/img/icon/user-info-icon5@2x.png" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303">拍品拍卖记录</text>
					</view>
					<image src="../../static/img/icon/more-icon.png" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toPpRecords('?auctionLotHangupStatus=2')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{auctionLots.onSale}}</view>
						<view class="fs-26 lh-36 fc-606">拍卖中</view>
					</view>
					<view class="flex-center fdc" @tap="toPpRecords('?auctionLotHangupStatus=4')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{auctionLots.sell}}</view>
						<view class="fs-26 lh-36 fc-606">已拍出</view>
					</view>
					<view class="flex-center fdc" @tap="toPpRecords('?auctionLotHangupStatus=3')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{auctionLots.passIn}}</view>
						<view class="fs-26 lh-36 fc-606">已流拍</view>
					</view>
				</view>
			</view>
			<view class="user-info-list" v-if="exchangeApplyStatistics.enable">
				<view class="user-info-title" @tap="toPpSubstitution()">
					<view class="dflex ac">
						<image src="../../static/img/icon/user-info-icon5@2x.png" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303">拍品置换管理</text>
					</view>
					<image src="../../static/img/icon/more-icon.png" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toPpSubstitution()">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{exchangeApplyStatistics.totalCount}}</view>
						<view class="fs-26 lh-36 fc-606">全部</view>
					</view>
					<view class="flex-center fdc" @tap="toPpSubstitution('?status=0')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{exchangeApplyStatistics.applyCount}}</view>
						<view class="fs-26 lh-36 fc-606">申请置换</view>
					</view>
					<view class="flex-center fdc" @tap="toPpSubstitution('?status=1')">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{exchangeApplyStatistics.successCount}}</view>
						<view class="fs-26 lh-36 fc-606">已置换</view>
					</view>
					<view class="flex-center fdc" @tap="toSubstitution">
						<view class="fs-36 lh-48 fc-303 fw-b mt6 mb16">{{exchangeApplyStatistics.lotCount}}</view>
						<view class="fs-26 lh-36 fc-606">可置换</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
