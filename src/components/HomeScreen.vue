<template>
  <div id='home-screen' class='inner'>
    <div class='top-bar section'>
      <h1 class='page-title'>Overview</h1>
    </div>
    <div class='content'>
      <div class='section'>
      <h2 class='greeting'>Hi, {{username}}!</h2>
      <!-- STEPH HARDCODED MESSAGE -->
      <p class='message'>It's a beautiful day to achieve your goals.</p>
        <div v-for="tracker in trackers" v-bind:key="tracker.id">
        <p class='message'>{{tracker.goal}}</p>
      </div>     
    </div>
    <div class='section'>
      <div class='section-title'>
        <h2 class='inline-block'>Trackers</h2>
        <v-btn fab dark small color="#DF5C46" class='add-thing'>
          <router-link to="/add"><v-icon>add</v-icon></router-link>
        </v-btn>
        <p class='inline-block right'><i>edit</i></p>
      </div>

      <!-- STEPH HARDCODED STUFF -->
      <div class='box-container'>
        
            <div class = 'box' v-for="tracker in trackers" v-bind:key="tracker.id" v-if="tracker">
                  <router-link :to="tracker.path" class='box-text' style='border-radius:10px;background-color:#5c46df;'>{{tracker.name}}</router-link>
            </div>
      
      </div>
      
    </div>
    <div class='section'>
      <h2 class='inline-block'>Collections</h2>
      <v-btn fab dark small color="#DF5C46" class='add-thing' @click="showModal">
        <v-icon>add</v-icon>
      </v-btn>
      <p class='inline-block right'><i><router-link to="/editCollection/">edit</router-link></i></p>

      <!-- STEPH HARDCODED STUFF -->
       <div class='box-container'>
          <div class = 'box' v-for="collection in this.collections" v-bind:key="collection.id">
                  <router-link :to="collection.path" class='box-text' style='border-radius:10px;background-color:#df5c46'>{{collection.name}}</router-link>
          </div>
        </div>
      <GetNamePopup v-show="nameCheck" @closeName="closeName"/>
      <AddCollectionPopup v-show="isPopupVisible" @close="closeModal"/>
    </div>

    </div>
    
    
  </div>
</template>

<script>
import AddCollectionPopup from './AddCollectionPopup.vue'
import GetNamePopup from './GetNamePopup.vue'
export default {
  components: {
    AddCollectionPopup,
    GetNamePopup
  },
  props:{
    to: Object
  },
  data(){
    return{
      username:'',
      trackers: [{
        id: '',
        path: '', 
        name: '',
        unit: [],
        goal: '',
        collection: ''
      }], 
       collections: [{
        name: '',
        path:''
      }],
    name: 'HomeScreen',
    isPopupVisible: false,
    nameCheck: false
    }
  },
   mounted() {
    this.getLocal();
    if(this.username == null){
      this.username = 'User';
      this.nameCheck = true;
    }
  },
  methods:{
    showModal() {
        this.isPopupVisible = true;
      },
      closeModal() {
        this.isPopupVisible = false;
        this.getLocal();
      },
      closeName(){
        this.nameCheck = false;
        this.username = localStorage.getItem('userName');
      },
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
    this.collections = JSON.parse(localStorage.getItem('collections'));
    this.username = localStorage.getItem('userName');
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