<template>
	<view class="contact pagination">
		<!-- 首页 -->
		<view class="pag-btn start" :class="nowPage==1?'btn-ban':''" v-if="showAround && !numAround" @click="clickStart">
			<text v-if="btnText">首页</text>
			<text v-else class="icon icon-left1"></text>
		</view>
		<!-- 上页 -->
		<view class="pag-btn prev" :class="nowPage==1?'btn-ban':''" @click="clickPrev">
			<text v-if="btnText">上页</text>
			<text v-else class="icon icon-left"></text>
		</view>
		<!-- 简单模式 -->
		<view v-if="mode=='simple'" class="page-num simple">{{nowPage}} / {{pageNum}}</view>
		<!-- 复杂模式 -->
		<view class="page-num" v-else>
			<template v-if="pageNum <= 5">
				<view v-for="page in pageNum" :key="page" class="pag-btn" :class="page==nowPage?'active':''" @click="clickPage(page)">{{page}}</view>
			</template>
			<template v-else>
				<!-- 第一页页码 -->
				<view class="pag-btn" v-if="numAround" :class="nowPage==1?'active':''" @click="clickPage(1)">1</view>
				<!-- 左侧省略号 -->
				<view class="pag-btn" v-show="(forceEllipses && getFirstPage != 1) || (numAround && getFirstPage != 2)"><text class="icon icon-more"></text></view>
				<!-- 中间页码 -->
				<view class="pag-btn" :class="getFirstPage==nowPage?'active':''" @click="clickPage(getFirstPage)">{{getFirstPage}}</view>
				<view class="pag-btn" :class="getFirstPage+1==nowPage?'active':''" @click="clickPage(getFirstPage+1)">{{getFirstPage+1}}</view>
				<view class="pag-btn" :class="getFirstPage+2==nowPage?'active':''" @click="clickPage(getFirstPage+2)">{{getFirstPage+2}}</view>
				<!-- 若显示省略号，则页码只显示 3 页 -->
				<view v-show="!forceEllipses && !numAround" class="pag-btn" :class="getFirstPage+3==nowPage?'active':''" @click="clickPage(getFirstPage+3)">{{getFirstPage+3}}</view>
				<view v-show="!forceEllipses && !numAround" class="pag-btn" :class="getFirstPage+4==nowPage?'active':''" @click="clickPage(getFirstPage+4)">{{getFirstPage+4}}</view>
				<!-- 右侧省略号 -->
				<view class="pag-btn" v-show="(forceEllipses && getFirstPage<pageNum-2) || (numAround && getFirstPage < pageNum-3)"><text class="icon icon-more"></text></view>
				<!-- 最后一页页码 -->
				<view class="pag-btn" v-if="numAround" v-show="getFirstPage < pageNum-2" :class="nowPage==pageNum?'active':''"@click="clickPage(pageNum)">{{pageNum}}</view>
			</template>
		</view>
		<!-- 下页 -->
		<view class="pag-btn next" :class="nowPage==pageNum?'btn-ban':''" @click="clickNext">
			<text v-if="btnText">下页</text>
			<text v-else class="icon icon-right"></text>
		</view>
		<!-- 尾页 -->
		<view class="pag-btn end" :class="nowPage==pageNum?'btn-ban':''" v-if="showAround && !numAround" @click="clickEnd">
			<text v-if="btnText">尾页</text>
			<text v-else class="icon icon-right1"></text>
		</view>
	</view>
