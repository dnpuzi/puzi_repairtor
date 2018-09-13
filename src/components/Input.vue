<template>
  <section class="Input" :class="must">
    <input type="text" :placeholder="placeholder" :readonly="readonly" v-model="trueValue" :name="name">
  </section>
</template>

<script>
export default {
  name: 'Input',
  data () {
    return {
      attr: this.name, //属性
      trueValue: this.value
    }
  },
  watch: {
    trueValue: function() {
      let addDevInfo = {
        attr: this.attr,
        value: this.trueValue
      }
      this.$store.dispatch('changeAddDevInfo', addDevInfo);
    }
  },
  props: {
    must: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  components: {
  	
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .Input {
    input {
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
      &:focus {
        border-color: #4b4d52;
        color: #4b4d52;
      }
    }
    &::before { 
      display: inline-block;
      width: 10%;
      margin-right: 0px;
      content: '';
      color: #cf2730;
      text-align: right;
    }
    &.must::before {
      content: '*';
    }
  }
</style>
