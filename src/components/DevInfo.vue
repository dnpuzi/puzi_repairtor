<template>
  <section class="DevInfo">
    <Header title="详细信息">
      <span class="iconfont icon_back" v-show="isLogin" slot="left" @click="_GoBack">&#xe61d;</span>
      <router-link to="/Mine"  v-show="isLogin" slot="right">
        <span class="iconfont icon_member">&#xe607;</span>
      </router-link>
    </Header>
    <section class="content">
      <Cell title="设备型号" :value="devInfo.dev_name"></Cell>
      <Cell title="维修人员" :value="devInfo.repairtor"></Cell>
      <Cell title="持有者姓名" :value="devInfo.username"></Cell>
      <Cell title="持有者电话" :value="devInfo.tel"></Cell>
      <Cell title="持有者学院" :value="devInfo.xueyuan"></Cell>
      <Cell title="持有者专业" :value="devInfo.zhuanye"></Cell>
      <Cell title="维修金额">
        <span class="c_red">{{devInfo.price == undefined ? '待定' : '￥' + devInfo.price}}</span>
      </Cell>
      <Cell title="维修开始时间" :value="devInfo.time_s"></Cell>
      <Cell title="问题描述" :value="devInfo.content"></Cell>
      <Cell title="备注信息" :value="devInfo.dev_content"></Cell>
      <Cell title="当前状态">
        <span :class=" devInfo.status != 4 ? 'c_red' : 'c_green' ">{{devInfo.status == 4 ? '已完成' : '正在维修'}}</span>
        <span v-show="devInfo.status == 2 || devInfo.status == 3" class="c_red">({{['待店维修', '售后', '送修', '已完成'][Number(devInfo.status)-1]}})</span>
      </Cell>
      <!-- <Cell  v-show="isLogin" title="打印二维码">
        <Button size="small" type="primary" @click.native="_PrintPreview" style="margin-right: 10px;">预览</Button>
        <Button size="small" type="primary" @click.native="_Print">打印</Button>
      </Cell> -->
      <Cell v-show="devInfo.status != 4 && isLogin " title="是否送修" is-link @click.native="openAction">
        <Button size="small" type="primary">送修</Button>
      </Cell>
       <Cell v-show="devInfo.status != 4 && isLogin " title="维修完成" is-link @click.native="_DevorderDone">
        <Button size="small" type="primary">确认</Button>
      </Cell>
    </section>
    <Actionsheet :actions="actions" v-model="actionVisible"></Actionsheet>
  </section>
</template>

