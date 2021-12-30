<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">余额明细</block>
		</cu-custom>
		<view class="screen-time flex-between ac">
			<view class="dflex ac fc-939">
				<picker mode="date" :value="queryParam.flowTimeYmdMin" @change="onDateChangeMin">
					<view class="picker">
						{{queryParam.flowTimeYmdMin || '请选择'}} 
					</view>
				</picker>
				<text class="cuIcon-triangledownfill text-gray mb4"></text>
				<view class="fs-28 ml16 mr16">&nbsp;至&nbsp;</view>
				<picker mode="date" :value="queryParam.flowTimeYmdMax"  @change="onDateChangeMax">
					<view class="picker">
						{{queryParam.flowTimeYmdMax || '至今'}}
					</view>
				</picker>
				<text class="cuIcon-triangledownfill text-gray mb4"></text>
 			</view>
			<view class="dflex ac">
				<view class="fs-26 lh-36 fc-939" @click="showCheckbox">筛选</view>
				<text class="cuIcon-triangledownfill text-gray mb4"></text>
			</view>
		</view>
		<view class="container">
			<scroll-view scroll-y="true" class="pb20"  @scrolltolower="onLoadMore"  :style="'height: calc(100vh - 98rpx - ' + CustomBar +'px)'">
				<view class="balance-list dflex fdc" v-for="item in list.rows">
					<view class="flex-between ac mb8">
						<view class="fs-30 lh-44 fc-303 mw470 text-hidden">{{item.flowSmallDesc}}</view>
						<view class="fs-36rpx  fw-b lh-44" :class="{'fc-25b': item.flowType2>=50, 'fc-ff4': item.flowType2 < 50}">
						{{item.flowType2<50?'+':''}}{{item.flowMoney}}</view>
					</view>
					<view class="fs-26 fc-606 lh-36 mb8">{{flowTypeOptions[item.flowType2] || ''}}</view>
					<view class="flex-between ac">
						<view class="fs-24 lh-34 fc-939">{{item.flowTime}}</view>
						<view class="fs-24 lh-34 fc-939">余额{{item.flowBalanceMoney}}</view>
					</view>
				</view>
				
				<listempty :list="list.rows" :loading="list.loading"></listempty>
				<nomore :pageCount="list.pageCount" :pageNumber="queryParam.pageNumber"></nomore>
			</scroll-view>
			
		</view>
		
		
		<view class="cu-modal bottom-modal" :class="showFlowTypeOption?'show':''" @tap="hideCheckbox">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideCheckbox" style="color: #888;">取消</view>
					<view class="action text-blue" @tap="onConfirmCheckBox">确定</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(key,value) in flowTypeOptions" class="padding-xs">
						<button class="cu-btn lg block" :class="flowTypeOptionsCheckedTemp[value]?'bg-blue':'cancel-color'"
						 @tap="onChooseCheckbox"
						 :data-value="value"> {{key}}
							<!-- <view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view> -->
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import listempty from '@/pages/component/listempty.vue';
	import nomore from '@/pages/component/nomore.vue';
	export default {
		components: {
			listempty,
			nomore
		},
		data() {
			return {
				showFlowTypeOption: false,
				flowTypeOptions:{},
				flowTypeOptionsCheckedTemp:{},
				queryParam:{
					flowTimeYmdMin: '',
					flowTimeYmdMax: '',
					flowType2: '',
					pageNumber: 1,
				},
				list:{
					loading: false,
					pageCount:0,
					rows:[]
				},
				datestart: '2018-12-25',
				dateend: '2021-05-22',
				CustomBar: this.CustomBar,
				StatusBar : this.StatusBar,
			}
		},
		computed: {
			style() {
				var CustomBar= this.CustomBar;
				var StatusBar= this.StatusBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
		},
		onLoad() {
			uni.$api.getSearchFlowType().then(res =>{
				
				this.flowTypeOptions = {}
				res.rows.map(e =>{
					this.flowTypeOptions[e.dictValue] = e.dictName
				})
			})
			this.onFetchData()
		},
		methods: {
			onFetchData(){
				if (this.list.loading) return;
				this.list.loading = true
				uni.$api.getListForBalanceFlow(this.queryParam).then(res =>{
					console.log('res',res)
					this.list.loading = false
					if (res.callBackExtData == this.queryParam.callBackExtData){
						this.list.rows = this.list.rows.concat(res.rows)
						this.list.pageCount = res.pageCount
						this.queryParam.pageNumber ++ 
					}
				}).catch(()=>{
					this.list.loading = false
				})
			},
			onLoadMore(e){
				console.log('onReachBottom',e)
				if(this.queryParam.pageNumber<=this.list.pageCount){
					this.onFetchData()
				}
			},
			reset(){
				console.log('reset')
				this.list={
					loading: false,
					pageCount:0,
					rows:[]
				}
				this.queryParam.pageNumber = 1
				this.queryParam.callBackExtData = uni.$utils.getRandom()
			},
			showCheckbox(e) {
				this.showFlowTypeOption = true
				this.flowTypeOptionsCheckedTemp = {}
				this.queryParam.flowType2.split(',').map(value =>{
					if (value){
						this.flowTypeOptionsCheckedTemp[value] = '1'
					}
				})
				
				console.log('this.queryParam.flowType2',this.queryParam.flowType2)
				console.log('flowTypeOptionsCheckedTemp',this.flowTypeOptionsCheckedTemp)
				
			},
			hideCheckbox(e) {
				this.showFlowTypeOption = false
			},
			onChooseCheckbox(e) {
				let value = e.currentTarget.dataset.value;
				if (this.flowTypeOptionsCheckedTemp[value]){
					delete this.flowTypeOptionsCheckedTemp[value]
				}
				else {
					this.flowTypeOptionsCheckedTemp[value] = '1'
				}
				this.$forceUpdate()
			},
			onConfirmCheckBox(){
				var arr = []
				for(let value in this.flowTypeOptionsCheckedTemp){
					arr.push(value)
				}
				this.queryParam.flowType2 = arr.join(',')
				this.reset()
				this.onFetchData()
				this.hideCheckbox()
			},
			onDateChangeMin(e) {
				this.queryParam.flowTimeYmdMin =  e.detail.value
				this.reset()
				this.onFetchData()
			},
			onDateChangeMax(e) {
				this.queryParam.flowTimeYmdMax =  e.detail.value
				this.reset()
				this.onFetchData()
			},
		}
	}
</script>

<style>
	.cancel-color{
		color: #888
	}
.screen-time {
	height: 76rpx;
	background-color: #fff;
	padding: 0 20rpx;
}
.container {
	padding: 22rpx 20rpx 0;
}
.balance-list {
	padding: 22rpx 20rpx 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
.balance-list+.balance-list {
	margin-top: 20rpx;
}
.mw470 {
	max-width: 470rpx;
}
</style>
