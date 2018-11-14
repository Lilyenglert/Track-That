<template>
<div>
    <v-app>

       <v-toolbar id="titlebar">
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
      <v-toolbar-items class="hidden-sm-and-down">
      </v-toolbar-items>
    </v-toolbar>

<!-- V-container for catagories -->
    <v-container class="inner" id="tracker_details">
      <v-layout>
         <v-flex xs2>
        </v-flex>
        <v-flex xs6>
          <a><p class="text-sm-right">Create a new entry</p></a>
        </v-flex>
        <v-flex xs2>
          <a><v-icon>add</v-icon></a>
        </v-flex>
        <v-flex xs2>
        </v-flex>
      </v-layout>

        <v-container>
          <h2>Goals</h2>
          <v-card flat="true">
           <p id="goalMessage">Spend under 10 dollars per week</p>
          </v-card>
        </v-container>
        <v-container>
          <h2>Progress</h2>
            <v-card id="graph_box" flat="true">
            <!-- <Chart id="graph"></Chart> -->
            <p>Graph will go here</p>
            </v-card>
        </v-container>

        <v-container fluid-grid-list-md>
          
          
          <!-- All entry items repeated here, TODO: HOW TO HANDLE MULTIPLE UNITS -->
          <h2>Log</h2>
          <v-card class="scroll" height= "200px" flat="true">

            <v-list id="example1">

              <v-list-tile>
                <v-list-tile-avatar>10/11</v-list-tile-avatar>
                <v-list-tile-content> 
                  <v-list-tile-title class="align-left">10 Dollars</v-list-tile-title>
                  <v-list-tile-sub-title class="align-left">Notes will be displayed here</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><a><v-icon>add</v-icon></a></v-list-tile-action>
              </v-list-tile>
              </v-list>

            <v-list id="example1">
              <v-list-tile>
                <v-list-tile-avatar>10/11</v-list-tile-avatar>
                <v-list-tile-content> 
                  <v-list-tile-title class="align-left">10 Dollars</v-list-tile-title>
                  <v-list-tile-sub-title class="align-left">Notes will be displayed here</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><a><v-icon>add</v-icon></a></v-list-tile-action>
              </v-list-tile>
              </v-list>

            <v-list id="example1">
              <v-list-tile>
                <v-list-tile-avatar>10/11</v-list-tile-avatar>
                <v-list-tile-content> 
                  <v-list-tile-title class="align-left">10 Dollars</v-list-tile-title>
                  <v-list-tile-sub-title class="align-left">Notes will be displayed here</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action><a><v-icon>add</v-icon></a></v-list-tile-action>
              </v-list-tile>
              </v-list>

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
  components: {
    Chart
  },
  methods: {
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

#graph{
  max-width: 300px;
}

.v-card {
  margin-top: 5%;
  padding:5%;
}

.scroll {
  overflow-y: auto;
}

.text-sm-right{
  text-align:right;
  font-size: 16px;
}

</style>