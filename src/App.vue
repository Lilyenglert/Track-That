// single file componenet. 
<template>
  <div>
   <create-tracker></create-tracker>
    <access-tracker></access-tracker>
  </div>
</template>


<script>
  import CreateTracker from './components/CreateTracker.vue'
  import AccessTracker from './components/AccessTracker.vue'

  export default {
    name: 'app',
    components: {
      CreateTracker,
      AccessTracker
      },
    }
  
</script>

<style>
html,body {
    /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
    font-family: 'proxima-nova', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height:100vh;
    padding:0;
    overflow:hidden;
    margin: 0;
}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
