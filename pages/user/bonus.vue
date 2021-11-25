<template>
	<view>
		<image src="../../static/img/bg/bonus-bg@2x.png" class="wp100 bonus-bg" mode="widthFix"></image>
		<cu-custom bgColor="bg-headunset" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">当前奖金池</block>
		</cu-custom>
		<view class="container">
			<view class="flex-center mb32">
				<view class="fs-64 lh-80 fc-f fw-b">{{pool.shopBonusMoney||0}}</view>
			</view>
			<view class="bonus-ranking flex-center mb22">
				<view class="wp50 flex-center fdc">
					<view class="fs-24 fc-f op75 lh-34 mb8">我的排名</view>
					<view class="dflex ac" v-if="user">
						<view class="fs-36 lh-44 fc-f fw-b mr6">{{user.userYestodaySort}}</view>
						<template v-if="user.userYestodaySortUp>0">
							<image src="../../static/img/icon/arrow@2x.png"
							 class="arrow-icon" 
							 mode="" 
							 >{{user.userYestodaySortUp}}</image>
						</template>
						<template v-if="user.userYestodaySortUp<0">
							<image src="../../static/img/icon/arrow-down@2x.png"
							 class="arrow-icon" 
							 mode="" 
							 >{{user.userYestodaySortUp}}</image>
						</template>
					</view>
					<view class="dflex ac" v-else>
						<view class="fs-36 lh-44 fc-f fw-b mr6">未登录</view>
					</view>
				</view>
				<view class="ranking-line"></view>
				<view class="wp50 flex-center fdc" v-if="user">
					<view class="fs-24 fc-f op75 lh-34 mb8">我的拍客积分</view>
					<view class="fs-36 lh-44 fc-f fw-b mr6">{{user.userTeamConsumeMoneySum}}</view>
				</view>
				<view class="wp50 flex-center fdc" v-else>
					<view class="fs-24 fc-f op75 lh-34 mb8">我的拍客积分</view>
					<view class="fs-36 lh-44 fc-f fw-b mr6">未登录</view>
				</view>
			</view>
			<template  v-if="user&&user.userYestodaySort>=rowsMaxLength">
				<image src="../../static/img/bg/talk-bg@2x.png" class="talk-image" mode=""></image>
				<view class="fs-20 lh-28 fc-ffd pl38 mb38">您的排名不足，请再接再励哦~</view>
			</template>
			<view class="rank-top">
				<view class="rank flex-center fdc" v-if="first">
					<view class="no1 flex-center mb10">
						<!-- <image src="../../static/img/example/auction1@2x.png" class="rank-user-image" mode=""></image> -->
						<image :src="first.userPhoto" class="rank-user-image" mode=""></image>
						<image src="../../static/img/icon/no.1@2x.png" class="crown" mode=""></image>
					</view>
					<view class="fs-24 fc-f lh-34 tc">{{first.userCertName || first.mobile}}</view>
				</view>
				<view class="rank2 flex-center fdc"v-if="second">
					<view class="no2 no2-address flex-center mb10">
						<image :src="first.userPhoto"  class="rank-user-image" mode=""></image>
						<image src="../../static/img/icon/no.1@2x.png" class="crown" mode=""></image>
					</view>
					<view class="fs-24 fc-f lh-34 tc">{{second.userCertName || second.mobile}}</view>
				</view>
				<view class="rank3 flex-center fdc" v-if="third">
					<view class="no3 no3-address flex-center mb10">
						<image :src="first.userPhoto"  class="rank-user-image" mode=""></image>
						<image src="../../static/img/icon/no.1@2x.png" class="crown" mode=""></image>
					</view>
					<view class="fs-24 fc-f lh-34 tc">{{third.userCertName || third.mobile}}</view>
				</view>
				<view class="stage">
					<image src="../../static/img/bg/stage-bg@2x.png" class="wp100 hp100" mode=""></image>
				</view>
				<view class="first-ranking flex-center fdc">
					<view class="fs-24 lh-34 fc-f op75 mb8">第一名</view>
					<template v-if="first">
						<view class="fs-32 lh-40 fc-f fw-b mb4">{{first.userTeamConsumeMoneySum}}</view>
						<view class="fs-26 lh-32 fc-ffd">{{(first.userTeamConsumeMoneySum/topSum) | formatDigitFloor}}</view>
					</template>
				</view>
				<view class="second-ranking flex-center fdc">
					<view class="fs-24 lh-34 fc-f op75 mb8">第二名</view>
					<template v-if="second">
						<view class="fs-32 lh-40 fc-f fw-b mb4">{{second.userTeamConsumeMoneySum}}</view>
						<view class="fs-26 lh-32 fc-ffd">{{(second.userTeamConsumeMoneySum/topSum) | formatDigitFloor}}</view>
					</template>
				</view>
				<view class="third-ranking flex-center fdc">
					<view class="fs-24 lh-34 fc-f op75 mb8">第三名</view>
					<template v-if="third">
						<view class="fs-32 lh-40 fc-f fw-b mb4">{{third.userTeamConsumeMoneySum}}</view>
						<view class="fs-26 lh-32 fc-ffd">{{(third.userTeamConsumeMoneySum/topSum) | formatDigitFloor}}</view>
					</template>
				</view>
			</view>
			<view class="rank-box" v-if="rows.length > 0">
				<view class="rank-list flex-between ac" v-for="(item,index) in rows">
					<view class="dflex ac">
						<view class="fs-28 fc-606 lh-34 mr32">{{(index +3) | formatNumber}}</view>
						<image :src="first.userPhoto"  class="ranking-head mr16" mode=""></image>
						<view class="fs-28 fc-303 lh-40">{{item.userCertName || item.mobile}}</view>
					</view>
					<view class="dflex fdc ai-fe">
						<view class="fs-30 lh-36 fc-303 fw-b mb6 mr4">{{item.userTeamConsumeMoneySum}}</view>
						<view class="fs-26 lh-32 fc-ff4">{{(item.userTeamConsumeMoneySum/topSum) | formatDigitFloor}}</view>
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
				user: '',
				pool: {},
				rows:[],
				first: '',
				second: '',
				third: '',
				rowsMaxLength:0,
				topSum:0
			}
		},
		onLoad() {
			this.onFetchData()
		},
		methods: {
			onFetchData(){
				uni.$api.getDataForBonusPool().then(res =>{
					let {pool={}, user, rows, rowsMaxLength=0,topSum=0} = res
					this.pool = pool
					this.user = user
					this.rows = rows
					this.topSum = topSum
					this.first = rows[0] || ''
					this.second = rows[1] || ''
					this.third = rows[2] || ''
					rows.splice(0,3)
					this.rowsMaxLength = rowsMaxLength
				})
			}
		}
	}
