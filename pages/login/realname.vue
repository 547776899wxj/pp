<template>
	<view>
		<cu-custom bgColor="bg-white" class="solid-bottom" :isBack="true" :backMethod="'myBack'" @myBack="myBack"><block slot="content">实名认证</block></cu-custom>
		<view class="container">
			<view class="dflex form-image-group">
				<view class="mr30">
					<view class="fs-28 lh-28 fc-303 mb20">上传证件照正面</view>
					<view class="form-group" @tap="onSelectPeopleCardPicA">
						<image v-if="!form.peopleCardPicA" src="../../static/img/images/idcard1@2x.png"></image>
						<image v-else :src="form.peopleCardPicA"></image>
					</view>
				</view>
				<view>
					<view class="fs-28 lh-28 fc-303 mb20">上传证件照反面</view>
					<view class="form-group" @tap="onSelectPeopleCardPicB">
						<image v-if="!form.peopleCardPicB" src="../../static/img/images/idcard2@2x.png"></image>
						<image v-else :src="form.peopleCardPicB"></image>
					</view>
				</view>
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">姓名</view>
			<view class="form-group">
				<input placeholder="请输入姓名" name="input" placeholder-class="fc-c4cc" v-model="form.peopleName">
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">身份证</view>
			<view class="form-group mb20">
				<input placeholder="请输入身份证号码" name="input" placeholder-class="fc-c4cc"  v-model="form.peopleCardNumber"></input>
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">选择拍品的收货地区</view>
			<view class="form-group">
				<view class="flex-between ac drop-down">
					<picker mode="multiSelector" ref="areaPicker" @change="MultiChange" @columnchange="MultiColumnChange"
					:value="multiIndex" :range="multiArray" range-key="areaname" class="wp100 hp100" >
						<view class="picker" style="width: 100%;height: 100%;line-height: 90rpx;">
							{{form.addressAreaString||'请选择地区'}}
						</view>
					</picker>
					<image src="/static/img/icon/more-icon.png" mode="" class="m-icon"></image>
				</view>
			</view>
			<view class="flex-between ai-fe mb20">
				<view class="fs-28 lh-28 fc-303">填写拍品的详细收货地址</view>
			</view>
			<view class="form-group textarea">
				<textarea maxlength="-1" v-model="form.addressDesc" @input="textareaAInput" placeholder=""></textarea>
			</view>
			<view class="wp100 mb32">
				<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="onSubmit">提交</button>
			</view>
		</view>
		
		<!-- 暂不使用 -->
		<view class="cu-modal agreement-modal" :class="{show:showPop}">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content fw-b">客户须知</view>
					<view class="action" @tap="showPop=false">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="padding-lg pt0 agreement-content lh-48 fs-28 fc-303">
					<scroll-view scroll-y="true" class="hp100">
						<view>个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇的个人信息。本隐私政策中涉及的个人信息包括：基本信息（包括个人姓名、生日、性别、住址、个人电话号码、电子邮箱）；个人身份信息（包括身份证、军官证、护照、驾驶证等）；个人生物识别信息（包括声纹、面部识别特征等）；网络身份标识信息（包括个人信息主体账号、IP地址、个人数字证书等）；个人财产信息（包括交易和消费记录、余额、京豆、优惠券、京东E卡、游戏类兑换码等虚拟财产信息）；通讯录；个人上网记录（包括网页浏览记录、软件使用记录、点击记录）；个人常用设备信息（包括硬件型号、设备MAC地址、操作系统类型、软件列表唯一设备识别码（如IMEI/androidID/IDFA/OPENUDID/GUID、SIM卡IMSI信息等在内的描述个人常用设备基本情况的信息））；个人位置信息（包括行程信息、精准定位信息、住宿信息、经纬度等）；其中，字体加粗部分为涉及的个人敏感信息。				
						</view>
					</scroll-view>
				</view>
				<view class="padding-lg pt0 cu-bar bg-white fdc jc-c">
					<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="showPop=false">已阅读，本人已知晓上述内容</button>
				</view>
			</view>
		</view>
		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	let areaJson = require('@/static/json/area.json')
	
	import helangCompress from '@/components/helang-compress/helang-compress';
	export default {
		components: {
			helangCompress
		},
		data() {
			return {
				delta:1,
				showPop: false,
				multiArray: [
					[],[],[]
				],
				multiIndex: [0, 0, 0],
				form:{
					addressAreaId: '',
					addressAreaString: '',
					addressDesc: '',
					peopleName: '',
					peopleCardNumber: '',
					ocrName:'',
					ocrCardNumber:'',
					peopleCardPicA: '',
					peopleCardPicB: '',
				}
			}
		},
		onLoad(options) {
			var privince = areaJson
			var city = privince[0].childArea
			var area = city[0].childArea
			this.multiArray = [privince,city,area]
			
			//请求身份证数据
			uni.$api.getDataByPeopleCert().then(res =>{
				let {peopleName='', peopleCardNumber='', peopleCardPicA='', peopleCardPicB='', peopleCertStatus, addressAreaId, addressAreaString, addressDesc} = res.data
				this.form.peopleName = peopleName
				this.form.peopleCardNumber = peopleCardNumber
				this.form.peopleCardPicA = peopleCardPicA
				this.form.peopleCardPicB = peopleCardPicB
				this.form.addressAreaId = addressAreaId || ''
				this.form.addressAreaString = addressAreaString || ''
				this.form.addressDesc = addressDesc || ''
				if (peopleCertStatus == 2){
					//已认证通过
					this.onCertSuccess()
				}
				this.setAddressIndex()
				console.log('this.form',this.form)
			})
		},
		onBackPress(){
			setTimeout(()=>{
				this.myBack()
			},100)
			//阻止返回
			return true
		},
		methods: {
			myBack () {
				uni.switchTab({
					url:"/pages/index/main"
				})
			},
			onSelectPeopleCardPicA(){
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
								_self.form.peopleCardPicA = result.path
								uni.$api.idCardOCR({
									autoShowErrMsg: false,
									url: result.path,
								}).then(idRes =>{
									let {name,number} = idRes
									_self.form.peopleName = name
									_self.form.peopleCardNumber = number
									_self.form.ocrName = name
									_self.form.ocrCardNumber = number
								})					
							})
						}).catch((err)=>{
						    // 压缩失败回调
							uni.$toast.showToast('图片压缩失败')
						})
					}
				})
			},
			onSelectPeopleCardPicB(){
				const _self = this;
				uni.chooseImage({
					count:1,
					success:function(res){
						_self.$refs.helangCompress.compress({
						    src: res.tempFilePaths[0],
						    maxSize:800,
						    fileType:'png',
						    quality:0.85
						}).then((compressRes)=>{
						    // 压缩成功回调
							uni.$api.uploadFileOSS(compressRes).then(result =>{
								_self.form.peopleCardPicB = result.path					
							})
						}).catch((err)=>{
						    // 压缩失败回调
							uni.$toast.showToast('图片压缩失败')
						})
					}
				})
			},
			onSubmit(){
				let {peopleName,peopleCardNumber,ocrName,ocrCardNumber,peopleCardPicA,peopleCardPicB,addressAreaId,addressAreaString,addressDesc} = this.form
				if (!peopleCardPicA) {
					uni.$toast.showError('证件照正面不能为空'); 
					return;
				}
				if (!peopleCardPicB) {
					uni.$toast.showError('证件照反面不能为空'); 
					return;
				}
				if (!peopleName) {
					uni.$toast.showError('姓名不能为空'); 
					return;
				}
				if (!peopleCardNumber) {
					uni.$toast.showError('身份证号码不能为空'); 
					return;
				}
				if (!addressAreaId) {
					uni.$toast.showError('请选择收货区域'); 
					return;
				}
				if (!addressAreaString) {
					uni.$toast.showError('请选择收货区域'); 
					return;
				}
				if (!addressDesc) {
					uni.$toast.showError('请输入详情收货地址'); 
					return;
				}
				
				
				uni.$api.peopleCert({
					peopleCardPicA: peopleCardPicA,
					peopleCardPicB: peopleCardPicB,
					ocrName: ocrName,
					ocrCardNumber: ocrCardNumber,
					name: peopleName,
					cardNumber: peopleCardNumber,
					addressAreaId: addressAreaId,
					addressAreaString: addressAreaString,
					addressDesc: addressDesc
				}).then(res =>{
					let {autoCert=0} = res
					if (autoCert == 1){
						uni.$toast.showSuccess('认证通过')
						this.onCertSuccess()
					}
					else {
						uni.$toast.showSuccess('已提交审核')
					}
				})
			},
			onCertSuccess(){
				uni.$session.setUserPeopleStatus(1);
				// uni.redirectTo({
				//     url: '/pages/login/bankcard?switchMain=1'
				// });
				this.myBack()
			},
			
			
			getAddressAreaId () {
				var addressAreaId = ""
				var area = this.multiArray[2][this.multiIndex[2]]
				if (area) {
					addressAreaId = area.id
				} else {
					var city = this.multiArray[1][this.multiIndex[1]]
					if (city) {
						addressAreaId = city.id
					} else {
						addressAreaId = this.multiArray[0][this.multiIndex[0]].id
					}
				}
				return addressAreaId
			},
			setAddressIndex () {
				var addressAreaId = this.form.addressAreaId&&this.form.addressAreaId+'' || ""
				var privinceCode = addressAreaId.substring(0,2);
				var cityCode = addressAreaId.substring(0,4);
				var areaCode = addressAreaId;
				
				var privinceIndex = 0;
				var cityIndex = 0;
				var areaIndex = 0;
				
				for (let i = 0;i< this.multiArray[0].length;i++) {
					let id = this.multiArray[0][i].id+""
					id = id.substring(0,2)
					if (id == privinceCode) {
						privinceIndex = i
						if (this.multiArray[0][privinceIndex].childArea) {
							this.multiArray[1] = this.multiArray[0][privinceIndex].childArea
						} else {
							this.multiArray[1] = []
							this.multiArray[2] = []
						}
						break;
					}
				}
				
				if (this.multiArray[1].length > 0) {
					for (let i = 0;i< this.multiArray[1].length;i++) {
						let id = this.multiArray[1][i].id+""
						id = id.substring(0,4)
						if (id == cityCode) {
							cityIndex = i
							if (this.multiArray[1][cityIndex].childArea) {
								this.multiArray[2] = this.multiArray[1][cityIndex].childArea
							} else {
								this.multiArray[2] = []
							}
							break;
						}
					}
				}
				
				if (this.multiArray[2].length > 0) {
					for (let i = 0;i< this.multiArray[1].length;i++) {
						let id = this.multiArray[2][i].id+""
						if (id == areaCode) {
							areaIndex = i
							break;
						}
					}
				}
				
				this.multiIndex = [privinceIndex,cityIndex,areaIndex]
				this.setAreaName(addressAreaId)
			},
			setAreaName (addressAreaId) {
				console.log('addressAreaId',addressAreaId)
				if (!addressAreaId) {
					this.form.addressAreaString = ''
				} else {
					var {multiIndex,multiArray} = this
					var nameArr = []
					
					if (multiArray[0][multiIndex[0]]) {
						nameArr.push(multiArray[0][multiIndex[0]].areaname)
					}
					if (multiArray[1][multiIndex[1]]) {
						nameArr.push(multiArray[1][multiIndex[1]].areaname)
					}
					if (multiArray[2][multiIndex[2]]) {
						nameArr.push(multiArray[2][multiIndex[2]].areaname)
					}
					this.form.addressAreaString = nameArr.join("-")
					console.log("111:",this.form.addressAreaString)
				}
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				var addressAreaId = this.getAddressAreaId()
				this.form.addressAreaId = addressAreaId
				this.setAreaName(addressAreaId)
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						var privince = data.multiArray[0][data.multiIndex[0]]
						var city = []
						var area = []
						if (privince.childArea) {
							city = privince.childArea
						}
						if (city.length > 0) {
							area = city[0].childArea || []
						}
						
						data.multiArray[1] = city
						data.multiArray[2] = area
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
					case 1:
						var city = data.multiArray[1][data.multiIndex[1]]
						var area = city.childArea || []
						data.multiArray[2] = area
						data.multiIndex[2] = 0;
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
				this.$forceUpdate()
			},
			
			textareaAInput(e) {
				this.form.addressDesc = e.detail.value
			},
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.container {
	padding: 32rpx 60rpx;
}
.mt-12 {
	margin-top: -12px;
}
.mb84 {
	margin-bottom: 84rpx;
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
.form-image-group .form-group {
	height: auto;
}
.form-image-group .form-group image {
	width: 300rpx;
	height: 184rpx;
}
.agreement-modal {
	z-index: 10000;
}
.agreement-content {
	height: 740rpx;
	background: #FFFFFF;
	opacity: 1;
	border-radius: 12px;
}
.drop-down {
	width: 100%;
	height: 90rpx;
	border-radius: 20rpx;
	border: 2rpx solid #DDDDE6;
	padding: 0 32rpx;
}
.location-icon {
	width: 40rpx;
	height: 40rpx;
}
.textarea {
	height: auto;
}
.textarea textarea {
	background: #FFFFFF;
	border: 2rpx solid #DDDDE6;
	opacity: 1;
	border-radius: 16rpx;
	padding: 24rpx 32rpx;
	font-size: 30rpx;
	line-height: 42rpx;
	color: #606266;
	width: 100%;
}
.textarea textarea::placeholder {
	color: #c4c4cc;
}
.line-de6 {
	color: #303133;
	border: 1px solid #DDDDE6;
}
.w154 {
	width: 154rpx;
}
.cu-dialog {
	border-radius: 24rpx;
}
</style>
