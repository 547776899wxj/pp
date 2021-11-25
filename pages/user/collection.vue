<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">收藏</block>
		</cu-custom>
		<view class="container">
			<view class="goods-list" v-for="(item,index) in list.rows" @click="toGoodsDetail(item.goodsId)">
				<image :src="item.goodsImage" class="goods-image" mode=""></image>
				<view class="wp100 goods-info flex-between ai-fs fdc">
					<view class="wp100">
						<view class="goods-name mb8">{{item.goodsTitle}}</view>
						<view class="flex-between ai-fs">
							<!-- 有标签 -->
							<view class="goods-label" v-if="item.goodsBrandName">{{item.goodsBrandName}}</view>
							<view v-else></view>
							<!-- 无标签 -->
							<!-- <view class="h28"></view> -->
							<!-- <image src="../../static/img/icon/collection@2x.png" class="collection-icon mt8 mb24" mode="" @click="handleCollect(item.goodsId)"></image> -->
						</view>
					</view>
					<view class="flex-between ai-fe wp100">
						<view class="dflex ac">
							<view class="fs-36 lh-36 fc-e31 fw-b"><text class="fs-24">￥</text>{{item.goodsPrice}}</view>
							<view class="fs-22 lh-22 fc-939 td-lt" v-if="item.goodsOriginalPrice">￥{{item.goodsOriginalPrice}}</view>
						</view>
						<view class="small-btn bg-pp fc-f lh-60 tc" @click.stop="handleCollect(index)">取消收藏</view>
					</view>
				</view>
			</view>
			<listempty :list="list.rows"></listempty>
			<nomore :pageCount="list.pageCount" :pageNumber="pageNumber"></nomore>
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
				list:{
					rows:[],
					pageCount:0,
					total:0
				},
				pageNumber:1,
				loading:false,
				isReturn:false
			}
		},
		onLoad(){
			this.fetchData();
		},
		onShow(){
			if(this.isReturn){
				this.pageNumber = 0;
				this.list.rows = [];
				this.fetchData();	
			}
		},
		onReachBottom(){
			if(this.loading || this.pageNumber > this.list.pageCount || this.list.rows.length >= this.list.total){
				return;
			}
			this.fetchData();
		},
		methods: {
			fetchData(){
				this.loading = true;
				uni.$api.getCollectGoods({pageNumber:this.pageNumber}).then(res=>{
					console.log('res',res);
					this.list.rows.push(...res.rows);
					this.list.pageCount = res.pageCount;
					this.list.total = res.total;
					this.pageNumber++;
					this.loading = false;
				}).catch(err=>{
					this.loading = false;
					uni.$toast.showError(err.message);
				})
			},
			handleCollect(index){
				var self = this;
				var goodsId = self.list.rows[index].goodsId;
				uni.$toast.confirm('确定要取消收藏吗').then(()=>{
					uni.$api.collectGoods({goodsId:goodsId}).then(res => {
						uni.$toast.showSuccess('操作成功');
						self.list.rows.splice(index,1);
					}).catch(res => {
						uni.$toast.showError(res.message);
					})
				})
				
			},
			toGoodsDetail(goodsId) {
				if (goodsId) {
					this.isReturn = true;
					uni.navigateTo({
						url:"/pages/goods/goodsdetail?goodsId="+goodsId
					})
				}
			}
		}
	}
</script>

<style>
.container {
	padding: 8rpx 20rpx;
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
}
.goods-info {
	height: 220rpx;
}
.goods-name {
	font-size: 28rpx;
	color: #303133;
	font-weight: bold;
	line-height: 40rpx;
	height: 80rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;    
	-webkit-line-clamp: 2;    
	overflow: hidden;
}
.collection-icon {
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
</style>
