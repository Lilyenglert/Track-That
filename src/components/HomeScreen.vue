<template>
  <div>
    <h1>Hi Liam!</h1>
    <h2>Notifications</h2>
    <p>None yet!</p>
    <h2>Trackers</h2>
    <router-link to="/view/Coffee">Coffee Budget</router-link>
    <p></p>
    <router-link to="/add">Create New +</router-link>
    <p></p>
    <router-link to="/data">Data Demo</router-link>
    <h2>Collections</h2>
    <router-link to="/collection">Create New +</router-link>
    <p></p>
    <router-link to="/template">Template</router-link>
    <p></p>
    <router-link to="/entry">Entry</router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      trackers: [{
        id: null,
        path: null, 
        name: null,
        unit: [],
        goal: null,
        collection: null
      }], 
       collections: [{
        name: null
      }],
    name: 'HomeScreen'
    }
  },
   mounted() {
    this.getLocal();
  },
  methods:{
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
    this.collections = JSON.parse(localStorage.getItem('collections'));
    console.log(this.trackers);
    console.log(this.collections);
  }
}
  
}

let colors = ['#5c46df', '#46df5c', '#df467d', '#467ddf', '#46dfa8', '#df5c46'];
let randIndex = Math.floor(Math.random() * (colors.length + 1));



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
