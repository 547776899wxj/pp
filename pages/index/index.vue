<template>
	<view>
		<!-- <index v-if="PageCur=='index'" @navPage="navPage"></index>
		<goods v-if="PageCur=='goods'" :option="option"></goods>
		<auction v-if="PageCur=='auction'"></auction>
		<order v-if="PageCur=='order'"></order>
		<user v-if="PageCur=='user'"></user>
		<view class="cu-bar tabbar bg-white shadow foot">
				<view  v-for="row in tabData" class="action" :class="row.btnType==2?'add-action':''" @click="NavChange(row.id)">
					<view  :class="PageCur==row.id?(row.classname+' fc-ff4'):(row.classname+' text-gray')" >
					</view>
					<view :class="PageCur==row.id?'fc-ff4':'text-gray'">{{row.name}}</view>
				</view>
		</view> -->
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				tabData:[
					{"id":"index","name":"首页","url":"/pages/index/index","type":1,"classname":"cuIcon-homefill",'btnType':1},
					{"id":"goods","name":"商品","url":"/pages/goods/list","type":1,"classname":"cuIcon-goods",'btnType':1},
					{"id":"auction","name":"拍卖","url":"/pages/auction/index","type":2,"classname":"iconfont icon-cheliangpaimai",'btnType':2},
					{"id":"order","name":"订单","url":"/pages/order/order","type":2,"classname":"cuIcon-form",'btnType':1},
					{"id":"user","name":"我的","url":"/pages/user/index","type":2,"classname":"cuIcon-my",'btnType':1}
				],
				PageCur: 'index',
				option:"",//组件传参
			}
		},
		onLoad(e) {
			var pageCur = e.pageCur
			if (pageCur) {
				this.PageCur = pageCur
			}
		},
		onShow:function(){
			var a = this.PageCur;
			console.log("a:"+a)
			this.PageCur = '';
			var self = this;
			this.$nextTick(() => {
					self.PageCur = a;
			 });
		},
		methods: {
			//组件里需要跳转，tabbar页面事件
			navPage (e) {
				console.log("navPage:"+JSON.stringify(e))
				var pageCur = e.pageCur
					var option = e.option
				if (option) {
					this.option = JSON.stringify(option)
					console.log("index.vue",this.option)
				}
				if (pageCur) {
					this.PageCur = pageCur
				}
			},
			NavChange: function(id) {
				
				var row = null;
				for(var i = 0;i<this.tabData.length;i++){
					if(this.tabData[i].id == id){
						row = this.tabData[i];
					}
					
				}
				if(row.type == 2){
					if(!this.isLogin()){
						return;
					}
				}
				var self = this;
				this.$nextTick(() => {
					this.PageCur = id
				});
				
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
@import url("/static/fonts/iconfont.css");
</style>
