<template>
	<div class="PcHeader">
		<div class="container">
			<span class="logo left">学长的电脑铺子</span>
			<!-- <span class="right" v-show="this.$store.state.userInfo.username == undefined">登录</span> -->
			<Dropdown class="right" v-show="this.$store.state.userInfo.username != undefined" @command="handleDrop">
				<span class="el-dropdown-link" style="cursor: pointer; color: #fff!important;">
				{{this.$store.state.userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<DropdownMenu slot="dropdown">
					<DropdownItem @click="console.log(1)" command="logout">退出</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<router-link to="/adminPcLoginSearch" class="searchBtn right">查询</router-link>
			<router-link to="/adminPcLogin" class="searchBtn right">主页</router-link>
		</div>
	</div>
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
export default {
	data() {
		return {
			username: this.$store.state.userInfo.username
		}
	},
	name: 'PcHeader',
	methods: {
		handleDrop(command) {
			if(command == 'logout') {
				localStorage.removeItem('userInfo');
				location.reload();
			}
		}
	},
	components: {
		Dropdown,
		DropdownMenu,
		DropdownItem
	}
}
</script>
<style lang="scss" scoped>
.PcHeader {
	.container {
		width: 1200px;
		margin: 0 auto;
	}
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	background: #333;
	color: #fff;
	.left {
		float: left;
	}
	.right {
		float: right;
	}
	.searchBtn {
		margin-right: 20px;
		color: #fff;
	}
}
</style>