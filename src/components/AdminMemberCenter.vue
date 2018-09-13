<template>
  <section class="AdminMemberCenter"> <!-- admin用户中心 -->
    <Header title="管理员首页">
      <router-link to="" slot="right">
        <span class="iconfont icon_member">&#xe607;</span>
      </router-link>
    </Header>
    <section class="content">
      <button class="addRepairtor" @click="_ShowRepairtorPop">添加维修人员</button>
    </section>
    <Popup position="right" modal=fasle v-model="addRepairtorPop">
      <section class="addRepairtorPop">
        <p class="title">添加维修人员</p>
        <section class="group must">
          <input type="text" v-model="username" placeholder="请输入姓名">
        </section>
        <section class="group must">
          <select v-model="sex">
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </section>
        <section class="group must">
          <input type="text" v-model="tel" placeholder="请输入电话">
        </section>
        <section class="group not">
          <input type="text" v-model="grade" placeholder="请输入年级">
        </section>
        <section class="group not">
          <select v-model="xueyuan">
            <option value="">请选择学院</option>
           <option v-for="item in this.$store.state.xueyuan" :value="item.value">{{item.label}}</option>
          </select>
        </section>
        <section class="group not">
          <input type="text" v-model="zhuanye" placeholder="请输入专业">
        </section>
        <section class="group must">
          <input type="date" v-model="time_s" placeholder="开始时间">
        </section>
        <button class="addRepairtor" @click="_AddRepairtor">确认添加</button>
      </section>
    </Popup>
  </section>
</template>

<script>
import qs from 'qs';
import { Button,Toast, Header, Popup } from 'mint-ui';
export default {
  name: 'AdminMemberCenter',
  data () {
    return {
      addRepairtorPop: false,
      username: '',
      password: 123456,
      sex: '',
      tel: '',
      grade: '',
      xueyuan: '',
      zhuanye: '',
      time_s: ''
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
        this.$router.push('AdminLogin');
        clearTimeout(outTimer);
      },1500 )
    } else {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.$store.dispatch("changeUserInfo", userInfo);
    }
  },
  components: {
    Button,
    Toast,
    Header,
    Popup
  },
  methods: {
    _ShowRepairtorPop() {
      this.addRepairtorPop = true;
    },
    _AddRepairtor() {
      if(this.username == '') {
        Toast({
          message: '姓名不能为空',
          position: 'middle',
          duration: 1500
        })
        return;
      }
      if(this.sex == '') {
        Toast({
          message: '性别不能为空',
          position: 'middle',
          duration: 1500
        })
        return;
      }
      if(this.tel == '') {
        Toast({
          message: '电话不能为空',
          position: 'middle',
          duration: 1500
        })
        return;
      }
      if(this.time_s == '') {
        Toast({
          message: '开始时间不能为空',
          position: 'middle',
          duration: 1500
        })
        return;
      }
      let data = {
        username: this.username,
        password: this.password,
        sex: this.sex,
        tel: this.tel,
        grade: this.grade,
        xueyuan: this.xueyuan,
        zhuanye: this.zhuanye,
        time_s: this.time_s
      };
      this.$axios.post('http://repaire.dnpuzi.com/Admin/index/addRepairtor', qs.stringify(data))
      .then(res => {
        // console.log(res);
        if(res.data.code == 0) {
          Toast({
            message: '该维修员已存在',
            position: 'middle',
            duration: 1500
          });
          return;
        } else if (res.data.code == 1) {
          this.username = '';
          this.tel = '';
          this.sex = '';
          this.grade = '';
          this.xueyuan = '';
          this.zhuanye = '';
          this.time_s = '';
          Toast({
            message: '添加成功！',
            position: 'middle',
            duration: 1500
          });
        }

      })
    }
  }
}
</script>

<style scoped lang="scss">
  .AdminMemberCenter {
    width: 100%;
    min-height: 100%;
  }
  .AdminMemberCenter .mint-header {
    background-color: #8aa5fa;
  }
  .icon_member {
    font-size: 24px;
  }
  .content {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  .addRepairtor {
    display: block;
    width: 60%;
    margin: 0 auto;
    height: 30px;
    background-color: #8aa5fa;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 30px;
    margin-bottom: 15px;
    font-size: 14px;
  }
  .mint-popup-right {
    width: 90%;
    height: 100%;
    border-radius: 5px;
    background-color: #f9fafc;
    box-sizing: border-box;
    padding: 15px;
    overflow-y: scroll;
    z-index: 99!important;
  }
  .addRepairtorPop {
    width: 100%;
    height: 100%;
    .must::before { 
      display: inline-block;
      width: 10%;
      margin-right: 0px;
      content: '*';
      color: #cf2730;
      text-align: right;
    }
    .not::before {
      display: inline-block;
      width: 10%;
      margin-right: 0px;
      content: '';
      color: #cf2730;
      text-align: right;
    }
    .not select, .not input {
      display: inline-block;
    }
    select, input {
      border: none;
      background: none;
      outline: none;
      height: 40px;
      width: 60%;
      display: inline-block;
      margin: 10px  20px;
      border-bottom: 2px solid #bac4ca;
      color: #4b4d52;
      font-size: 14px;
      padding-left: 12px;
      box-sizing: border-box;
      transition: all .3s ease-in-out;
    }
    select:focus, input:focus {
      border-color: #4b4d52;
      color: #4b4d52;
    }
  }
  .addRepairtorPop .title {
    text-align: center;
    font-size: 16px;
    color: #899eaf;
  }
</style>
