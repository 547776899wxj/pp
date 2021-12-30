<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">添加收货地址</block>
		</cu-custom>
		<view class="container">
			<view class="fs-28 lh-28 fc-303 mb20">收货人</view>
			<view class="form-group">
				<input placeholder="收货人" name="input" placeholder-class="fc-c4cc" v-model="address.addressContacts">
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">手机号码</view>
			<view class="form-group">
				<input placeholder="手机号码" name="input" placeholder-class="fc-c4cc" v-model="address.addressMobile">
			</view>
			<view class="fs-28 lh-28 fc-303 mb20">选择地区</view>
			<view class="form-group">
				<view class="flex-between ac drop-down">
					<picker mode="multiSelector" ref="areaPicker" @change="MultiChange" @columnchange="MultiColumnChange"
					:value="multiIndex" :range="multiArray" range-key="areaname" class="wp100 hp100" >
						<view class="picker" style="width: 100%;height: 100%;line-height: 90rpx;">
							{{address.addressAreaString||'请选择地区'}}
						</view>
					</picker>
					<image :src="domainStatic+'/img/icon/more-icon.png'" mode="" class="m-icon"></image>
				</view>
			</view>
			<view class="flex-between ai-fe mb20">
				<view class="fs-28 lh-28 fc-303">详细地址</view>
			</view>
			<view class="form-group textarea">
				<textarea maxlength="-1" v-model="address.addressDesc" @input="textareaAInput" placeholder=""></textarea>
			</view>
				<button class="cu-btn border-btn bg-pp fc-f lg wp100" @click="saveAddress">提交</button>
		</view>
	</view>
</template>

<script>
	let areaJson = require('@/static/json/area.json')
	export default {
		data() {
			return {
				form: [],
				multiArray: [
					[],[],[]
				],
				multiIndex: [0, 0, 0],
				areaname:"",
				addressId:"",
				address:{
					addressId:"",
					addressIdAutoId:"",
					addressUserId:"",
					addressAreaId:"",
					addressAreaString:"",
					addressDesc:"",
					addressContacts:"",
					addressMobile:"",
					addressCreateTime:"",
					addressDefaultStatus:"",
					addressLng:"",
					addressLat:"",
					addressWx:"",
					addressWxAlias:"",
					addressSex:""
				},
				pickerDisable:false,
				domainStatic:this.domainStatic,
			}
		},
		onLoad (e) {
			console.log("onLoad:",JSON.stringify(e))
			var addressId = e.addressId
			this.addressId = addressId
			console.log("onLoad:",this.addressId)
			this.initAreaJson()
			this.getAddressInfo()
		},
		methods: {
			getAddressInfo () {
				if (!this.addressId) {
					// this.setAddressIndex()
					return
				}
				var params = {
					addressId:this.addressId
				}
				uni.$api.getAddressDetail(params).then(res => {
					if (res.success) {
						this.address = res.data
						this.setAddressIndex()
					}
				})
			},
			/**
			 * 遍历组装 三级联动控件的下标数组
			 */
			setAddressIndex () {
				var addressAreaId = this.address.addressAreaId+""
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
				this.setAreaName()
			},
			showPicker () {
				// console.log("showPicker")
				// this.$refs.areaPicker.$el.click();
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
			initAreaJson () {
				var privince = areaJson
				var city = privince[0].childArea
				var area = city[0].childArea
				this.multiArray = [privince,city,area]
				var addressAreaId = this.getAddressAreaId()
				this.address.addressAreaId = addressAreaId
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				var addressAreaId = this.getAddressAreaId()
				this.address.addressAreaId = addressAreaId
				this.setAreaName()
			},
			setAreaName (areaname) {
				if (areaname) {
					this.address.addressAreaString = areaname
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
					this.address.addressAreaString = nameArr.join("-")
					console.log("111:",this.address.addressAreaString)
				}
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
				this.address.addressDesc = e.detail.value
			},
			saveAddress () {
				if (!this.address.addressContacts) {
					uni.$toast.showError("请输入收货人")
					return
				}
				if (!this.address.addressMobile) {
					uni.$toast.showError("请输入收货人手机号码")
					return
				}
				if (!this.checkPhone()) {
					uni.$toast.showError("手机号码格式错误")
					return
				}
				if (!this.address.addressAreaId) {
					uni.$toast.showError("请选择地区")
					return
				}
				if (!this.address.addressDesc) {
					uni.$toast.showError("请输入详细地址")
					return
				}
				
				uni.$api.saveAddress(this.address).then(res => {
					uni.$toast.alert("保存成功")
				}).catch(res => {
					uni.$toast.showError(res.message)
				})
			},
			getLocation () {
				var self = this
				uni.chooseLocation({
					success(res) {
						self.address.addressLng = res.longitude
						self.address.addressLat = res.latitude
						self.address.addressWx = res.address
						self.address.addressWxAlias = res.name
						self.address.addressDesc = res.address+res.name
					}
				})
			},
			checkPhone () {
				var phone = this.address.addressMobile
				if(!(/^1[3456789]\d{9}$/.test(phone))){ 
					return false; 
				} 
				return true
			}
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
.border-btn {
	border-radius: 45rpx;
}
</style>
