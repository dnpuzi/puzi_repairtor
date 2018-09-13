<template>
  <section class="Select">
    <select v-model="value">
      <option value="">{{placeholder}}</option>
      <option v-for="item in data" :value="item.value">{{item.label}}</option>
    </select>
  </section>
</template>

<script>
export default {
  name: 'Select',
  data () {
    return {
      attr: this.name,
      value: ''
    }
  },
  watch: {
    value: function() {
      let addDevInfo = {
        attr: this.attr,
        value: this.value
      }
      this.$store.dispatch('changeAddDevInfo', addDevInfo);
    }
  },
  props: {
    name: {
      type: String
    },
    data: {
      type: Array
    },
    placeholder: {
      type: String
    }
  },
  components: {
  	
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .Select {
    select {
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
