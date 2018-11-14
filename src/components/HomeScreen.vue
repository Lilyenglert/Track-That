<template>
  <div class='inner'>
    <div class='section'>
      <h1>Hi, {Liam!}</h1>
      <p>It's a beautiful day to achieve your goals.</p>
    </div>
    <div class='section'>
      <div class='section-title'>
        <h1 class='inline-block'>Trackers</h1>
        <p class='inline-block right'><i>edit</i></p>
      </div>

      <!-- vanilla html/css -->
      <div class='box-container'>
         <!-- <button @click="getLocal">Access trackers</button> -->
            <div style='display-inline' v-for="tracker in trackers" v-bind:key="tracker.id">
              <!-- <p>{{tracker.name}} {{tracker.unit}} {{tracker.goal}} {{tracker.collection}}</p> -->
                <div class='box'>
                  <router-link to="/view" class='box-text'>{{tracker.name}}</router-link>
                </div>
            </div>
            <div class='box'>
              <router-link to="/add" class='box-text'>Create new</router-link>
            </div>  
      </div>
      
    </div>
    <div class='section'>
      <h1>Collections</h1>
      <router-link to="/template">Template</router-link>

      <div class='box-container'>
        <div class='box'>
          <router-link to="/view" class='box-text'>Food</router-link>
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
    name: 'HomeScreen'
    }
  },
   mounted() {
    console.log("in mounted");
    this.getLocal();
  },
  methods:{
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
    console.log(this.trackers);
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
