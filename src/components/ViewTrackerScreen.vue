<template>
  <div>
    <h2>Coffee Budget Tracker</h2>
      <button v-on:click="emitChangeScreen('HomeScreen')">Back</button>
  </div>
</template>

<script>
export default {
  name: 'Coffee Budget Tracker',
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
