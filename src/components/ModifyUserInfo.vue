<template>
	<section class="ModifyUserInfo">
		<Header title="修改基本信息">
	      <span class="iconfont icon_back" slot="left" @click="_GoBack">&#xe61d;</span>
	    </Header>
	    <section class="content">
	    	<Field label="姓名" v-model="userData.username"></Field>
	    	<Field label="性别" v-model="userData.sex"></Field>
	    	<Field label="电话" v-model="userData.tel"></Field>
	    	<Field label="学院" v-model="userData.xueyuan"></Field>
	    	<Field label="专业" v-model="userData.zhuanye"></Field>
			<Cell title="确认修改" is-link @click.native="showSureModal">
				<Button size="small" type="danger">确认</Button>
			</Cell>
	    </section>
	</section>
</template>

<script>
import qs from 'qs';
import { Header, Toast, Field, Cell, Button, MessageBox } from 'mint-ui';
export default {
	name: 'ModifyUserInfo',
	data() {
		return {
			userData: {}
		}
	},
	methods: {
		_GoBack() {
			window.history.length > 1
			? this.$router.go(-1)
			: this.$router.push('/')
		},
		showSureModal() {
			MessageBox({
				title: '修改基本信息',
		        message: '确定修改?',
		        showCancelButton: true
			}).then(action => {
				if(action == 'confirm') {
					let data = {
						id: JSON.parse(localStorage.getItem('userInfo')).id,
						username: this.userData.username,
						sex: this.userData.sex,
						tel: this.userData.tel,
						xueyuan: this.userData.xueyuan,
						zhuanye: this.userData.zhuanye
					}
					this.$axios.post('http://repaire.dnpuzi.com/Admin/index/modifyRepairtorInfo', qs.stringify(data))
					.then(res => {
						if(res.data == 0) {
							Toast({
								message: '没有信息变动或修改失败！',
						        position: 'middle',
						        duration: 1500
							});
						} else {
							Toast({
								message: '修改成功！',
						        position: 'middle',
						        duration: 1500
							});
							let data = {
								id: JSON.parse(localStorage.getItem('userInfo')).id
							}
							this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showRepairtorInfo', qs.stringify(data))
							.then(res => {
								this.userData = res.data.data;
							});
						}
					});
				}
			})
		}
	},
	mounted() {
		let data = {
			id: JSON.parse(localStorage.getItem('userInfo')).id
		}
		this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showRepairtorInfo', qs.stringify(data))
		.then(res => {
			// console.log(res);
			this.userData = res.data.data;
		});
	},
	components: {
		Header,
		Field,
		Cell,
		Button,
		MessageBox
	}
}
</script>

<style scoped lang="scss">
.ModifyUserInfo {
	width: 100%;
	min-height: 100%;
}
.ModifyUserInfo .mint-header {
	background-color: #8aa5fa;
}
.icon_member {
	font-size: 24px;
}
.content {
	width: 100%;
	box-sizing: border-box;
	padding: 12px;
}
</style>