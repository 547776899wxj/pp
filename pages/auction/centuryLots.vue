<template>
	<view @touchstart="start" @touchend="end">
		<!--  @touchstart="start" @touchend="end" -->
		<image src="../../static/img/bg/goods-bg@2x.png" class="goods-index-bg" mode="widthFix"></image>
		<view style="height: 60rpx;"></view>
		<!-- 搜索框 -->
		<view class="flex-between ac pl32 pr32 auction-title-box">
			<view class="back-btn" @tap="back()">
				<text class="cuIcon-back fc-f"></text>
			</view>
			<view class="flex-center fdc auction-title-info">
				<view class="fs-36 lh-50 fc-f fw-b">{{auction.auctionName}}</view>
			</view>
			
		</view>
		<!-- 分类 -->
		<view class="pr">
			<view class="goods-navlist dflex ac pl16">
				<view class="goods-nav" :class="{'cur': catIndex === index }" v-for="(item,index) in cats"
					:key="item.goodsType" @click="catChangeEvent(item,index)">{{item.goodsTypeName}}
					<view class="cur-icon"></view>
				</view>
			</view>
			<!-- 	<view class="switchlist-btn" @click="changeListType" >
				<image
					:src="waterfall?'/static/img/icon/switchlist-icon@2x.png':'/static/img/icon/switchlist-icon2@2x.png'"
					mode=""></image>
			</view> -->
		</view>
		<!-- 商品列表 -->
		<view class="goods-box">
			<!-- <view class="auction-notice fs-26 lh-36 fc-303">
				<text class="fw-b">保障金</text>：为了保障抢拍的公平性！
			</view> -->
			<view class="auction-notice fs-26 lh-36 fc-303">
				<label class="wp100 dflex ac" @click="changeFollow">
					<checkbox class="hh-radio fs-0 mr16 round" :class="queryObj.followed?'checked':''"
						:checked="queryObj.followed"></checkbox>
					只看我关注的
				</label>
			</view>
			<view class="goods-container dflex" style="">
				<view class="hp100 list-trans" :class="{
									'list-transleft':showLeft,
									'list-transright':showRight
								}" v-show="showRight || showLeft">
					<view class="" style="width: 33.33%;">
						<view class="fs-0 hp100 wp100 pl20 pr20">
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" style="width: 33.33%;">
						<view class="fs-0 hp100 wp100 pl20 pr20">
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" style="width: 33.33%;">
						<view class="fs-0 hp100 wp100 pl20 pr20">
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
							<view class="goods-list">
								<image src="" class="skeleton skeleton-image goods-image" mode=""></image>
								<view class="goods-info">
									<view class="goods-name skeleton skeleton-name mb18"></view>
									<view class="flex-between ac mb36">
										<view class="skeleton skeleton-id"></view>
										<view class="dflex ac">
											<view class="skeleton skeleton-follow"></view>
										</view>
									</view>
									<view class="flex-between ai-fe">
										<view class="dflex ai-fs fdc">
											<view class="skeleton skeleton-id mb12"></view>
											<view class="skeleton skeleton-price"></view>
										</view>
										<view class="skeleton small-btn fc-f lh-60 tc m-bg-pp-unclick"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="fs-0 hp100 wp100 pl20 pr20" @scroll="onScroll"
					:scroll-top="scrollViewTop">
					<!-- 循环列表 -->
					<view>
						<view class="goods-list" v-for="(item,index) in lotList" :key="item.auctionLotAutoId+index"
							@tap="goToDetail(item)">
							<easyLoadimage :scroll-top="scrollTop" :image-src="item.lotImage" class="goods-image"
								mode=""></easyLoadimage>
							<view class="goods-info">
								<view class="goods-name mb18">{{item.lotName}}</view>
								<view class="flex-between ac mb36">
									<view class="fs-26 lh-36 fc-606 fw-b">
										拍品编号：{{item.lotId}}
									</view>
									<view class="dflex ac">
										<view class="fs-20 lh-28 fc-939 fs-0 mr8">关注</view>
										<image src="../../static/img/icon/follower@2x.png" mode=""
											@click.stop="followLot(item.auctionLotAutoId,index)" class="follow-icon"
											v-show="item.followed"></image>
										<image src="../../static/img/icon/follow@2x.png" mode=""
											@click.stop="followLot(item.auctionLotAutoId,index)" class="follow-icon"
											v-show="!item.followed"></image>
									</view>
								</view>
								<view class="flex-between ai-fe">
									<view class="dflex ai-fs fdc">
										<view class="fs-24 lh-32 fc-e31 dflex ac mb12">
											<text class="fs-22 fc-606">履约保障金：</text><text
												class="fs-20">￥</text>{{item.auctionLotUserDepositMoney}}
										</view>
										<view class="fs-36 lh-36 fc-e31 fw-b"><text
												class="fs-24">￥</text>{{item.auctionLotOutPrice}}</view>
									</view>
									<view class="small-btn fc-f lh-60 tc "
										:class="{'m-bg-pp':item.stock>0,'m-bg-pp-unclick':item.stock===0}"
										v-show="auction.auctionStatus===1 && !item.lock && item.stock>0"
										@click.stop="openBuyDialog(item)">去抢购</view>
									<view @click.stop="" class="small-btn fc-f lh-60 tc m-bg-pp-unclick"
										v-show="auction.auctionStatus!==1 || item.lock || item.stock<=0">去抢购
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 瀑布流列表循环 -->
					<!-- <view class="waterfall-box dflex ai-fs" >
						<view class="waterfall-content">
							<view class="waterfall-list" v-for="(item,index) in lotList" :key="item.auctionLotAutoId" @click="goToDetail(item)">
								<view class="goods-image-box">
									<easyLoadimage :scroll-top="scrollTop" 
									:image-src="item.lotImage"
									:open-transition="false"
									loading-mode="spin-circle"
									 class="wp100" mode="widthFix" >
									</easyLoadimage>
									<view class="rob-icon">抢购价</view>
									<view class="rob-price-bg">
									</view>
									<view class="fc-ff4 lh-32 price-box">
										<text class="fs-24">￥</text>
										<text class="fs-32 fw-b">{{item.auctionLotOutPrice | intFormat}}</text>
										<text class="fs-24">{{item.auctionLotOutPrice | decimalFormat}}</text>
									</view>
								</view>
								<view class="waterfall-goods-info">
									<view class="wp100 text-hidden fs-28 fc-303 lh-40 mb8" >
										{{item.lotName}}</view>
									<view class="flex-between ac mb6">
										<view class="fs-22 fc-939 lh-32">{{item.auctionLotFollow}}人关注</view>
										<image src="/static/img/icon/follower@2x.png" class="follow-icon"
											@click.stop="followLot(item.auctionLotAutoId,index)" v-show="item.followed"></image>
										<image src="/static/img/icon/follow@2x.png" class="follow-icon"
											@click.stop="followLot(item.auctionLotAutoId,index)" v-show="!item.followed"></image>
									</view>
									<view class="fs-26 lh-36 fc-606 mb8">拍品编号：{{item.lotId}}</view>
									<view class="mb12">
										<text class="fs-22 fc-606">履约保障金：</text>
										<text class="fs-20 fc-ff4">￥</text>
										<text
											class="fs-28 fc-ff4 fw-b">{{item.auctionLotUserDepositMoney | intFormat}}</text>
										<text
											class="fs-20 fc-ff4">{{item.auctionLotUserDepositMoney | decimalFormat}}</text>
									</view>
									<view class="rob-btn" :class="{open:item.stock>0,unopen:item.stock===0}"  v-show="auction.auctionStatus===1 && !item.lock"
										@click.stop="openBuyDialog(item)">去抢购</view>
									<view @click.stop="" class="rob-btn unopen" v-show="auction.auctionStatus!==1 || item.lock">去抢购</view>
								</view>
							</view>
						</view>
					</view> -->
					<listempty :list="lotList" :loading="loading" />
					<!-- <uni-pagination @change="changePage" title="标题文字" prevText="上一页" nextText="下一页" :total="totalCount" :pageSize="pageSize" :current="currentPage"></uni-pagination> -->
					<page-pagination ref="paging" @change="changePage" :total="totalCount" :pageSize="pageSize"
						:showAround="true" :btnText="true" :forceEllipses="true" :currentPage="currentPage">
					</page-pagination>

					<!-- <view class="flex-center p20">当前页：{{currentPage}}, &nbsp;拍品总量：{{totalCount}}, &nbsp;每页数据：{{pageSize}}</view> -->
					<view style="height: 100rpx;"></view>
				</scroll-view>

			</view>
		</view>
		<view class="cu-modal agreement-modal" :class="showVipDialog?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar cu-title bg-white justify-end">
					<view class="content fw-b">确定使用VIP券</view>
				</view>
				<view class="padding-lg pt0 bg-white tl">
					您有 {{vipCouponAmount}} 张VIP券可用于本场竞拍，消耗 1 张VIP券可提前１分钟开始抢拍，消耗后不退还，是否使用？
				</view>
				<view class="cu-bar bg-white fdc jc-c">
					<view class="action pb40">
						<button class="l-btn flex-center bg-f line-de6 mr48" @click="showVipDialog=false">取消</button>
						<button class="l-btn flex-center m-bg-pp fc-f" @click="consumeAuctionCoupon">同意</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="showBuyDialog?'show':''" @click="showBuyDialog=false">
			<view class="cu-dialog bg-white">
				<view class="cu-bar">
					<view class="content fs-32 fc-303 fw-b">提交订单</view>
				</view>
				<view class="padding-lg pt0">
					<view class="dflex ai-fs mb32">
						<image :src="currentLot.lotImage" mode="" class="order-image mr16"></image>
						<view class="flex-between fdc order-info">
							<view class="dflex fdc ai-fs">
								<view class="order-name mb16">{{currentLot.lotName}}</view>
								<view class="fs-24 lh-34 fc-606"></view>
							</view>
							<view class="dflex ai-fe fs-36 lh-44 fc-e31">
								<text class="fs-22 fc-606">保障金：</text><text
									class="fs-24">￥</text>{{currentLot.auctionLotUserDepositMoney}}
							</view>
						</view>
					</view>
					<view class="order-tips mb32">
						<view class="fs-28 lh-44 fc-606 tl">
							提交订单后，将从账户余额扣除{{currentLot.auctionLotUserDepositMoney}}元作为保障金冻结，支付成功后，将保障金解冻。</view>
					</view>
					<view class="mb40 dflex jc-fs ac wp100" v-if="!lotUserDepositTips">
						<checkbox class="hh-radio fs-0 mr16 round" @click.stop="changeCheck" :checked="isCheck">
						</checkbox>
						<view class="fs-24 lh-34 fc-303">下次不再弹出确认框</view>
					</view>
					<view class="dflex ac">
						<view class="fs-26 lh-36 fc-606">账户余额：</view>
						<view class="fs-22 lh-32 fc-e31">￥</view>
						<view class="fs-28 lh-34 fc-e31">{{userBalance}}</view>
					</view>
				</view>
				<view class="padding-lg pt0">
					<view class="flex-center">
						<button class="l-btn flex-center bg-f line-de6 mr40" @click.stop="hideModal">取消</button>
						<button class="l-btn flex-center m-bg-pp fc-f" @click.stop="saveCheck">同意</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listempty from '../component/listempty.vue';
	import nomore from '../component/nomore.vue';

	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		components: {
			listempty,
			nomore,
			easyLoadimage
		},
		data() {
			return {
				lotUserDepositTips: uni.getStorageSync('lotUserDepositTips') || false,
				showBuyDialog: false,
				isCheck: true,
				vipCoupon: false,
				showLeft: false,
				showRight: false,
				catIndex: 0,
				modalName: null,
				vipCouponAmount: '',
				showVipDialog: '',
				countDownStr: '',
				userBalance: '',
				auction: {},
				currentLot: {},
				lotList: [],
				topLots:[],
				topLotsIds:new Set(),
				dataList: [],
				cats: [{
					goodsType: '',
					goodsTypeName: '全部'
				}],
				allLots: [],
				currentPage: 1,
				totalPage: 1,
				pageSize: 30,
				totalCount: 0,
				scrollViewTop: 0,
				loading: true,
				queryObj: {
					auctionId: '88',
					followed: false,
				},
				startData: {},
				timerId: '',
				waterfall: true,
				stockTimerId: '',
				scrollTop: 0
			}
		},
		watch: {
			isCheck(nv) {
				console.log(nv)
			}
		},
		onLoad(option) {
			if (option.auctionId) {
				this.queryObj.auctionId = option.auctionId
			}
			this.getAuction()
			this.getAuctionCouponsCount()
		},
		onPullDownRefresh() {
			this.getAuction()
			this.getAuctionCouponsCount()
			this.lotList = []
			setTimeout(uni.stopPullDownRefresh, 500)
		},
		onShow() {
			this.getAuction()
			this.getAuctionCouponsCount()
		},
		beforeDestroy() {
			clearInterval(this.stockTimerId)
		},
		beforeRouteLeave() {
			clearInterval(this.stockTimerId)
		},
		destroyed() {
			console.log('destroyed')
		},
		methods: {
			start(e) {
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e) {
				if (this.showLeft || this.showRight) return
				const subX = e.changedTouches[0].clientX - this.startData.clientX;
				const subY = e.changedTouches[0].clientY - this.startData.clientY;
				if (subY < -50) {} else if (subY > 50) {} else if (subX > 50) {
					if (this.currentPage > 1) {
						this.showRight = true
						this.changePage(this.currentPage - 1)
					} else {
						uni.$toast.showError('当前已经是第一页！')
					}
				} else if (subX < -50) {
					if (this.currentPage < this.totalPage) {
						this.showLeft = true
						this.changePage(this.currentPage + 1)
					} else {
						uni.$toast.showError('当前已经是最后一页！')
					}
				} else {}
			},
			changePage(currentPage, type) {
				const current = currentPage
				this.$refs['paging'].clickPage(current)
				const list = this.queryObj.followed ? this.allLots.filter(e => e.followed) : this.allLots
				const {
					totalPage
				} = this
				if (this.loading) return
				this.lotList = []

				this.loading = true
				const _this = this
				if (current <= totalPage) {
					this.currentPage = current
					const start = (current - 1) * this.pageSize
					const end = start + this.pageSize
					
					this.lotList = this.topLots.concat(list.slice(start, end).filter(e=>!this.topLotsIds.has(e.lotId)))
					this.scrollViewTop = this.scrollTop
					this.$nextTick(() => this.scrollViewTop = 0)
				}
				this.loading = false
				setTimeout(() => {
					_this.showLeft = false
					_this.showRight = false
				}, 600)
			},
			onScroll(e) {
				let detail = e.detail
				// console.log('onScroll',detail.scrollTop)
				// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
				this.scrollTop = detail.scrollTop;
			},
			getAuctionLotStock() {
				if (this.auction && this.auction.auctionEndTime) {
					const endTime = new Date(this.auction.auctionEndTime.replace(/\-/g, '/')).getTime()
					if (this.nowTime >= endTime) {
						clearInterval(this.stockTimerId)
					}
				}
				uni.$api.getCenturyAuctionLotStock(this.queryObj).then(res => {
					const obj = res.data || {}
					for (let key in obj) {
						const ele = this.lotList.find(e => e.auctionLotAutoId === key)
						if (ele) {
							ele.stock = obj[key]===1?0:1
						}
					}
				})
			},
			lotStock() {
				const _this = this
				if (this.stockTimerId) {
					return
				}
				this.stockTimerId = setInterval(_this.getAuctionLotStock, 2000)
			},
			loadMore() {
				const list = this.queryObj.followed ? this.allLots.filter(e => e.followed) : this.allLots
				const {
					currentPage,
					totalPage
				} = this
				if (this.loading) return
				this.loading = true
				if (currentPage < totalPage) {
					const start = currentPage * this.pageSize
					const end = start + this.pageSize
					this.currentPage++
					this.lotList.push(...list.slice(start, end))

				}
				this.loading = false

			},
			back() {
				uni.navigateBack()
			},
			changeListType() {
				this.waterfall = !this.waterfall
				this.$forceUpdate()
			},
			changeFollow() {
				this.queryObj.followed = !this.queryObj.followed
				this.currentPage = 1
				if (this.queryObj.followed) {
					const list = this.allLots.filter(e => e.followed);
					this.totalPage = Math.ceil(list.length / this.pageSize)
					this.lotList = list.slice(0, this.pageSize)
					this.totalCount = list.length
				} else {
					this.totalPage = Math.ceil(this.allLots.length / this.pageSize)
					this.lotList =  this.topLots.concat(this.allLots.slice(0, this.pageSize).filter(e=>!this.topLotsIds.has(e.lotId)))
					this.totalCount = this.allLots.length
				}
				this.$refs['paging'],this.$refs['paging'].clickPage(1)
			},
			getAuction() {
				this.getLots()
				uni.$api.getCenturyAuction(this.queryObj).then(res => {
					this.userBalance = res.userBalance
					this.auction = res.data
					this.vipCoupon = res.vipCoupon
					this.nowTime = parseInt(res.nowTime)
					

				})
			},
			consumeAuctionCoupon() {
				uni.$api.consumeAuctionCoupon(this.queryObj).then(res => {
					uni.$toast.showSuccess('操作成功')
					this.showVipDialog = false
					this.getAuction()
					this.getAuctionCouponsCount()
				})
			},
			getAuctionCouponsCount() {
				uni.$api.getAuctionCouponsCount().then(res => {
					this.vipCouponAmount = res.data
				})
			},
			catChangeEvent(cat = {}, index = 0) {
				this.queryObj.goodsType = cat.goodsType
				this.catIndex = index
				this.getLots()
			},
			getLotsGoodsCategory() {
				uni.$api.getLotsGoodsCategory(this.queryObj).then(res => {
					this.cats = res.rows || []
					this.cats.unshift({
						goodsType: '',
						goodsTypeName: '全部'
					})
				})
			},
			getLots() {

				uni.$api.getCenturyLots(this.queryObj).then(res => {
					const time = new Date().getTime()
					const allLots = res.rows
					let list = res.rows
					if (this.queryObj.followed) {
						 list = list.filter(e => e.followed);
					}
					this.topLots = allLots.filter(e=>e.auctionLotCouponType===42)
					let lotList = list.slice(0, this.pageSize)
					this.topLotsIds=new Set()
					this.topLots.forEach(e=>this.topLotsIds.add(e.lotId))
					if(this.currentPage>1){
						const start = (this.currentPage - 1) * this.pageSize
						const end = start + this.pageSize
						lotList = this.topLots.concat(list.slice(start, end).filter(e=>!this.topLotsIds.has(e.lotId)))
					}else{
						this.currentPage = 1
						lotList = this.topLots.concat(lotList.filter(e=>!this.topLotsIds.has(e.lotId)))
					}
					this.lotList = lotList.map(e => {
						const sell = e.auctionLotSellerStock || 0
						e.stock = e.auctionLotStock - sell
						e.lock = uni.$session.checkLotId(this.queryObj.auctionId, e.auctionLotAutoId)
						return e
					})
				
					
					this.totalPage = Math.ceil(list.length / this.pageSize)
					this.totalCount = list.length
					this.loading = false
					const _this = this
					setTimeout(() => {
						_this.allLots = allLots.map(e => {
							const sell = e.auctionLotSellerStock || 0
							e.stock = e.auctionLotStock - sell
							e.lock = uni.$session.checkLotId(_this.queryObj.auctionId, e
								.auctionLotAutoId)
							return e
						})
					}, 1000)

					this.lotStock()
				})
			},
			followLot(auctionLotAutoId, index) {
				const lot = this.lotList[index]
				uni.$api.followLot({
					auctionLotAutoId
				}).then(res => {
					uni.$toast.showSuccess('操作成功')
					lot.followed = !lot.followed
					if (lot.followed) {
						lot.auctionLotFollow++
					} else {
						lot.auctionLotFollow--
					}
				})
			},
			goToDetail(lot) {
				uni.navigateTo({
					url: '/pages/auction/centuryLotDetail?auctionId=' + this.queryObj.auctionId + '&lotId=' + lot
						.lotId + '&goodsId=' + lot.lotGoodsId
				})
			},
			openBuyDialog(lot) {
				this.currentLot = lot
				if (uni.getStorageSync('lotUserDepositTips')) {
					this.secKillLot()
					return
				}
				this.showBuyDialog = true
			},
			secKillLot() {
				if (!this.btnloading) {
					this.btnloading = true
					const _this = this
					setTimeout(() => _this.btnloading = false, 500)
				} else {
					// uni.$toast.showError('操作过快啦')
					return
				}
				uni.$api.buyCenturyLot({
					auctionId: this.queryObj.auctionId,
					lotId: this.currentLot.lotId
				}).then(res => {
					uni.$session.lockLotId(this.queryObj.auctionId, this.currentLot.auctionLotAutoId)
					this.currentLot.lock = true
					uni.$toast.showSuccess('抢购成功')
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/order/orderpay?orderId='+res.orderId
						})
					},500)
				}).catch(e => {
					uni.$toast.showError(e.message)
				})
			},
			
			hideModal(e) {
				this.showBuyDialog = false
			},
			saveCheck() {
				if (this.isCheck) {
					uni.setStorageSync('lotUserDepositTips', true);
					this.secKillLot();
					this.showBuyDialog = false
				} else {
					uni.$toast.showToast('请勾选下次不要弹出！')
				}
			},
			changeCheck() {
				this.isCheck = !this.isCheck

			},
		}
	}