</script>

<style>
	.bonus-bg {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.container {
		position: relative;
		z-index: 2;
		padding: 0 32rpx 40rpx;
	}

	.arrow-icon {
		width: 12rpx;
		height: 23rpx;
	}

	.ranking-line {
		width: 2rpx;
		height: 40rpx;
		background-color: rgba(255, 255, 255, 0.2);
	}

	.bonus-ranking {
		width: 686rpx;
		height: 134rpx;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 20rpx;
		margin: 0 auto;
	}

	.rank-top {
		height: 496rpx;
		position: relative;
	}

	.no1 {
		width: 160rpx;
		height: 160rpx;
		background-color: #FFB83A;
		border-radius: 50%;
		margin: 38rpx auto 10rpx;
		position: relative;
	}

	.no1 .rank-user-image {
		width: 160rpx;
		height: 160rpx;
		border: 4rpx solid #FFB83A;
		border-radius: 50%;
	}

	.no1 .crown {
		width: 76rpx;
		height: 67rpx;
		position: absolute;
		left: -9rpx;
		top: -34rpx;
	}

	.no2,
	.no3 {
		width: 120rpx;
		height: 120rpx;
		background-color: #FFB83A;
		border-radius: 50%;
		margin: 0 auto 9rpx;
		position: relative;
	}

	.no2 .rank-user-image,
	.no3 .rank-user-image {
		width: 120rpx;
		height: 120rpx;
		border: 4rpx solid #FFB83A;
		border-radius: 50%;
	}

	.no2 .crown,
	.no3 .crown {
		width: 61rpx;
		height: 53rpx;
		position: absolute;
		left: -9rpx;
		top: -28rpx;
	}

	.rank2 {
		position: absolute;
		top: 136rpx;
		left: 35rpx;
	}

	.rank3 {
		position: absolute;
		top: 156rpx;
		right: 39rpx;
	}

	.stage {
		height: 277rpx;
		width: 679rpx;
		position: absolute;
		left: 4rpx;
		bottom: -26rpx;
	}

	.stage image {
		position: absolute;
		z-index: -1;
	}

	.first-ranking {
		position: absolute;
		bottom: 76rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.second-ranking {
		width: 180rpx;
		position: absolute;
		bottom: 28rpx;
		left: 26rpx;
	}

	.third-ranking {
		width: 180rpx;
		position: absolute;
		bottom: 4rpx;
		right: 32rpx;
	}

	.rank-box {
		padding: 8rpx 32rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.rank-list {
		padding: 24rpx 0;
	}

	.ranking-head {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
	}

	.talk-image {
		width: 342rpx;
		height: 48rpx;
		position: absolute;
		margin-top: -16rpx;
	}
</style>
