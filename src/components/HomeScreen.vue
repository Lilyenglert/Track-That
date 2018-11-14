<template>
  <div class='inner'>
    <div class='section'>
      <h1>Hi, {Liam!}</h1>
      <p>It's a beautiful day to achieve your goals.</p>
    </div>
    <div class='section'>
      <div class='section-title'>
        <h1 class='inline-block'>Trackers</h1>
        <p class='inline-block'>Create new +</p>
        <p class='inline-block right'><i>edit</i></p>
      </div>

      <!-- vanilla html/css -->
      <div class='box-container'>
            <div class = 'box' v-for="tracker in trackers" v-bind:key="tracker.id">
                  <router-link to="/view" class='box-text'>{{tracker.name}}</router-link>
                </div>
            <div class='box'>
              <router-link to="/add" class='box-text'>Create New</router-link>
            </div>  
      </div> 
      </div>
    
    <div class='section'>
      <h1>Collections</h1>
        <div class='box-container'>
          <div class = 'box' v-for="collection in collections" v-bind:key="collection.id">
                  <router-link to="/view" class='box-text'>{{collection.name}}</router-link>
          </div>
          <div class='box'>
              <router-link to="/collection" class='box-text'>Create new</router-link>
            </div>  
        </div>
    </div>
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
