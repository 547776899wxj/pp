<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true">
			<block slot="content">意见反馈</block>
		</cu-custom>
		<view class="container">
			<view class="evaluateCard">
				<view class="tabCard">
					<view v-for="(item,index) in labels" @click="labelIndex=index">
						<text :class="index==labelIndex?'btn':''">{{item.labelName}}</text>
					</view>
					<view class="clr"></view>
				</view>
				<view class="conts">
					<textarea class="areas" placeholder='填写您的评价，给其他小伙伴购买建议' minlength="10" maxlength="120"
						bindblur="inputs" value='' v-model="form.suggestContent">
				        <text class="currentWordNumber">{{currentWordNumber}}/{{max}}</text>
						<text class="hint">{{texts}}</text>
				    </textarea>
				</view>
				<view class="addImg">
					<view class='img_box' v-for="(item,index) in form.imgList">
						<image class='goods' :src='item'></image>
						<image class='close' :src="domainStatic+'/img/icon/goods-close@3x.png'" @click="form.imgList.splice(index,1)"></image>
					</view>
					<view class="add_box" @click="onChooseImage">
						<image :src="domainStatic+'/img/icon/d_img@3x.png'"></image>
						<text>添加图片</text>
					</view>
				</view>
				<view class="button-btn" @click="onSubmit">
					<button class="cu-btn bdr-45 bg-pp fc-f lg wp100">提交</button>
				</view>
			</view>
		</view>
		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	
	import helangCompress from '@/components/helang-compress/helang-compress';
	export default {
		components: {
			helangCompress
		},
		data() {
			return {
				currentWordNumber:0,
				max: 120,
				texts: "",
				labelIndex:0,
				labels:[],
				form:{
					suggestLabelId:'',
					suggestContent:'',
					imgList:[]
				},
				domainStatic:this.domainStatic,
			}
		},
		onLoad(){
			this.fetchData();
		},
		methods: {
			fetchData(){
				uni.$api.getSuggestLabels().then(res=>{
					this.labels = res.rows || [];
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
								_self.form.imgList.push(result.path);					
							})
						}).catch((err)=>{
						    // 压缩失败回调
							uni.$toast.showToast('图片压缩失败')
						})
					}
				})
			},
			onSubmit(){
				if(!this.form.suggestContent || this.form.suggestContent.trim()==''){
					uni.$toast.showError('请填写反馈内容');
					return;
				}
				if(this.labels.length){
					this.form.suggestLabelId = this.labels[this.labelIndex].labelId;
				}
				if(this.form.imgList.length){
					this.form.imgUrls = JSON.stringify(this.form.imgList);
				}
				uni.$api.saveSuggest(this.form).then(res=>{
					uni.$toast.showSuccess('提交成功');
				})
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.evaluateCard {
		width: 100%;
		padding: 24rpx;
	}

	.head {
		font-size: 14px;
		color: #333;
		font-weight: bold;
		line-height: 28rpx;
	}

	.clr {
		clear: both;
	}

	.tabCard {
		width: 100%;
		margin: 24rpx 0;
	}

	.tabCard text {
		padding: 14rpx 32rpx;
		min-width: 176rpx;
		font-size: 28rpx;
		color: #555;
		line-height: 40rpx;
		margin-right: 24rpx;
		margin-bottom: 12rpx;
		background: rgba(242, 242, 242, 1);
		display: block;
		float: left;
		height: 68rpx;
		box-sizing: border-box;
		text-align: center;
		border-radius: 8rpx;
	}

	.tabCard text.btn {
			background: linear-gradient(127deg, #E93A37 0%, #FF6346 100%) !important;
			color: #fff;
		}

	.conts {
		width: 100%;
		height: auto;
		padding: 24rpx;
		background: #F2F2F2;
		border-radius: 12rpx;
	}

	.currentWordNumber {
		font-size: 24rpx;
		color: #999999;
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.areas {
		width: 100%;
		height: 292rpx;
		font-size: 28rpx;
		font-family: "PingFangSC-Regular,PingFang SC";
		font-weight: 400;
		color: #333;
	}

	.hint {
		font-size: 28rpx;
		position: absolute;
		top: 120rpx;
		left: 30rpx;
		color: #FF6600;
	}

	.addImg {
		width: 100%;
		display: flex;
		flex-direction: initial;
		margin-top: 24rpx;
	}

	.addImg .add_box {
		width: 162rpx;
		height: 162rpx;
		background: rgba(242, 242, 242, 1);
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.addImg .add_box image {
		width: 52rpx;
		height: 44rpx;
		margin-bottom: 10rpx;
	}

	.addImg .add_box text {
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.addImg .img_box {
		width: 162rpx;
		height: 162rpx;
		border-radius: 12rpx;
		overflow: hidden;
		margin-right: 18rpx;
	}

	.addImg .img_box:nth-child(5n) {
		margin-right: 0;
	}

	.addImg .img_box .goods {
		width: 100%;
		height: 100%;
	}

	.addImg .img_box .close {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		margin-left: -40rpx;
	}

.button-btn {
		left: 12rpx;
		position: fixed;
		bottom: 24rpx;
		width: calc(100% - 24rpx);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
