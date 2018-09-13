<template>
	<section class="UserAddDevInfo">
		<Header title="添加一条电脑信息">
      	</Header>
		<section class="content">
			<Input must="must" name="dev_name" placeholder="请输入设备型号"></Input> <!-- readonly类型验证 boolean，所以传过去也应该boolean，那么就应该使用：才能使用表达式 -->
			<Input must="must" name="username" placeholder="请输入持有者姓名"></Input>
			<Input must="must" name="tel" placeholder="请输入持有者电话"></Input>
			<Select placeholder="请选择学院" name="xueyuan" :data="this.$store.state.xueyuan"></Select>
			<Input name="zhuanye" placeholder="请输入持有者专业"></Input>
			<section class="group must">
			  <textarea v-model="content" rows="10" placeholder="请输入问题描述(例如：不能上网，开不了机)"></textarea>
			</section>
			<section class="group must">
			  <textarea v-model="dev_content" rows="10" placeholder="请输入备注信息(例如：充电器，开机密码等)"></textarea>
			</section>
			<section class="group must">
			  <button class="pick_time" @click="openDatePicker('picker_time_s')">{{time_s}}</button> <br>
			  {{time_s}}
			</section>
			<button class="addDevInfoBtn" @click="_AddDevInfo">确认添加</button>
		</section>
		<DatetimePicker ref="picker_time_s" type="date" :startDate="new Date()" @confirm="handleTimeStart"></DatetimePicker>
		</section>
</template>
<script>
import qs from 'qs';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Toast, Header, DatetimePicker } from 'mint-ui';
export default {
	name: 'UserAddDevInfo',
	data() {
		return {
			content: '',
      		time_s: '',
      		dev_content: ''
		}
	},
	methods: {
	    _AddDevInfo() {
	      if(this.$store.state.addDevInfo.dev_name == '') {
	        Toast({
	          message: '必填项不能为空',
	          position: 'middle',
	          duration: 1500
	        })
	        return ;
	      }
	      if(this.$store.state.addDevInfo.username == '') {
	        Toast({
	          message: '必填项不能为空',
	          position: 'middle',
	          duration: 1500
	        })
	        return ;
	      }
	      if(this.$store.state.addDevInfo.tel == '') {
	        Toast({
	          message: '必填项不能为空',
	          position: 'middle',
	          duration: 1500
	        })
	        return ;
	      }
	      if(this.content == '') {
	        Toast({
	          message: '必填项不能为空',
	          position: 'middle',
	          duration: 1500
	        })
	        return ;
	      }
	      let addDevInfo = {
	        dev_name: this.$store.state.addDevInfo.dev_name,
	        username: this.$store.state.addDevInfo.username,
	        tel: this.$store.state.addDevInfo.tel,
	        xueyuan: this.$store.state.addDevInfo.xueyuan,
	        zhuanye: this.$store.state.addDevInfo.zhuanye,
	        content: this.content,
	        dev_content: this.dev_content,
	        time_s: this.time_s,
	        status: 1 
	      }
	      console.log(addDevInfo);
	      this.$axios.post('http://repaire.dnpuzi.com/Admin/index/userAddDevInfo', qs.stringify(addDevInfo))
	      .then(res => {
	        if(res.data.code == 1) {
	          Toast({
	            message: '添加成功！',
	            position: 'middle',
	            duration: 1500
	          });
	          this.$router.push('/DevInfo/' + res.data.id);
	        }
	      })
	    },
	    openDatePicker(picker) {
	      this.$refs[picker].open();
	    },
	    handleTimeStart(value) {
	      this.time_s = value.getFullYear() + '年' + (value.getMonth() + 1) + '月' + value.getDate() + '日';
	    }
	  },
	mounted() {
	    this.time_s = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日';
	  },
	components: {
		Header,
	    Toast,
	    Input,
	    Select,
	    DatetimePicker
	}
}
</script>

<style scoped lang="scss">
.UserAddDevInfo {
    width: 100%;
    min-height: 100%;
    .mint-header {
      background-color: #8aa5fa;
      .icon_member {
        font-size: 24px;
      }
    }
    .content {
      padding: 15px;
      box-sizing: border-box;
      .group {
        box-sizing: border-box;
        &::before {
          display: inline-block;
          width: 10%;
          margin-right: 0px;
          content: '';
          color: #cf2730;
          text-align: right;
          vertical-align: middle;
        }
        &.must::before {
          content: '*';
        }
        textarea {
          border: none;
          background: none;
          outline: none;
          width: 70%;
          display: inline-block;
          margin: 10px  20px;
          border: 2px solid #bac4ca;
          color: #4b4d52;
          font-size: 14px;
          padding-left: 12px;
          box-sizing: border-box;
          padding: 10px;
          transition: all .3s ease-in-out;
          border-radius: 5px;
          &:focus {
            border-color: #4b4d52;
          }
        }
      }
    }
    .addDevInfoBtn, .pick_time {
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
    .pick_time {
      display: inline-block;
      margin-left: 20px;
    }
  }	
</style>