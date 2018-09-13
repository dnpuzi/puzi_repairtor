<template>
	<section class="ModifyRepairtorPassword">
		<Header title="修改密码">
	      <span class="iconfont icon_back" slot="left" @click="_GoBack">&#xe61d;</span>
	    </Header>
	    <section class="content">
	    	<Field label="旧密码" placeholder="请输入旧密码" v-model="oldPassword"></Field>
	    	<Field label="新密码" placeholder="请输入新密码" v-model="newPassword"></Field>
	    	<Field label="再次输入" placeholder="请再次输入新密码" v-model="secondNewPassword"></Field>
			<Cell title="确认修改" is-link @click.native="_CheckPassword">
				<Button size="small" type="danger">确认</Button>
			</Cell>
	    </section>
	</section>
</template>

<script>
import qs from 'qs';
import { Header, Toast, Field, Cell, Button, MessageBox } from 'mint-ui';
export default {
	name: 'ModifyRepairtorPassword',
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			secondNewPassword: ''
		}
	},
	methods: {
		_GoBack() {
			window.history.length > 1
			? this.$router.go(-1)
			: this.$router.push('/')
		},
		_CheckPassword() {
			if(this.oldPassword == '' || this.newPassword == '' || this.secondNewPassword == '') {
				Toast({
					message: '输入不能为空',
			        position: 'middle',
			        duration: 1500
				});
				return;
			}
			if(this.newPassword != this.secondNewPassword) {
				Toast({
					message: '两次输入密码不一致',
			        position: 'middle',
			        duration: 1500
				});
				return;
			}
			let data = {
				id: JSON.parse(localStorage.getItem('userInfo')).id
			};
			this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showRepairtorInfo', qs.stringify(data))
			.then(res => {
				if(res.data.data.password != this.oldPassword) {
					Toast({
						message: '旧密码输入错误',
				        position: 'middle',
				        duration: 1500
					});
				} else {
					MessageBox({
						title: '修改密码',
				        message: '确定修改?',
				        showCancelButton: true
					}).then(action => {
						if(action == 'confirm') {
							let data = {
								id: JSON.parse(localStorage.getItem('userInfo')).id,
								password: this.newPassword
							};
							this.$axios.post('http://repaire.dnpuzi.com/Admin/index/modifyRepairtorPassword', qs.stringify(data))
							.then(res => {
								if(res.data == 1) {
									Toast({
										message: '修改成功！',
								        position: 'middle',
								        duration: 1500
									});
									this.oldPassword = '';
									this.newPassword = '';
									this.secondNewPassword = '';
								}
							})
						}
					})
				}
			})
		}
	},
	mounted() {
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
.ModifyRepairtorPassword {
	width: 100%;
	min-height: 100%;
}
.ModifyRepairtorPassword .mint-header {
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