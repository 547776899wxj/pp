<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true">
			<block slot="content">常见问题</block>
		</cu-custom>
		<view class="container">
			<view class="service-list">
				<view v-for="item in helpList" @click="toHelpInfo(item.helpId)">
					<view class="list-item flex-between ac">
						<text>{{item.helpTitle}}</text>
						<image src="../../../../static/img/icon/arrow@3x.png" mode=""></image>
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
				helpList:[]
			}
		},
		onLoad() {
			this.fetchData();
		},
		methods: {
			fetchData(){
				uni.$api.getCommonHelpList().then(res=>{
					this.helpList = res.rows || [];
				})
			},
			toHelpInfo(helpId){
				if (helpId) {
					uni.navigateTo({
						url:"/pages/info/servicecenter/servicedetail?helpId="+helpId
					})
				}
			}
		}
	}
</script>

<style>
.container {
  margin-top: 32rpx;
  padding: 0 24rpx 200rpx;
}
.service-list{
  margin-bottom: 32rpx;
}
.list-item{
  width: 100%;
  background:#fff;
  padding: 0 32rpx;
  margin-bottom: 32rpx;
  border-radius: 8rpx;
  box-sizing: border-box;
}
.list-item text{
  height: 136rpx;
  font-size: 32rpx;
  line-height: 136rpx;
  font-weight: bold;
}
.list-item image{
  width: 30rpx;
  height: 30rpx;
}
button {
  position: unset;
  line-height: unset;
  background: unset;
  border: unset;
  outline: none;
  -webkit-tap-highlight-color:unset;
}
button::after {
  border: none;
  position: unset;
}
button:hover,button:focus,button:active {
  background: unset;
}
</style>
