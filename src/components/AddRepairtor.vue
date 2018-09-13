<template>
  <div class="AddRepairtor">

  </div>
</template>

<script>
import { Field } from 'mint-ui';
export default {
  name: 'AddRepairtor',
  data () {
    return {
      
    }
  },
  components: {
  	Field
  },
  methods: {

  },
  beforeCreate() {
  	if( localStorage.getItem('userInfo') ) {
  		this.$store.state.userInfo = JSON.parse( localStorage.getItem('userInfo') )
  	} else {
  		this.$router.push('login');
  	}
  }
}
</script>

<style scoped>

</style>
