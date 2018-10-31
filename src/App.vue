<template>
  <div id="app">
    <Hub></Hub>
  </div>
</template>

<script>
import Hub from './components/Hub.vue'

export default {
  name: 'app',
  components: {
    Hub
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
