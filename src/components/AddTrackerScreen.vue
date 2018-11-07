<template>
  <div>
    <p>What do you want to track?</p>
    <p>Tracker Name: <input></p>
    <p>What units are we tracking?</p>
    <p>Tracker Units: <input></p>
    <p>Do you have any goals?</p>
    <p>WIP</p>
    <p>Add tracker to collection?</p>
    <p>WIP</p>
    <router-link to="/">Create Tracker</router-link>
  </div>
</template>

<script>
export default {
  name: 'AddTrackerScreen'
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