</script>

<style>
	.goods-index-bg {
		position: absolute;
		z-index: 0;
		width: 100%;
		top: 0;
		left: 0;
	}

	.auction-title-box {
		z-index: 1;
		position: relative;
		padding: 12rpx 20rpx 12rpx 24rpx;
	}

	.back-btn {
		width: 48rpx;
		height: 48rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.auction-title-info {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 0;
		bottom: 0;
		z-index: -1;
	}

	.vip-coupon-btn {
		width: 126rpx;
		height: 48rpx;
		background-color: #ffdd32;
		border-radius: 60rpx;
		font-size: 24rpx;
		color: #303133;
	}

	/* 商品导航 */
	.goods-navlist {
		overflow-x: scroll;
		width: calc(100% - 94rpx);
	}

	.switchlist-btn {
		padding: 12rpx 22rpx;
		position: absolute;
		right: 0;
		top: 0;
		/* background-color: #E31D1A; */
	}

	.switchlist-btn image {
		width: 40rpx;
		height: 40rpx;
	}

	.switchlist-btn::after {
		content: '';
		width: 2rpx;
		height: 24rpx;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: rgba(255, 255, 255, 0.3);

	}

	.goods-nav {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #fff;
		padding: 12rpx 18rpx;
		position: relative;
		flex-shrink: 0;
	}

	.goods-nav.cur {
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
	}

	.cur-icon {
		display: none;
		width: 48rpx;
		height: 4rpx;
		background-color: #FF411C;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.goods-nav.cur .cur-icon {
		display: block;
	}

	/* 商品列表 */
	.goods-box {
		margin-top: 26rpx;
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		background: #f6f6f6;
		padding: 20rpx 20rpx 0;
		z-index: 1;
		position: relative;
		height: calc(100vh - 222rpx);
	}

	.goods-container {
		height: calc(100% - 84rpx);
		min-width: calc(100% + 40rpx);
		margin-left: -20rpx;
		flex-wrap: nowrap;
		overflow-x: scroll;
		transform: translate3d(0, 0, 0);
	}

	.auction-notice {
		width: 100%;
		border-radius: 60rpx;
		height: 64rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		margin-bottom: 20rpx;
	}

	.goods-list {
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 10px;
	}

	.goods-list+.goods-list {
		margin-top: 20rpx;
	}

	.goods-image {
		width: 220rpx;
		height: 220rpx;
		margin-right: 16rpx;
		flex-shrink: 0;
		position: relative;
	}

	.goods-info {
		width: calc(100% - 236rpx);
	}

	.goods-name {
		font-size: 28rpx;
		color: #303133;
		font-weight: bold;
		line-height: 40rpx;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.follow-icon {
		width: 36rpx;
		height: 36rpx;
	}

	.goods-label {
		font-size: 20rpx;
		line-height: 20rpx;
		padding: 4rpx 10rpx;
		color: #fff;
		background: #FF411C;
		border-radius: 8rpx;
		display: inline-block;
	}

	.h28 {
		height: 28rpx;
	}

	/* 商品列表瀑布流 */
	.waterfall-content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.waterfall-list {
		width: calc(50% - 14rpx);
		border-radius: 20rpx;
		background-color: #fff;
		overflow: hidden;
		margin-right: 14rpx;
		margin-bottom: 40rpx;
	}

	.waterfall-list:nth-child(2n) {
		margin-right: 0;
		margin-left: 14rpx;
	}

	.goods-image-box {
		width: 348rpx;
		height: 348rpx;
		position: relative;
		border-radius: 20rpx 20rpx 0 0;
		overflow: hidden;
	}

	.first-icon {
		width: 96rpx;
		height: 40rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		border-radius: 16rpx 0 16rpx 0;
		background-color: #FF411C;
		font-size: 20rpx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rob-icon {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 80%;
		height: 40rpx;
		border-radius: 16rpx 0 0 0;
		background: linear-gradient(127deg, #E93A37 0%, #FF6346 100%);
		z-index: 1;
		padding: 6rpx 42rpx;
		color: #fff;
		font-size: 20rpx;
	}

	.rob-price-bg {
		width: 188rpx;
		height: 48rpx;
		line-height: 40rpx;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 3;
		padding: 6rpx 0rpx 4rpx 0;
		display: inline-block;
		text-align: center;
		perspective: 1000;
	}

	.rob-price-bg::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(137deg, #FDE9CF 0%, #F6DDBB 100%);
		border-radius: 16rpx 0 0 0;
		/* transform: perspective(10px)scale(1.1, 1.3) rotateX(5deg); IOS上有问题暂时去掉 */
		transform: perspective(10px)scale(1.1, 1) rotateX(5deg);
		z-index: -1;
	}

	.price-box {
		position: absolute;
		bottom: 0px;
		right: 0;
		width: 188rpx;
		padding-bottom: 4rpx;
		text-align: center;
		z-index: 9;
	}

	.waterfall-goods-info {
		padding: 16rpx 20rpx 20rpx;
		background: #fff;
	}

	.rob-btn {
		width: 100%;
		height: 60rpx;
		border-radius: 8rpx;
		background-color: #DDDDE6;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #fff;
	}

	.rob-btn.unopen {
		background: #DDDDE6;
	}

	.rob-btn.open {
		background-color: #FF411C;
	}

	/* 弹窗 */
	.cu-dialog {
		border: 24rpx;
		width: 650rpx;
	}

	.cu-modal.bottom-modal .cu-dialog {
		border-radius: 40rpx 40rpx 0 0;
	}

	.cu-btn.lg {
		font-size: 28rpx;
		height: 90rpx;
	}

	.agreement-modal {
		z-index: 10000;
	}

	.line-de6 {
		color: #303133;
		border: 1px solid #DDDDE6;
	}

	.order-image {
		width: 220rpx;
		height: 220rpx;
		flex-shrink: 0;
	}

	.order-info {
		width: calc(100% - 236rpx);
		height: 220rpx;
	}

	.order-name {
		font-size: 28rpx;
		color: #303133;
		font-weight: bold;
		text-align: left;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.order-tips {
		padding: 24rpx 32rpx;
		background-color: #fafafa;
		border-radius: 20rpx;
	}

	button {
		margin: 0;
	}

	/* 列表轮播 */
	uni-swiper-item {
		overflow: unset;
	}

	.swiper-item {
		height: 100%;
	}

	.list-trans {
		background-color: rgba(246, 246, 246, 1);
		position: absolute;
		width: 300%;
		left: -100%;
		top: 0;
		z-index: 9;
		display: flex;
	}

	.list-transleft {
		animation: trans180 0.6s infinite ease;
	}

	.list-transright {
		animation: trans0 0.6s infinite ease;
	}

	@keyframes trans180 {
		0% {
			transform: translateX(33%);
		}

		100% {
			transform: translateX(0%);
		}
	}

	@keyframes trans0 {
		0% {
			transform: translateX(0%);
		}

		100% {
			transform: translateX(33%);
		}
	}

	/* 骨架列表 */
	.skeleton {
		background-color: #F2F2F4;
	}

	.goods-image.skeleton-image {
		background-color: #F2F2F4;
	}

	.goods-name.skeleton-name {
		width: 100%;
		height: 40rpx;
	}

	.skeleton-id {
		width: 200rpx;
		height: 36rpx;
	}

	.skeleton-follow {
		width: 150rpx;
		height: 36rpx;
	}

	.skeleton-price {
		width: 100rpx;
		height: 40rpx;
	}
</style>
