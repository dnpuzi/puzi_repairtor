<template>
  <section class="MemberCenter">
    <Header title="维修中心">
      <router-link to="/Mine" slot="right">
        <span class="iconfont icon_member">&#xe607;</span>
      </router-link>
    </Header>
    <section class="content">
      <router-link to="/AddDevInfo"><button class="add_dev_pop">添加一条电脑信息</button></router-link>
      <p v-if="devListData.length == 0" style="text-align: center;color: #8aa5fa;">暂无数据</p>
      <DevList v-for="item in devListData" :key="item.id" :data="item"></DevList>
    </section>
  </section>
</template>

<script>
import qs from 'qs';
import { Toast, Header } from 'mint-ui';
import DevList from '@/components/DevList';
export default {
  name: 'MemberCenter',
  data () {
    return {
      devListData: []
    }
  },
  components: {
    Toast,
    Header,
    DevList
  },
  methods: {
  },
  mounted() {
    let repairtor_id = this.$store.state.userInfo.id;
    let data = {
      repairtor_id: repairtor_id
    };
    this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showDevList', qs.stringify(data))
    .then(res => {
      if(res.data.code == 1) {
        this.devListData = res.data.data;
      }
    })
  },
  beforeCreate() {
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
}
</script>

<style scoped lang="scss">
  .MemberCenter {
    width: 100%;
    min-height: 100%;
  }
  .MemberCenter .mint-header {
    background-color: #8aa5fa;
  }
  .icon_member {
    font-size: 24px;
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
  .show_dev_pop {
    width: 100%;
    height: 100%;
    .title {
      text-align: center;
      font-size: 16px;
      color: #899eaf;
    }
    .add_dev_pop {
      display: block;
      width: 60%;
      margin: 20px auto;
      height: 30px;
      background-color: #8aa5fa;
      border: none;
      outline: none;
      color: #fff;
      border-radius: 30px;
      margin-bottom: 15px;
      font-size: 14px;
    }
  }
  .content {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    .add_dev_pop {
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
  }
</style>
