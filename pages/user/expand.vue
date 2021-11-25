<template>
	<view>
		<cu-custom bgColor="bg-f6" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">拓客管理</block>
		</cu-custom>
		<view class="container">
			<view class="toker-achievements flex-center">
				<view class="flex-center fdc wp50">
					<view class="fs-48 lh-60 fc-303 fw-b mb8">{{info.recUserCount}}</view>
					<view class="fs-24 lh-34 fc-939">直推人员</view>
				</view>
				<view class="toker-line"></view>
				<view class="flex-center fdc wp50">
					<view class="fs-48 lh-60 fc-303 fw-b mb8">{{info.teamConsumeMoneySum}}</view>
					<view class="fs-24 lh-34 fc-939">团队业绩</view>
				</view>
			</view>
			<view class="manage-box">
				<view class="flex-center mb18">
					<view class="wp50 flex-center" >
						<view class="line-btn bdr-45 flex-center fc-303 operation-btn" @click="onAllUp">全部收起</view>
					</view>
					<view class="wp50 flex-center">
						<view class="line-btn bdr-45 flex-center fc-303 operation-btn" @click="onAllDown">全部展开</view>
					</view>
				</view>
				<view class="">
					<table >
						<tr>
							<th></th>
							<th>姓名</th>
							<th>成为时间</th>
							<th>消费额(￥)</th>
							<th>直推数</th>
						</tr>
						<template v-for="(item, index) in info.children">
							<tr @click="gotoDetail" :data-user-id="item.userId" :data-level="1">
								<td class="bt2 bb2" @click.stop="onChangeExtand(index)"><view class="dflex ac h88">{{item.userCertName||item.mobile}}<text :class="{'cuIcon-triangledownfill':item.down===true, 'cuIcon-triangleupfill': !(item.down===true)}"></text></view></td>
								<td class="bt2 bb2"></td>
								<!-- <td class="bt2 bb2">2021/03/23</td> -->
								<td class="bt2 bb2">{{item.recommendUserTime | formatDateYMD}}</td>
								<td class="bt2 bb2">{{item.userConsumeMoneySum}}</td>
								<td class="bt2 bb2">{{item.recUserCount}} <text class="cuIcon-right ml8 mr-24"></text></td>
							</tr>
							<tr v-if="item.down" v-for="subItem in item.children"  @click="gotoDetail" :data-user-id="subItem.userId" :data-level="2">
								<td></td>
								<td>{{subItem.userCertName || subItem.mobile}}</td>
								<!-- <td>2021/03/23</td> -->
								<td>{{subItem.recommendUserTime  | formatDateYMD}}</td>
								<td>{{subItem.userConsumeMoneySum}}</td>
								<td>{{subItem.recUserCount}} <text class="cuIcon-right ml8 mr-24"></text></td>
							</tr>
						</template>
					</table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					children:[]
				}
			}
		},
		onLoad() {
			this.onFetchData()
		},
		computed:{
			
		},
		methods: {
			onFetchData(){
				uni.$api.getUserBesinessInfo().then(res =>{
					this.info = res.data
				})
			},
			onChangeExtand(index){
				console.log('onChangeExtand',index)
				this.info.children[index].down = !this.info.children[index].down
				this.$forceUpdate()
			},
			onAllUp(){
				console.log('onAllUp')
				this.info.children.map(e =>{
					e.down = false
				})
				this.$forceUpdate()
			},
			onAllDown(){
				this.info.children.map(e =>{
					e.down = true
				})
				this.$forceUpdate()
			},
			gotoDetail(value){
				console.log('gotoDetail',value)
				let userId = value.currentTarget.dataset.userId
				let level = value.currentTarget.dataset.level
				uni.navigateTo({
					url: `/pages/user/expenddetail?userId=${userId}&level=${level}`
				})
			}
		}
	}
</script>

<style>
page {
	background-color: #fff;
}
.toker-achievements {
	height: 172rpx;
	background-color: #f6f6f6;
}
.toker-line {
	width: 2rpx;
	height: 48rpx;
	background-color: #c4c4cc;
}
.operation-btn {
	width: 172rpx;
	height: 56rpx;
}
.manage-box {
	padding: 16rpx 32rpx;
}
table {
	width: 100%;
}
table tr th {
	height: 66rpx;
	color: #939399;
}
table tr th,
table tr td {
	padding: 0 8rpx;
	font-size: 24rpx;
	height: 68rpx;
	font-weight: 400;
	text-align: left;
}
table tr th:first-child,
table tr td:first-child {
	width: 140rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: #303133;
	padding: 0;
}
table tr th:nth-child(2),
table tr td:nth-child(2) {
	width: 96rpx;
}
table tr th:nth-child(3),
table tr td:nth-child(3) {
	width: 150rpx;
}
table tr td:nth-child(4) {
	color: #FF411C;
}
table tr th:last-child,
table tr td:last-child {
	width: 72rpx;
	text-align: right;
}
.h88 {
	height: 88rpx;
}
.bt2 {
	border-top: 2rpx solid #f7f7fa;
}
.bb2 {
	border-bottom: 2rpx solid #f7f7fa;
}
.mr-24 {
	margin-right: -28rpx;
}
</style>
