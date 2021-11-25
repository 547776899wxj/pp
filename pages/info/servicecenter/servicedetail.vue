<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">{{item.helpTitle}}</block></cu-custom>
		<scroll-view scroll-y="true" class="wp100 foot-card-list">
			<view class="service-show">
				<text class="title"></text>
				<text class="date mb24">{{item.helpUpdateTime}}</text>
				<div v-html="item.helpContent"></div>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helpId:'',
				item:{}
			}
		},
		onLoad(e) {
			this.helpId = e.helpId;
			this.fetchData();
		},
		methods: {
			fetchData(){
				uni.$api.getCommonHelp({id:this.helpId}).then(res=>{
					this.item = res.data || {};
					if(this.item && this.item.helpContent){
						this.item.helpContent = uni.$utils.formatRichTextImage(this.item.helpContent);
					}
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
.service-show {
  padding: 0 24rpx;
}
.service-show text{
  display: block;
}
.service-show .title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin: 30rpx 0 16rpx;
}
.service-show .date {
  color: #999;
  font-size: 12px;
}
.service-show .content {
  margin-top: 30rpx;
  font-size: 14px;
  line-height: 40rpx;
}

.rich-img{
    width: 100%;
    margin: 20rpx 0;
}
.rich-p{
    color: #333333;
    font-size: 32rpx;
    line-height: 45rpx;
}
</style>