</template>
<script>
	/**
	 * @property {Number} total 总条数，默认0
	 * @property {Number} pageSize 每页条数，默认10
	 * @property {Number} currentPage 当前页，默认1
	 * @property {Number} showPageSize 显示的页码个数，默认3，最大5，若显示省略号或首尾数字，最大3
	 * @property {String} mode=['multi'|'simple'] 显示模式，默认multi
	 * @property {Boolean} forceEllipses=[true|false] 是否显示省略号，默认false
	 * @property {Boolean} btnText=[true|false] 是否显示汉字，默认false
	 * @property {Boolean} showAround=[true|false] 是否显示首页和尾页，默认false
	 * @property {Boolean} numAround=[true|false] 是否用页码表示首尾页，默认false
	 */
	export default {
		name: 'PagePagination',
		props: {
			//总条数
			total: {
				type: Number,
				default: 0
			},
			//每页条数
			pageSize: {
				type: Number,
				default: 10
			},
			//当前页
			currentPage: {
				type: Number,
				default: 1
			},
			//显示的页码个数
			showPageSize: {
				type: Number,
				default: 3
			},
			//显示模式
			mode: {
				type: String,
				default: "multi"
			},
			//是否显示省略号
			forceEllipses: {
				type: Boolean,
				default: false
			},
			//是否显示汉字
			btnText: {
				type: Boolean,
				default: false
			},
			//是否显示首页和尾页
			showAround: {
				type: Boolean,
				default: false
			},
			//是否用页面表示首尾页
			numAround: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				nowPage: this.currentPage
			}
		},
		computed: {
			//总页数
			pageNum() {
				return Math.ceil(this.total / this.pageSize)
			},
			//计算显示的第一个页码
			getFirstPage() {
				let firstPage = 0;
				if (this.nowPage <= 2) {
					if (!this.numAround) firstPage = 1;
					else firstPage = 2;
				} else if (this.nowPage >= this.pageNum - 1) {
					if (this.forceEllipses || this.numAround) firstPage = this.pageNum - 2;
					else firstPage = this.pageNum - 4;
				} else {
					if (this.forceEllipses || this.numAround) firstPage = this.nowPage - 1;
					else firstPage = this.nowPage - 2;
				}
				return firstPage;
			}
		},
		methods: {
			//选择页码
			clickPage(page) {
				if(this.nowPage != page){
					this.nowPage = page;
					this.change(page, 'page');
				}
			},
			//点击上页
			clickPrev() {
				if (this.nowPage > 1) {
					let nowPage = this.nowPage - 1;
					this.nowPage = nowPage;
					this.change(nowPage, 'prev');
				}
			},
			//点击下页
			clickNext() {
				if (this.nowPage < this.pageNum) {
					let nowPage = this.nowPage + 1;
					this.nowPage = nowPage;
					this.change(nowPage, 'next');
				}
			},
			//点击首页
			clickStart() {
				if (this.nowPage != 1) {
					let nowPage = 1;
					this.nowPage = nowPage;
					this.change(nowPage, 'homePage');
				}
			},
			//点击尾页
			clickEnd() {
				if (this.nowPage != this.pageNum) {
					let nowPage = this.pageNum;
					this.nowPage = nowPage;
					this.change(nowPage, 'endPage');
				}
			},
			//页码改变时触发
			change(nowPage, type) {
				this.$emit('change', nowPage, type);
			}
		}
	}
</script>
<style lang="scss">
	@import 'icon/iconfont.css';

	.pagination {
		display: flex;
		width: 100%;
		justify-content: center;

		.pag-btn {
			background-color: #fff;
			color: #FF411C;
			font-size: 24rpx;
			border: 1px solid #EBEEF5;
			border-left: none;
			padding: 14rpx 22rpx;
		}

		.pag-btn.start,
		.pag-btn.prev,
		.pag-btn.next,
		.pag-btn.end {
			padding: 14rpx 14rpx;
		}

		.pag-btn:has(> .icon-more) {
			padding: 14rpx 14rpx;
		}
		
		.page-num .pag-btn {
			background-color: #fff;
			color: #FF411C;
		}
		
		.page-num .pag-btn.active {
			background-color: #FF411C;
			color: #fff;
		}

		.pag-btn:first-child {
			border-left: 1px solid #EBEEF5;
		}

		.pag-btn.active {
			background-color: unset;
			color: #FF411C;
		}

		.pag-btn.btn-ban {
			color: #C0C4CC;
			background-color: #fff;
			cursor: not-allowed;
		}

		.page-num {
			display: flex;
		}

		.page-num.simple {
			padding: 0 80rpx;
			line-height: 68rpx;
			color: #303133;
			font-size: 32rpx;
		}

		.icon-right,
		.icon-left {
			font-size: 26rpx;
		}
	}
</style>
