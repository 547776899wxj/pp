<template>
	<view class="no-more" v-if="pageCount>1 && pageCount<=pageNumber">
		<view class="fs-24 lh-34 fc-939">没有更多啦~</view>
	</view>
</template>

<script>
	export default {
		props:{
			pageCount:Number,
			pageNumber:Number
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.no-more {
	padding: 24rpx 0;
	text-align: center;
}
</style>
