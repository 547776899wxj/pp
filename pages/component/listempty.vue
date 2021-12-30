<template>
	<view>	
		<view class="kzt-box flex-center fdc" v-show="!loading&&(!list || list.length===0)">
			<image :src="domainStatic+'/img/images/kzt@2x.png'" class="kzt mb40" mode=""></image>
			<view class="fs-28 fc-606">暂无数据</view>
		</view>
		<view v-show="loading" class="kzt-box flex-center">
			<image :src="domainStatic+'/img/images/page-loading.gif'" class="loading" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array,
			loading:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				domainStatic:this.domainStatic
			}
		},
	watch:{
		list(nv){
			this.$forceUpdate()
		}
	},
		methods: {

		}
	}
</script>

<style>
	.kzt-box {
		padding: 15vh 0;
	}
	.kzt {
		width: 240rpx;
		height: 240rpx;
		display: block;
		margin: auto;
	}
	.loading {
		width: 480rpx;
		height: 480rpx;
		display: block;
		margin: auto;
	}
</style>