<script>
import qs from 'qs';
import { Toast, Header, Cell, Button, MessageBox, Actionsheet  } from 'mint-ui';
export default {
  name: 'DevInfo',
  data () {
    return {
      id:　this.$route.params.id,
      devInfo: {},
      isLogin: true,
      actionVisible: false,
      actions: [
        {
          name: '售后',
          method: () => {
            this._DevorderSend(2);
          }
        },
        {
          name: '送修',
          method: () => {
            this._DevorderSend(3);
          }
        }
      ]
    }
  },
  components: {
    Toast,
    Header,
    Cell,
    Button,
    MessageBox,
    Actionsheet 
  },
  watch: {
    '$route' (to, from) {
      this.id = this.$route.params.id;
        let data = {
        id: this.id
      };
      this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showDevInfo', qs.stringify(data))
      .then(res => {
        if(res.data.code == 1) {
          this.devInfo = res.data.data;
        }
      })
    }
  },
  mounted() {
    // var oHead = document.getElementsByTagName('head').item(0); 
    // var oScript= document.createElement("script"); 
    // oScript.type = "text/javascript"; 
    // oScript.src="http://10.253.87.104:8000/CLodopfuncs.js"; 
    // oHead.appendChild( oScript);
    if(!localStorage.getItem('userInfo')) {
      this.isLogin = false;
    }
    let data = {
      id: this.id
    };
    this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showDevInfo', qs.stringify(data))
    .then(res => {
      if(res.data.code == 1) {
        this.devInfo = res.data.data;
        console.log(this.devInfo);
      }
    })
  },
  methods: {
    openAction() {
      this.actionVisible = true
    },
    // _SetprintParameters() {
    //   var LODOP = getCLodop();
    //   // console.log(LODOP);
    //   let name = this.devInfo.username;
    //   let tel = this.devInfo.tel;
    //   let dev_name = this.devInfo.dev_name;
    //   let status = this.devInfo.status == 3 ? '已完成' : '正在维修';
    //   LODOP.SET_PRINT_PAGESIZE(1, 500, 750, ""); //规定纸张大小;
    //   LODOP.SET_PRINT_STYLE("FontSize", 14); //字体大小  
    //   LODOP.ADD_PRINT_TEXT(20, 20, 500, 39, "学长的电脑铺子"); //内容，参数（上边距，左边距，内容显示宽度，内容显示高度）
    //   LODOP.SET_PRINT_STYLE("FontSize", 10); //更换大小  
    //   LODOP.ADD_PRINT_TEXT(50, 12, 360, 39, "姓名：");
    //   LODOP.ADD_PRINT_TEXT(50, 50, 360, 39, name);
    //   LODOP.ADD_PRINT_TEXT(70, 12, 360, 39, "电话：");
    //   LODOP.ADD_PRINT_TEXT(70, 50, 360, 39, tel);
    //   LODOP.ADD_PRINT_TEXT(90, 12, 360, 39, "机型：");
    //   LODOP.ADD_PRINT_TEXT(90, 50, 360, 39, dev_name);
    //   LODOP.ADD_PRINT_TEXT(110, 12, 360, 39, "维修：");
    //   LODOP.ADD_PRINT_TEXT(110, 50, 360, 39, status);
    //   LODOP.ADD_PRINT_IMAGE(130,30,100,100,"<img border='0' src='http://repaire.dnpuzi.com/" + this.devInfo.qrcode_url + "' />");
    //   LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
    // },
    // _PrintPreview() {
    //   this._SetprintParameters();
    //   LODOP.PREVIEW();//打印预览  
    // },
    test() {
      console.log(this.id);
    },
    _Print() {
      MessageBox({
        title: '打印信息及二维码',
        message: '确认打印？',
        showCancelButton: true
      }).then(action => {
        if(action == 'confirm') {
          this._SetprintParameters();
          LODOP.PRINT();//直接打印
        } else {
          Toast({
          message: '已取消',
          position: 'middle',
          duration: 1500
        });
        }
      })
    },
    _GoBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    _DevorderSend(key) {
      if(JSON.parse(localStorage.getItem('userInfo')).id != this.devInfo.repairtor_id) {
        Toast({
          message: '你没有权限修改其他维修员的电脑信息',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      MessageBox({
        title: this.$store.state.status[key - 1].label,
        message: '确认送修？',
        showCancelButton: true
      }).then(action => {
        if(action == 'confirm') {
          let data = {
            id: this.id,
            status: key
          }
          this.$axios.post('http://repaire.dnpuzi.com/Admin/index/devorderSend', qs.stringify(data))
          .then(res => {
            let data = {
              id: this.id
            };
            this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showDevInfo', qs.stringify(data))
            .then(res => {
              if(res.data.code == 1) {
                this.devInfo = res.data.data
              }
            })
          })
        } else {
          Toast({
            message: '已取消',
            position: 'middle',
            duration: 1500
          });
        }
      })
    },
    _DevorderDone() {
      if(JSON.parse(localStorage.getItem('userInfo')).id != this.devInfo.repairtor_id) {
        Toast({
          message: '你没有权限修改其他维修员的电脑信息',
          position: 'middle',
          duration: 1500
        });
        return;
      }
      MessageBox.prompt('请输入维修金额', {
        title: '',
        inputType: 'number'
      }).then(({value, action}) => {
        if(action == 'confirm' && value != null && value != '') {
          MessageBox({
            title: '维修金额：￥' + value,
            message: '确定完成?',
            showCancelButton: true
          }).then(action => {
            if(action == 'confirm') {
              let data = {
                id: this.id,
                price: value
              };
              this.$axios.post('http://repaire.dnpuzi.com/Admin/index/devOrderDone', qs.stringify(data))
              .then(res => {
                let data = {
                  id: this.id
                };
                this.$axios.post('http://repaire.dnpuzi.com/Admin/index/showDevInfo', qs.stringify(data))
                .then(res => {
                  if(res.data.code == 1) {
                    this.devInfo = res.data.data
                  }
                })
              });
            }
          })
        } else {
          Toast({
            message: '没有输入金额',
            position: 'middle',
            duration: 1500
          });
        }
      })
      .catch( () => {
        Toast({
          message: '已取消',
          position: 'middle',
          duration: 1500
        });
      } )
    }
  },
  beforeCreate() {
  }
}
</script>

<style scoped>
  .DevInfo {
    width: 100%;
    min-height: 100%;
  }
  .DevInfo .mint-header {
    background-color: #8aa5fa;
  }
  .icon_member {
    font-size: 24px;
  }
  .content {
    padding-bottom: 20px;
  }
</style>
