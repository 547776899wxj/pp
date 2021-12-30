<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true"><block slot="content">服务中心</block></cu-custom>
		<view class="container">
			<scroll-view
			 class="wp100 foot-card-list"
			 scroll-x="false"
			 scroll-y="true"
			 upper-threshold="10"
			 lower-threshold="10"
			 bindscrolltolower="scrollLoadList"
			>
			<view class="service-list">
				<view>
					<view class="list-item" @click="toServiceInfo(1)">
						<text>常见问题</text>
						<image :src="domainStatic+'/img/icon/gd@3x.png'"></image>
					</view>
				</view>
			</view>
		    <view class="service-list">
		      <view class="list-item other-list" @click="toServiceInfo(2)">
		        <text>关于我们</text>
		        <image :src="domainStatic+'/img/icon/gd@3x.png'"></image>
		      </view>
		      <view class="list-item other-list" @click="toServiceInfo(3)">
		        <text>意见反馈</text>
		        <image :src="domainStatic+'/img/icon/gd@3x.png'"></image>
		      </view>
			  <view class="list-item other-list flex-between pr60" v-if="versionName != ''">
			    <text>版本号</text>
			    <text>{{versionName}}</text>
			  </view>
		    </view>
		    <view class="kefu">
		      <view class="phone-kefu" data-reply-phone="4006299996" @click.stop="showCustomer()">
		        <button>
		          <view>
		            <image :src="domainStatic+'/img/icon/dianhua-kefu@3x.png'"></image>
		            <text>电话客服</text>
		            <text class="time">09:00-21:00</text>
		          </view>
		        </button>
		      </view>
		      <view class="online-kefu" @click.stop="showCustomer()">
		        <button open-type="contact">
		          <view>
		            <image :src="domainStatic+'/img/icon/online-kefu@3x.png'"></image>
		            <text>在线客服</text>
		            <text class="time">09:00-21:00</text>
		          </view>
		        </button>
		      </view>
		    </view>
		    
			</scroll-view>
		</view>
		<customer :show="customerAlert" @cancel="hideModel"></customer>

	</view>
</template>

<script>
	import customer from 'pages/component/customer.vue';
	export default {
		components:{
			customer
		},
		data() {
			return {
				customerAlert:false,
				versionName:"",
				domainStatic:this.domainStatic,
			}
		},
		onShow() {
			this.setVersionInfo()
		},
		methods: {
			toServiceInfo(index){
				switch(index){
					case 1:
						uni.navigateTo({
							url:"/pages/info/servicecenter/help/list"
						})
						break;
					case 2:
						uni.navigateTo({
							url:"/pages/user/about"
						})
						break;
					case 3:
						uni.navigateTo({
							url:"/pages/info/servicecenter/feedback"
						})
						break;
				}
			},
			showCustomer () {
				this.customerAlert=true
			},
			hideModel () {
				this.customerAlert=false
			},
			phoneCall(){
				uni.makePhoneCall({
				    // 手机号
				        phoneNumber: '110', 
				    
				    	// 成功回调
				    	success: (res) => {
				    		console.log('调用成功!')	
				    	},
				    
				    	// 失败回调
				    	fail: (res) => {
				    		console.log('调用失败!')
				    	}
				});
			},
			setVersionInfo () {
				//#ifdef APP-PLUS
				var self = this
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					self.versionName = widgetInfo.version
				})
				//#endif  
			}
		}
	}
</script>

<style>
.container {
  padding-bottom: 200rpx;
}
.service-list{
  margin-top: 20rpx;
}
.list-item{
  width: 100%;
  background:rgba(255,255,255,1);
  padding-left: 24rpx;
  border-bottom: 2rpx solid rgba(242,242,242,1);
  position: relative;
}
.list-item text{
  height: 100rpx;
  font-size: 14px;
  line-height: 100rpx;
}
.list-item image{
  position: absolute;
  width: 10rpx;
  height: 16rpx;
  right: 58rpx;
  top: 42rpx;
}
.kefu{
  width: 100%;
  height: 160rpx;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  background: rgba(255,255,255,1);
  z-index: 999;
}
.kefu > view{
  width: 50%;
  float: left;
  height: 100%;
}
.kefu .phone-kefu image,.kefu .online-kefu image{
  width: 38rpx;
  height: 38rpx;
  display: block;
  margin: 22rpx auto 18rpx;
}
.kefu .phone-kefu text,.kefu .online-kefu text{
  margin-bottom: 6rpx;
  text-align: center;
  display: block;
  font-size: 12px;
  color: #333;
}
.kefu .phone-kefu text.time,.kefu .online-kefu text.time{
  color: #999;
  font-size: 10px;
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
