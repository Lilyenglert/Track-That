<template>
  <div>
    <h1>Hi Liam!</h1>
    <h2>Notifications</h2>
    <p>None yet!</p>
    <h2>Trackers</h2>
    <router-link to="/view">Coffee Budget</router-link>
    <p></p>
    <router-link to="/add">Create New +</router-link>
    <h2>Collections</h2>
    <router-link to="/template">Template</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen'
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
