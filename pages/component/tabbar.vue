<template>
	<view>
		<view class="cu-bar tabbar bg-white">
			<view :class="['action', model.currentTabbar == 1?'fc-ff4':'text-gray']" @click="onTabbarClick(1)">
				<view >
					<view class="cuIcon-homefill"></view> 首页
				</view>
			</view>
			<view :class="['action', model.currentTabbar == 2?'fc-ff4':'text-gray']" @click="onTabbarClick(2)">
				<view >
					<view class="cuIcon-goods"></view> 商品
				</view>
			</view>
			<view :class="['action', model.currentTabbar == 3?'fc-ff4':'text-gray']" @click="onTabbarClick(3)">
				<view >
					<view class="cuIcon-goodsnew"></view> 拍卖
				</view>
			</view>
			<view :class="['action', model.currentTabbar == 4?'fc-ff4':'text-gray']" @click="onTabbarClick(4)">
				<view >
					<view class="cuIcon-form"></view> 订单
				</view>
			</view>
			<view :class="['action', model.currentTabbar == 5?'fc-ff4':'text-gray']" @click="onTabbarClick(5)">
				<view >
					<view class="cuIcon-my"></view> 我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuData:[
					{"id":1,"url":"/pages/index/index","type":1},
					{"id":2,"url":"/pages/goods/list","type":1},
					{"id":3,"url":"/pages/auction/index","type":2},
					{"id":4,"url":"/pages/order/order","type":2},
					{"id":5,"url":"/pages/user/index","type":2}
				],
				model:{
					currentTabbar:1
				}
			}
		},
		created:function(){
			var val = uni.getStorageSync('curbar');
			if(val!=''){
				this.model.currentTabbar = val;
				this.$forceUpdate();
			}
		},
		methods: {
			onTabbarClick:function(val){
				console.log(val+'1')
				var row = this.menuData[val-1];
				if(row.type == 2){
					if(!this.isLogin()){
						return;
					}
				}
				/*uni.navigateTo({
					url:row.url
				})*/
				uni.switchTab({
				    url:row.url
				});
				uni.setStorageSync('curbar', val);
				
			},
			isLogin:function(){
				var token = uni.$session.getToken();
				if(!token){
					uni.navigateTo({
						url:"../login/login"
					})
					return;
				}
				var userPeopleStatus = uni.$session.getUserPeopleStatus();
				
				if(userPeopleStatus !=1){
					uni.navigateTo({
						url:"../login/realname"
					})
					return;
				}
				return true;
			}
		}
	}
</script>

<style>
.cu-bar {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 9;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
}
</style>
