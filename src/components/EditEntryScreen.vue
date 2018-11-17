<template>
  <div>
    <h2>Edit Entry</h2>
    <p><router-link to="../">Back</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'EditEntryScreen',
  data () {
    return {
     
    }
  },
  created(){
   // console.log(this.$route.params.entryid);
  },
  mounted () {
  
  },
  methods:{
  }

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
