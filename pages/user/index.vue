<template>
	<view id="containerId">
		<image :src="domainStatic+'/img/bg/user-bg@2x.png'" class="user-index-bg" mode="widthFix"></image>
		<view style="height: 60rpx;"></view>
		<view class="cu-bar">
			<view class="action pr">
			</view>
			<!-- <view class="action">
				<navigator url="/pages/user/set">
					<image :src="domainStatic+'/img/icon/set-icon@2x.png'" mode="" class="m-icon"></image>
				</navigator>
			</view> -->
		</view>
		<view class="user-info flex-between ac">
			<view class="dflex fdc jc-fs">
				<view class="fs-44 lh-60 fc-0 fw-b mb10">{{user.userCertName}}
				<template v-if="user.userNickName">({{user.userNickName}})</template>
				</view>
				<view class="fs-26 lh-32 fc-939">{{user.mobile}}</view>
			</view>
			<navigator url="/pages/user/set">
				<image class="user-image" :src="user.userPhoto?user.userPhoto: domainStatic+ '/img/icon/default-user.png'"></image>
			</navigator>
		</view>
		<view class="container">
			<view class="user-info-list">
				<navigator url="/pages/user/assets">
				<view class="user-info-title">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/user-info-icon3@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">资产(￥)</text>
					</view>
					<image :src="domainStatic+'/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" v-for="(item,index) in money" :key="index">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{item.money}}</view>
						<view class="fs-24 lh-34 fc-939">{{item.name}}</view>
					</view>
				</view>
				</navigator>
			</view>
			<view class="user-info-list" @click.stop="toBlindBox" v-if="onSaleGameBoxCount > 0">
				<image class="wp100" :src="domainStatic+'/img/images/blind-banner.png'" mode="widthFix"></image>
			</view>
			<!-- <view class="user-info-list">
				<view class="user-info-title" @tap="toAuctionGoods()">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/user-info-icon2@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">我的拍品</text>
					</view>
					<image :src="domainStatic+/img/icon/more-icon.png" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toAuctionGoods()">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{lots.paipaiAll}}</view>
						<view class="fs-24 lh-34 fc-939">全部</view>
					</view>
					<view class="flex-center fdc" @tap="toAuctionGoods('?lotType=2')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{lots.paipaiSale}}</view>
						<view class="fs-24 lh-34 fc-939">已上架</view>
					</view>
					<view class="flex-center fdc" @tap="toAuctionGoods('?lotType=1')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{lots.paipaiHangup}}</view>
						<view class="fs-24 lh-34 fc-939">未上架</view>
					</view>
					<view class="flex-center fdc" @tap="toAuctionGoods('?lotType=4')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{lots.paipaiTake}}</view>
						<view class="fs-24 lh-34 fc-939">已售出</view>
					</view>
				</view>
			</view> -->
			<!-- <view class="user-info-list">
				<view class="user-info-title" @tap="toPpRecords()">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/user-info-icon5@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">拍品拍卖记录</text>
					</view>
					<image :src="domainStatic+'/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toPpRecords('?auctionLotHangupStatus=2')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{auctionLots.onSale}}</view>
						<view class="fs-24 lh-34 fc-939">拍卖中</view>
					</view>
					<view class="flex-center fdc" @tap="toPpRecords('?auctionLotHangupStatus=4')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{auctionLots.sell}}</view>
						<view class="fs-24 lh-34 fc-939">已拍出</view>
					</view>
					<view class="flex-center fdc" @tap="toPpRecords('?auctionLotHangupStatus=3')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{auctionLots.passIn}}</view>
						<view class="fs-24 lh-34 fc-939">已流拍</view>
					</view>
				</view>
			</view> -->
			<!-- <view class="user-info-list" v-if="exchangeApplyStatistics.enable">
				<view class="user-info-title" @tap="toPpSubstitution()">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/user-info-icon5@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">拍品置换管理</text>
					</view>
					<image :src="domainStatic+'/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" @tap="toPpSubstitution()">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{exchangeApplyStatistics.totalCount}}</view>
						<view class="fs-24 lh-34 fc-939">全部</view>
					</view>
					<view class="flex-center fdc" @tap="toPpSubstitution('?status=0')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{exchangeApplyStatistics.applyCount}}</view>
						<view class="fs-24 lh-34 fc-939">申请置换</view>
					</view>
					<view class="flex-center fdc" @tap="toPpSubstitution('?status=1')">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{exchangeApplyStatistics.successCount}}</view>
						<view class="fs-24 lh-34 fc-939">已置换</view>
					</view>
					<view class="flex-center fdc" @tap="toSubstitution">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{exchangeApplyStatistics.lotCount}}</view>
						<view class="fs-24 lh-34 fc-939">可置换</view>
					</view>
				</view>
			</view> -->
			<view class="user-info-list" v-if="waitDealBalanceShareShow">
				<navigator url="/pages/user/assets">
				<view class="user-info-title">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/user-info-icon6@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">{{waitDealBalanceShareTitle}}</text>
					</view>
					<image :src="domainStatic+'/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" v-for="(value,name) in waitDealBalanceShare" :key="name">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{value}}</view>
						<view class="fs-24 lh-34 fc-939">{{name}}</view>
					</view>
				</view>
				</navigator>
			</view>
			<view class="user-info-list" v-if="balanceShareShow">
				<navigator url="/pages/user/cooperauction">
				<view class="user-info-title">
					<view class="dflex ac">
						<image :src="domainStatic+'/img/icon/user-info-icon6@2x.png'" mode="" class="m-icon mr20"></image>
						<text class="fs-32 lh-32 fc-303 fw-b">{{balanceShareTitle}}</text>
					</view>
					<image :src="domainStatic+'/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
				<view class="user-info-data">
					<view class="flex-center fdc" v-for="(value,name) in balanceShare" :key="name">
						<view class="fs-36 lh-44 fc-303 fw-b mb8">{{value}}</view>
						<view class="fs-24 lh-34 fc-939">{{name}}</view>
					</view>
				</view>
				</navigator>
			</view>
			<view class="user-info-list user-info-data pt24 pb24">
				<navigator url="/pages/user/address">
				<view class="flex-center fdc">
					<image :src="domainStatic+'/img/icon/user-index-icon1@2x.png'" mode="" class="m-icon mb16"></image>
					<view class="fs-24 lh-34 fc-303">收货地址</view>
				</view>
				</navigator>
				<navigator url="/pages/info/servicecenter/servicecenter">
				<view class="flex-center fdc">
					<image :src="domainStatic+'/img/icon/user-index-icon2@2x.png'" mode="" class="m-icon mb16"></image>
					<view class="fs-24 lh-34 fc-303">服务中心</view>
				</view>
				</navigator>
				<navigator url="/pages/user/collection">
					<view class="flex-center fdc">
						<image :src="domainStatic+'/img/icon/user-index-icon5@2x.png'" mode="" class="m-icon mb16"></image>
						<view class="fs-24 lh-34 fc-303">拍品收藏</view>
					</view>
				</navigator>
				<navigator url="/pages/user/set">
					<view class="flex-center fdc">
						<image :src="domainStatic+'/img/icon/set-icon@2x.png'" mode="" class="m-icon mb16"></image>
						<view class="fs-24 lh-34 fc-303">用户设置</view>
					</view>
				</navigator>
			</view>
			<!-- tabbar 占位 -->
			<view style="height: (50px + env(safe-area-inset-bottom) / 2);min-height: 100rpx;"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onSaleGameBoxCount:0,
				ckVersion:'',
				user:{
					userSpread:{
						userInviteCode:""
					},
					userCount:{
						recUserCount:0,
						secondRecUserCount:0
					}
				},
				money:[],
				score:{},
				exchangeApplyStatistics:{},
				lots:{},
				auctionLots:{},
				balanceShare:{},
				balanceShareTitle: '',
				balanceShareShow: 0,
				waitDealBalanceShare:{},
				waitDealBalanceShareTitle: '',
				waitDealBalanceShareShow: 0,
				notReadMsgNum:0,
				domainStatic:this.domainStatic,
			}
		},
		mounted: function () {
			 uni.$utils.blankScreenWatchAndRelunch(this,'#containerId','/pages/user/index')
		},
		onShow() {
			this.ckVersion = uni.$session.getIosCkVersion() || ''
			if(uni.$auth.isLoginAndCheckPeopleStatus()) {
				this.getPageData()
				this.getNotReadMsgNum()
				this.getExchangeApplyStatistics()
			}
			uni.$utils.setTabBarOrderNum()
			uni.$api.getOnSaleGameBoxCount().then(res =>{
				this.onSaleGameBoxCount = res.count || 0
			})
		},
		methods: {
			
			getExchangeApplyStatistics(){
				uni.$api.getExchangeApplyStatistics().then(res=>{
					this.exchangeApplyStatistics = res.data
				})
			},
			toSubstitution() {
				uni.navigateTo({
					url: '/pages/user/substitution/substitution'
				})
			},
			toAuctionGoods(suffix = ''){
				uni.navigateTo({
					url:'/pages/user/auctiongoods'+suffix
				})
			},
			toPpRecords(suffix = ''){
				uni.navigateTo({
					url:'/pages/user/pprecord'+suffix
				})
			},
			toPpSubstitution(suffix = ''){
				uni.navigateTo({
					url:'/pages/user/ppsubstitution'+suffix
				})
			},
 			getNotReadMsgNum () {
				uni.$api.hasNotReadMsg().then(res => {
					this.notReadMsgNum = res.notReadMsgNum
				})
			},
			getPageData() {
				uni.$api.getMyIndexData().then(res => {
					if (res.success) {
						var {user,money,score,lots,auctionLots,
						balanceShare,balanceShareTitle='直推会员合拍账户管理',balanceShareShow,
						waitDealBalanceShare,waitDealBalanceShareTitle='合拍账户',waitDealBalanceShareShow} = res.data
						this.user = user
						this.money = money
						this.score = score
						this.lots = lots
						this.auctionLots = auctionLots
						this.balanceShare = balanceShare
						this.balanceShareTitle = balanceShareTitle
						this.balanceShareShow = balanceShareShow
						this.waitDealBalanceShare = waitDealBalanceShare
						this.waitDealBalanceShareTitle = waitDealBalanceShareTitle
						this.waitDealBalanceShareShow = waitDealBalanceShareShow
					} 
				})
			},
			shareUser () {
				var shareUrl = this.user.userShareUrl
				var title = this.user.userShareContent
				var desc = this.user.userShareContentDesc
				this.shareApi(shareUrl,title,desc)
			},
			shareApi (shareUrl,title,desc) {
				var params = {
					provider:"weixin",
					title:title,
					href:shareUrl,
					summary:desc || '',
					scene:"WXSceneSession",//场景值 WXSceneSession 聊天界面 WXSenceTimeline 分享到朋友圈 WXSceneFavorite 分享到微信收藏
					imageUrl:"https://pp.hoshiibuy.com/static/logo.png",
					success (res) {
						console.log("分享成功:"+JSON.stringify(res))
					},
					fail (res) {
						console.log("分享失败:"+JSON.stringify(res))
					}
				}
				uni.share(params)
			},
			toBlindBox () {
				uni.navigateTo({
					url:"/pages/user/blindbox"
				})
			},
		}
	}
