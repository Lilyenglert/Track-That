<template>
  <div>
    <h1>Hi Liam!</h1>
    <h2>Notifications</h2>
    <p>None yet!</p>
    <h2>Trackers</h2>
    <button v-on:click="emitChangeScreen('ViewTrackerScreen')">Coffee Budget</button>
    <button v-on:click="emitChangeScreen('AddTrackerScreen')">Create New +</button>
    <h2>Collections</h2>
    <button v-on:click="emitChangeScreen('ScreenTemplate')">See Template</button>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen',
  methods: {
    emitChangeScreen (component) {
      this.$emit('changeComponent', component)
    }
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
