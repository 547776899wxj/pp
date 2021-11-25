<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">绑定银行卡</block>
		</cu-custom>
		<view class="container">
			<view class="bankinfo">
				<view class="bankinfo-list mb24">
					<view class="bankinfo-title">姓名</view>
					<view class="bankinfo-content">{{peopleInfo.peopleName}}</view>
				</view>
				<view class="bankinfo-list">
					<view class="bankinfo-title">身份证</view>
					<view class="bankinfo-content">{{peopleInfo.peopleCardNumber}}</view>
				</view>
			</view>
			<view class="content">
				<view class="fs-28 lh-28 fc-303 mb20">银行卡号</view>
				<view class="form-group">
					<input placeholder="银行卡号" name="input" placeholder-class="fc-c4cc"
					v-model="form.cardNo"
					>
				</view>
				<view class="fs-28 lh-28 fc-303 mb20">银行名称</view>
				<view class="form-group">
					<input placeholder="银行名称" name="input" placeholder-class="fc-c4cc"
					v-model="form.cardBankName"
					>
				</view>
				<view class="fs-28 lh-28 fc-303 mb20">开户行名称</view>
				<view class="form-group">
					<input placeholder="开户行名称" name="input" placeholder-class="fc-c4cc"
					v-model="form.cardOpenBankName"
					>
				</view>
				<view class="fs-28 lh-28 fc-303 mb20">银行预留手机号</view>
				<view class="form-group mb80">
					<input placeholder="银行预留手机号" name="input" placeholder-class="fc-c4cc"
					v-model="form.cardMobile"
					>
				</view>
				<view class="wp100" >
					<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onSubmit">确认绑定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchMain: false,
				peopleInfo: {},
				form:{
					cardNo:'',
					cardBankName: '',
					cardMobile: '',
					cardOpenBankName:'',
				}
			}
		},
		onLoad(options) {
			this.switchMain = options.switchMain || false 
			this.fetchPeopleInfo()
		},
		onBackPress(){
			if (this.switchMain){
				uni.switchTab({
					url:"/pages/index/main"
				})
				//阻止返回
				return true
			}
			else {
				//不阻止返回
				return false
			}
			
		},
		methods: {
			fetchPeopleInfo(){
				uni.$api.getDataByBankcardCert().then(({data}) =>{
					this.peopleInfo.peopleName = data.peopleName
					this.peopleInfo.peopleCardNumber = data.peopleCardNumber
					this.form.cardMobile = data.cardMobile || data.mobile || ''
					this.form.cardBankName = data.cardBankName || ''
					this.form.cardNo = data.cardNo || ''
					this.form.cardOpenBankName = data.cardOpenBankName || ''
					// if (data.userBankcardStatus == 1){
					// 	this.certSuccess()
					// }
				})
			},
			onSubmit(){
				uni.$api.bankcardCert(this.form).then(res =>{
					uni.$toast.showSuccess('绑定成功')
					setTimeout(()=>{
						this.certSuccess()
					},1000)
					
				})
			},
			certSuccess(){
			
				uni.$session.setUserBankCardStatus(1);
				if (this.switchMain){
					uni.switchTab({
						url:"/pages/index/main"
					})
				}
				else {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding: 32rpx 28rpx;
}
.bankinfo {
	padding: 32rpx;
	width: 100%;
	height: 172rpx;
	background: #FAFAFA;
	opacity: 1;
	border-radius: 20rpx;
}
.container .content {
	padding: 32rpx;
}
.bankinfo-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.bankinfo-title {
	width: 200rpx;
	font-size: 30rpx;
	color: #303133;
}
.bankinfo-content {
	font-size: 30rpx;
	color: #606266;
}
.border-btn {
	border-radius: 45rpx;
}
.bg-pp {
	background: linear-gradient(127deg, #E93A37 0%, #FF6346 100%);
}
.cu-btn.lg {
	font-size: 28rpx;
	height: 90rpx;
}
</style>
