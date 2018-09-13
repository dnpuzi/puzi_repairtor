<template>
  <section class="Mine">
    <Header title="个人中心">
      <span class="iconfont icon_back" slot="left" @click="_GoBack">&#xe61d;</span>
    </Header>
    <section class="content">
      <Cell title="姓名" :value="userData.username"></Cell>
      <Cell title="性别" :value="userData.sex"></Cell>
      <Cell title="电话" :value="userData.tel"></Cell>
      <Cell title="学院" :value="userData.xueyuan"></Cell>
      <Cell title="专业" :value="userData.zhuanye"></Cell>
      <Cell title="修改基本信息" is-link to="/ModifyUserInfo">
        <Button size="small" type="primary">去修改</Button>
      </Cell>
      <Cell title="修改密码" is-link to="/ModifyRepairtorPassword">
        <Button size="small" type="primary">去修改</Button>
      </Cell>
      <Cell title="退出登录" is-link @click.native="showLogOutModal">
        <Button size="small" type="danger">退出</Button>
      </Cell>
    </section>
  </section>
</template>

<script>
import qs from 'qs';
import { Toast, Header, Cell, Button, MessageBox } from 'mint-ui';
export default {
  name: 'Mine',
  data () {
    return {
      userData: {}
    }
  },
  components: {
    Toast,
    Header,
    Cell,
    Button,
    MessageBox
  },
  mounted() {
    let data = {
      id: this.$store.state.userInfo.id
    }
    this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showRepairtorInfo', qs.stringify(data))
    .then(res => {
      // console.log(res);
      this.userData = res.data.data;
    })
  },
  methods: {
    _GoBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    showLogOutModal() {
      MessageBox({
        title: '退出登录',
        message: '确定退出?',
        showCancelButton: true
      }).then(action => {
        if(action == 'confirm') {
          console.log('login out');
          localStorage.removeItem('userInfo');
          if(!localStorage.getItem('userInfo')) {
            Toast({
              message: '没有用户信息，正在跳转登录',
              position: 'middle',
              duration: 1500
            });
            let outTimer = setTimeout( ()=> {
              this.$router.push('Login');
              clearTimeout(outTimer);
            },1500 )
          } else {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.$store.dispatch("changeUserInfo", userInfo);
          }
        }
      })
    }
  },
  beforeCreate() {
    if(!localStorage.getItem('userInfo')) {
      Toast({
        message: '没有用户信息，正在跳转登录',
        position: 'middle',
        duration: 1500
      });
      let outTimer = setTimeout( ()=> {
        this.$router.push('/Login');
        clearTimeout(outTimer);
      },1500 )
    } else {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.$store.dispatch("changeUserInfo", userInfo);
    }
  }
}
</script>

<style scoped lang="scss">
  .Mine {
    width: 100%;
    min-height: 100%;
  }
  .Mine .mint-header {
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
