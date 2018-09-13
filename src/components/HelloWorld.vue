<template>
  <div class="hello">
    {{msg}}
    <Button type="default">default</Button>
    <Button type="danger">default</Button>
    <Button type="primary">default</Button>
    <Button size="small">default</Button>
    <Button size="large" type="primary">default</Button>
    <Button size="normal" icon="back" @click="getBack">default</Button>
  </div>
</template>

<script>
import jsonp from 'jsonp';
import { Button,Toast, Indicator } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.$store.state.userInfo.name
    }
  },
  components: {
    Button,
    Toast,
    Indicator
  },
  methods: {
    getBack() {
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'double-bounce'
      // });
      //此处的url是完整的地址，可以改进下重新封装此url
      var url='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=223259203&jsonpCallback=hotSearchKeysmod_top_search&loginUin=1234567&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&jsonpCallback=__jp1';
      var param={
       param:'jsonpCallback'//此处的jsonpCallback是对应的回调函数名称
      };
      jsonp(url,param,(err,data)=>{
      if(!err){
        console.log(data)
      }
      else{
        console.log(err)
      }
   })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
