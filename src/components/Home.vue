<template>
  <div is:currentComponent></div>
</template>

<script>
import View1 from './View1.vue'
export default {
  data(){
    return{
      currentComponent: null,
    }
  },
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
