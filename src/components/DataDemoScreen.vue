<template>
  <div>
    <create-tracker></create-tracker>
    <access-tracker></access-tracker>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import CreateTracker from './CreateTracker.vue'
import AccessTracker from './AccessTracker.vue'
export default {
  name: 'ScreenTemplate',
  components: {
    CreateTracker,
    AccessTracker
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
