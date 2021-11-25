<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">设置</block>
		</cu-custom>
		<view class="container">
			<view class="set-list">
				<view class="fs-30 fc-303 lh-40">头像</view>
				<view class="dflex ac">
					<image :src="userInfo.userPhoto || '/static/img/icon/default-user.png'" mode="" class="user-head" @click="onChooseImage"></image>
					<image src="../../static/img/icon/more-icon.png" class="m-icon" mode=""></image>
				</view>
			</view>
			<view class="set-list">
				<view class="fs-30 fc-303 lh-40">手机号码</view>
				<view class="dflex ac">
					<view class="fs-30 lh-40 fc-606">{{userInfo.mobile}}</view>
					<!-- <image src="../../static/img/icon/more-icon.png" class="m-icon" mode=""></image> -->
				</view>
			</view>
			<view class="set-list">
				<view class="fs-30 fc-303 lh-40">姓名</view>
				<view class="dflex ac">
					<view class="fs-30 lh-40 fc-606">{{userInfo.userCertName}}</view>
					<!-- <image src="../../static/img/icon/more-icon.png" class="m-icon" mode=""></image> -->
				</view>
			</view>
			<view class="set-list" @click="popOpen">
				<view class="fs-30 fc-303 lh-40">昵称</view>
				<view class="dflex ac">
					<view class="fs-30 lh-40 fc-606">{{userInfo.userNickName}}</view>
					<image src="../../static/img/icon/more-icon.png" class="m-icon" mode=""></image>
				</view>
			</view>
			<view class="set-list" v-if="shareUrl">
				<view class="fs-30 fc-303 lh-40">邀请海报</view>
				<view class="dflex ac">
					<view class="w100 fs-28 lh-40 fc-2e8" @click="buildPoster()">查看</view>
				</view>
			</view>
			
			<button @click="loginOut()" class="cu-btn bg-red margin-tb-sm lg" style="width: 100%;margin-top: 100rpx;">退出登录</button>
		</view>
		<helang-compress ref="helangCompress"></helang-compress>
		<uniPopup ref="popup" type="dialog">
			<uniPopupDialog
					mode="input" 
					title="昵称"
					placeholder="请输入昵称" 
					:duration="2000" 
					:before-close="true" 
					@close="popClose"
					@confirm="popConfirm(arguments)"
			 />
		</uniPopup>
		<view class="cu-modal" :class="showPoster?'show':''">
			<view class="share-pop wp100 hp100 flex-center">
				<view class="dflex fdc ac share-pop-box">
					<view class="wp100 dflex pr mb50">
						<l-painter :board="base" isRenderImage @success="posterPath = $event" />
						<!-- <image src="/static/img/bg/share-pop@2x.png" class="share-pop-image" style="width: 100%;height: 438px;" mode="scaleToFill"></image>
						<view class="share-info flex-center">
							<image class="recommend-head"></image>
							<view class="dflex fdc ai-fs">
								<view class="fs-28 lh-28 fc-f fw-b fs-i mb9">叶奋松</view>
								<view class="fs-24 lh-24 fc-f fw-b fs-i">17759008262</view>
							</view>
						</view>
						<view class="share-text flex-center">- 叶奋松邀请您注册好好获拍拍领取福利 -</view>
						<view class="recommend-code-box flex-center">
							<image src="../../static/img/bg/share-code@2x.png" class="wp100 hp100 recommend-code-bg" mode=""></image>
							<image src="../../static/img/bg/code@2x.png" class="recommend-code" style="height: 110px;" mode="scaleToFill"></image>
						</view> -->
					</view>
					<view class="flex-center">
						<view class="download-btn l-btn fs-26 lh-26 flex-center mr56" @click="showPoster = false">取消</view>
						<view class="l-btn bg-pp fc-f fs-26 lh-26 flex-center" @click="downloadSuc()">下载图片</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>

	import uniPopup from '@/components/uni-popup/uni-popup';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';
	import helangCompress from '@/components/helang-compress/helang-compress';
	import lPainter from '@/uni_modules/lime-painter/components/lime-painter/'
	export default {
		components: {
			helangCompress,uniPopup,uniPopupDialog,lPainter
		},
		data() {
			return {
				userInfo:{},
				showPoster:false,
				posterPath:'',
				shareUrl:'',
				base: {
					width: '517rpx',
					height: '880rpx',
					views: []
				}
			}
		},
		onLoad(){
			this.fetchData();
		},
		methods: {
			downloadSuc () {
				var self = this
				uni.saveImageToPhotosAlbum({
					filePath: self.posterPath,
					success(res) {
						self.showPoster = false
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			popOpen(){
				this.$refs.popup.open()
			},
			popClose(){
				this.$refs.popup.close()
			},
			popConfirm(args){
				console.log('asdf',value)
				let value = args[1].trim()
				if (!value) {
					uni.$toast.showToast('昵称不能为空')
					return
				}
				
				if (uni.$utils.getByteLen(value) >12) {
					uni.$toast.showToast('不能超过12个字符，一个中文2个字符')
					return
				}
				this.popClose()
				console.log(value)
				uni.showLoading({
				    title: '保存中'
				});
				uni.$api.saveUserNickName({
					userNickName: value
				}).then(res => {
					uni.$toast.showToast('保存成功')
					uni.hideLoading()
					this.fetchData()
				}).catch(()=>{
					uni.hideLoading()
				})
			},
			fetchData(){
				uni.$api.getUserInfo().then(res=>{
					this.userInfo = res.data || {};
				})
				
				uni.$api.getUserSpreadShareUrl().then(res => {
					this.shareUrl = res.url
				})
			},
			buildPoster() {
				
				uni.showLoading({
					title:"正在生成中。。。"
				})
				
				var nickName = this.userInfo.userNickName?this.userInfo.userNickName:''
				var mobile = this.userInfo.mobile?this.userInfo.mobile:''
				if (mobile && mobile.length > 7) {
					var reg = /^(\d{3})\d{4}(\d{4})$/;
					mobile = mobile.replace(reg, "$1****$2")
				}
				
				var self = this
				var poster = {
					width: '517rpx',
					height: '880rpx',
					views: [
						{
							type: 'image',
							src:uni.$index.DOMAIN+'/static/v4/m/img/bg/share-pop@2x.png',
							mode: 'scaleToFill',
							css: {
								left: '0rpx',
								top: '0rpx',
								width: '517rpx',
								height: '880rpx'
							}
						},
						{
							type: 'image',
							src:self.userInfo.userPhoto?self.userInfo.userPhoto:'/static/img/icon/default-user.png',
							mode: 'scaleToFill',
							css: {
								top:'72rpx',
								left:'145rpx',
								width: '64rpx',
								height: '64rpx',
								radius: '10rpx',
								backgroundColor: '#fff'
							}
						},
						{
							type: 'text',
							text: nickName,
							css: {
								color: '#fff',
								left: '225rpx',
								top: '65rpx',
								fontWeight:'bold',
								fontSize: '28rpx',
								lineHeight: '28rpx'
							}
						},
						{
							type: 'text',
							text: mobile,
							css: {
								color: '#fff',
								left: '225rpx',
								top: '105rpx',
								fontWeight:'bold',
								fontSize: '28rpx',
								lineHeight: '28rpx'
							}
						},
						{
							type: 'text',
							text: '- '+nickName+'邀请您注册好获拍拍领取福利 -',
							css: {
								width:'517rpx',
								color: '#fff',
								left:'0rpx',
								top: '266rpx',
								fontSize: '24rpx',
								lineHeight: '24rpx',
								textAlign:'center'
							}
						},
						{
							type: 'image',
							src:'/static/img/bg/share-code@2x.png',
							mode: 'scaleToFill',
							css: {
								top:'502rpx',
								left:'143rpx',
								width: '235rpx',
								height: '235rpx',
								radius: '10rpx',
								backgroundColor: '#fff'
							}
						},
						{
						    type: 'qrcode',
						    text: self.shareUrl,
						    css: {
						        left: '151rpx',
						        top: '511rpx',
						        width: '218rpx',
						        height: '218rpx'
						    }
						},
						{
							type: 'image',
							src:'/static/img/images/logo_55.png',
							mode: 'scaleToFill',
							css: {
								top:'593rpx',
								left:'233rpx',
								width: '55rpx',
								height: '55rpx'
							}
						},
					]
				}
				self.base = poster
				setTimeout(function () {
					uni.hideLoading()
					self.showPoster = true
				},1000)
				
			},
			loginOut:function(){
				uni.$session.loginOUt();
				uni.reLaunch({
					url:"../login/login"
				})
			},
			onChooseImage(){
				const _self = this;
				uni.chooseImage({
					count:1,
					success:function(res){
						// 单张压缩
						_self.$refs.helangCompress.compress({
						    src: res.tempFilePaths[0],
						    maxSize:800,
						    fileType:'png',
						    quality:0.85
						}).then((compressRes)=>{
						    // 压缩成功回调
							uni.$api.uploadFileOSS(compressRes).then(result =>{
								_self.saveUserPhoto(result.path);				
							})
						}).catch((err)=>{
						    // 压缩失败回调
							uni.$toast.showToast('图片压缩失败')
						})
					}
				})
			},
			saveUserPhoto(url){
				
					const _self = this;
				uni.$api.saveUserPhoto({userPhoto:url}).then(res =>{
					uni.$toast.showSuccess('保存成功');
					_self.userInfo.userPhoto = url
				});
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding: 0 60rpx; 
}
.set-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40rpx 0;
	border-bottom: 2rpx solid #f7f7fa;
}
.user-head {
	width: 112rpx;
	height: 112rpx;
	border-radius: 50%;
	flex-shrink: 0;
	margin-right: 20rpx;
}
.cu-modal {
	z-index: 10000;
}
.share-pop {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.share-close {
	width: 21rpx;
	height: 21rpx;
	padding: 20rpx;
	box-sizing: content-box;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 5;
}
.share-pop-box {
	width: 517rpx;
}
.share-pop-image {
	width: 100%;
}
.share-info {
	position: absolute;
	top: 72rpx;
	left: 0;
	right: 0;
	text-align: center;
	margin: 0 auto;
}
.share-text {
	/* width: 326rpx; */
	margin: 0 auto;
	font-size: 24rpx;
	font-weight: bold;
	font-style: italic;
	background: linear-gradient(0deg, #FCE5CB 0%, #FFFFFF 99.5849609375%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	position: absolute;
	top: 266rpx;
	left: 0;
	right: 0;
}
.recommend-head {
	width: 64rpx;
	height: 64rpx;
	border-radius: 10rpx;
	margin-right: 16rpx;
	background-color: #fff;
}
.recommend-code-box {
	width: 235rpx;
	height: 235rpx;
	position: absolute;
	bottom: 143rpx;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.recommend-code-bg {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 3;
}
.recommend-code {
	width: 218rpx;
	position: relative;
	z-index: 5;
}
.download-btn {
	border: 2rpx solid #f6f6f6;
	color: #f6f6f6;
}
</style>
