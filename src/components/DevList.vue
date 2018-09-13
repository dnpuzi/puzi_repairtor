<template>
	<section class="DevList">
		<span class="dot"></span>
		<router-link tag="section" class="main_info" :to=" '/DevInfo/' + data.id">
			<p class="time">{{data.time_s}}</p>
			<section class="info">
				<span class="item">机型：<span class="dev_name">{{data.dev_name}}</span></span>
				<span class="item">用户名：<span class="username">{{data.username}}</span></span>
			</section>
		</router-link>
	</section>
</template>

<script>
export default {
	name:　'DevList',
	data() {
		return {

		}
	},
	props: {
		data: {
			type: Object
		}
	}
}
</script>

<style scoped lang="scss">
.DevList {
	width: 100%;
	font-size: 12px;
	position: relative;
	padding-left: 24px;
	box-sizing: border-box;
	position: relative;
	margin-bottom: 10px;
	.dot {
		width: 10px;
		height: 10px;
		background: #97c3ff;
		border-radius: 10px;
		position: absolute;
		left: 0;
		top: 10px;
	}
	.main_info {
		border-bottom: 1px solid #dedede;
		padding-bottom: 10px;
		.time {
			color: #101115;
			font-size: 14px;
			line-height: 30px;
		}
		.item {
			margin-right: 20px;
			color: #aba6ae;
			font-size: 12px;
			span {
				color: #2d313c;
			}
		}
	}
}
</style>