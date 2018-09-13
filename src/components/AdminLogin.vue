<template>
  <div class="AdminLogin"> <!--  admin用户登录组件 -->
    <input type="text" class="username" placeholder="用户名" v-model="username">
    <input type="text" class="password" placeholder="密码" v-model="password">
    <button class="login" @click="_login">登 录</button>
    <h3>学长的电脑铺子</h3>
  </div>
</template>

<script>
import qs from 'qs';
import { Toast } from 'mint-ui';
export default {
  name: 'AdminLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    Toast
  },
  methods: {
    _login() {
      if(this.username == '') {
        Toast({
          message: '用户名不能为空',
          position: 'bottom',
          duration: 1500
        });
        return;
      }
      if(this.password == '') {
        Toast({
          message: '密码不能为空',
          position: 'bottom',
          duration: 1500
        });
        return;
      }
      let data = {
        username: this.username,
        password: this.password
      }
      let qsdata = qs.stringify(data);
      this.$axios.post('http://repaire.dnpuzi.com/Admin/index/adminLogin', qsdata)
      .then(res => {
        if(res.data.code == 0) {
          Toast({
            message: '找不到该用户',
            position: 'bottom',
            duration: 1500
          });
        } else if(res.data.code == 1) {
          Toast({
            message: '密码错误',
            position: 'bottom',
            duration: 1500
          });
        } else {
          this.username = '';
          this.password = '';
          Toast({
            message: '登录成功，正在跳转',
            position: 'middle',
            duration: 1500
          });
          let outTimer = setTimeout( ()=> {
            let userInfo = {
              id: res.data.data.id,
              username: res.data.data.username
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.$store.dispatch("changeUserInfo", userInfo);
            this.$router.push('AdminMemberCenter');
            clearTimeout(outTimer);
          },1500 )
        }
      }) 
    }
  },
  beforeCreate() {
  	if(localStorage.getItem('userInfo')) {
      Toast({
        message: '已登录，正在跳转',
        position: 'middle',
        duration: 1000
      });
      let outTimer = setTimeout( ()=> {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.$store.dispatch("changeUserInfo", userInfo);
        this.$router.push('AdminMemberCenter');
        clearTimeout(outTimer);
      },1000 )
    }
  }
}
</script>

<style scoped>
  .AdminLogin {
    width: 100%;
    height: 100%;
    background: url('../assets/img/login_bg_01.png') top no-repeat;
    background-size: 100%;
    padding-top: 250px;
    box-sizing: border-box;
  }
  input {
    border: none;
    background: none;
    outline: none;
    height: 40px;
    width: 80%;
    display: block;
    margin: 0 auto 20px;
    border-bottom: 2px solid #bac4ca;
    color: #4b4d52;
    font-size: 14px;
    padding-left: 12px;
    box-sizing: border-box;
    transition: all .3s ease-in-out;
  }
  input:focus {
    border-color: #4b4d52;
    color: #4b4d52;
  }
  .login {
    border: none;
    outline: none;
    color: #fff;
    display: block;
    width: 60%;
    height: 40px;
    margin: 20px auto;
    border-radius: 40px;
    background-color: #8aa5fa;
    box-shadow: 0 0 5px 3px #d5dde2;
  }
  h3 {
    color: #3b5998;
    text-align: center;
  }
</style>