</script>

<style scoped>
/* #ifdef MP-WEIXIN */
.cu-bar {
	box-shadow: none;
	top: 130rpx;
	bottom: auto;
}
.user-info{
	padding-top: 70rpx !important;
	height: 230rpx;
}
/* #endif */
.new-message {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: #FF411C;
	position: absolute;
	right: 0;
	top: 4rpx;
}
.user-index-bg {
	position: absolute;
	z-index: 0;
	width: 100%;
	top: 0;
	left: 0;
}
.user-info {
	padding: 12rpx 36rpx 24rpx;
	position: relative;
	z-index: 1;
}
.user-image {
	width: 112rpx;
	height: 112rpx;
	border-radius: 50%;
}
.container {
	padding: 0 20rpx 32rpx;
}
.user-info-list {
	width: 100%;
	background-color: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	position: relative;
	z-index: 1;
}
.user-info-list + .user-info-list {
	margin-top: 20rpx;
}
.user-invite {
	width: 100%;
	height: 120rpx;
	padding: 0 44rpx;
	background: url(https://pp.hoshiibuy.com/static/img/bg/user-invite-bg@2x.png) no-repeat;
	background-size: 100% 100%;
}
.invite-icon {
	width: 168rpx;
	height: 32rpx;
}
.invite-btn {
	width: 160rpx;
	height: 64rpx;
	border-radius: 60rpx;
	background: linear-gradient(118deg, #EFBD79 0%, #F9D29C 100%);
}
.user-info-title {
	padding: 22rpx 16rpx 0 24rpx;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}
.user-info-data {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 22rpx 0 24rpx;
}
</style>

