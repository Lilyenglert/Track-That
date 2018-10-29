<template>
  <div class="home">
    <h1>Hi, {{ name }}</h1>
    <h2>Notifications</h2>
    <p>
      No Notifications yet!
    </p>

    <h1>Trackers</h1>

    <h1>Collections</h1>
  </div>
</template>

<script>
export default {
  name: 'Name',
  props: {
    name: String
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
