<template>
  <div class='inner'>
    
    <div class='section'>
      <h1 class='greeting'>Hi, Liam!</h1>
      <p class='caption'>It's a beautiful day to achieve your goals.</p>
      <div v-for="tracker in trackers" v-bind:key="tracker.id">
        <p class='caption'>{{tracker.goal}}</p>
      </div>         
    </div>

    <div class='section'>
      <div class='section-title'>
        <h1 class='inline-block'>Trackers</h1>
        <router-link to="/add">
          <v-icon class='add-button' style='color:#DF5C46'>add_circle</v-icon>
        </router-link>
        <p class='inline-block right'><i>edit</i></p>
      </div>

      <!-- vanilla html/css -->
      <div class='box-container'>
            <div class = 'box' v-for="tracker in trackers" v-bind:key="tracker.id">
                  <router-link :to="tracker.path" class='box-text' style='border-radius:10px;background-color:#5c46df;' >{{tracker.name}}</router-link>
            </div>
      </div> 
      </div>
    
    <div class='section'>
      <h1 class='inline-block'>Collections</h1>
      <router-link to="/collection">
        <v-icon class='add-button' style='color:#DF5C46'>add_circle</v-icon>
      </router-link>
      <p class='inline-block right'><i>edit</i></p>

        <div class='box-container'>
          <div class = 'box' v-for="collection in collections" v-bind:key="collection.id">
                  <router-link :to="collection.path" class='box-text' style='border-radius:10px;background-color:#df5c46'>{{collection.name}}</router-link>
          </div>
        </div>
      <!--<button @click="showModal">Open Popup</button>
      <CollectionPopup v-show="isPopupVisible" @close="closeModal"/>!-->
    </div>
  </div>
</template>

<script>
import CollectionPopup from './CollectionPopup.vue'
export default {
  components: {
    CollectionPopup
  },
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
    name: 'HomeScreen',
    isPopupVisible: false
    }
  },
   mounted() {
    this.getLocal();
  },
  methods:{
    showModal() {
        this.isPopupVisible = true;
      },
      closeModal() {
        this.isPopupVisible = false;
      },
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
