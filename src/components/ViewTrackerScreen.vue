<template>
<div id='home-screen'>
    <v-app>
    <!-- toolbar -->
      <v-toolbar fixed id="titlebar">

          <v-flex xs2>
          <router-link to="/"><a id="backButton"><i>back</i></a></router-link>
          </v-flex>
          <v-flex xs8>
            <v-toolbar-title class="page-title">{{ $route.params.tracker }} Tracker</v-toolbar-title>
          </v-flex>

          <v-flex xs2>
            <a id="editButton"><i>edit</i></a>
          </v-flex>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down"></v-toolbar-items>

    </v-toolbar>
    <!-- /toolbar -->

    <v-container class="inner">
      <v-layout>
         
        <v-flex xs12>
          <a><p class="link"><router-link to=entry>Create a new entry <v-icon size="18px">add</v-icon></router-link></p></a>
        </v-flex>
        
      </v-layout>

        <div class="section">
          <h2>Goals</h2>
          <v-card :flat="true">
           <p id="goalMessage">{{this.currentTrackerGoal}}</p>
          </v-card>
        </div>

        <div class="section">
          <h2>Progress</h2>
            <v-card id="graph_box" :flat="true">
            <p><Chart :trackerID=$route.params.id></Chart></p>
            </v-card>
        </div>

        <v-container class="section" fluid-grid-list-md>
          
          
          <!-- All entry items repeated here, TODO: HOW TO HANDLE MULTIPLE UNITS -->
          <h2>Log</h2>
          <v-card class="scroll" height= "200px" :flat="true">
            <div v-for="entry in filterEntries($route.params.id)" v-bind:key="entry.value">
                <v-list id="example1">
              <v-list-tile>
                <v-list-tile-avatar>{{entry.date}}</v-list-tile-avatar>
                <v-list-tile-content> 
                  <v-list-tile-title class="align-left">{{entry.value}}</v-list-tile-title>
                  <v-list-tile-sub-title class="align-left">{{entry.message}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><a><v-icon>add</v-icon></a></v-list-tile-action>
              </v-list-tile>
              </v-list>
            </div>
          </v-card>
      </v-container>

    </v-container>
    </v-app>
  </div>

 
</template>

<script>
import Chart from './Chart.vue'
import Vue from 'vue'
import Storage from 'vue-web-storage'
import EventBus from '../eventBus.js'
Vue.use(Storage)
export default {
  name: 'ViewTrackerScreen',
  data()
  {
    return {
      trackers:[],
      entries:[],
      currentTracker:null,
      currentTrackerGoal:null,
      currentTrackerUnits:null,
      
    }
  },
  components: {
    Chart
  }
  ,
  created(){
    this.getLocal();
    this.currentTracker = this.$route.params.tracker;
    for (let index = 0; index < this.trackers.length; index++) {
      if(this.trackers[index].name == this.currentTracker)
      {
        this.currentTrackerGoal = this.trackers[index].goal; 
        this.currentTrackerUnits = this.trackers[index].unit;
      }}
  },
  mounted(){
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))

      } catch (e) {
        localStorage.removeItem('entries')
      }
    }
    if(this.currentTrackerGoal==null){
      document.getElementById("goalsContainer").style.display = "none"
    }
    else{
      document.getElementById("goalsContainer").style.display = "block"
    }
  },
  methods: {
    filterEntries: function (currentTracker) {
      return this.entries.filter(function (entry) {
        return entry.trackerID === currentTracker
      })
    },
    getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
  },
    addValue () {
      const inputNum = parseFloat(document.getElementById('gValue').value)
      if (Vue.$localStorage.get('gValues') == null) {
        Vue.$localStorage.set('gValues', [])
      }
      var array = Vue.$localStorage.get('gValues')
      array.push(inputNum)
      Vue.$localStorage.set('gValues', array)
      EventBus.$emit('refreshGraph')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h2 {
  text-align: left;
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

#goalMessage, #graph_box{
  text-align:left;
}

#graph_box{ 
  max-width: 90%;
  padding:0%;
}

.v-card {
  margin-top: 5%;
  padding:5%;
}

.scroll {
  overflow-y: auto;
}

.link{
  text-align:center;
  font-size: 16px;
}

</style>
