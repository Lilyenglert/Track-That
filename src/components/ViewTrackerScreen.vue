<template>
  <div>
    <v-app>
    <v-toolbar id="titlebar">
      <v-btn id="backButton">Back</v-btn>
      <v-toolbar-title>Coffee Spending</v-toolbar-title>
      <v-btn id="editButton">edit</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      </v-toolbar-items>
    </v-toolbar>

    <!-- V-container for catagories -->
    <v-container id="tracker_details">
      <v-layout>
        <v-flex xs8>
          <p class="text-sm-right">Create a new entry</p>  
        </v-flex>
        <v-flex xs4>
          <v-icon>add</v-icon>
        </v-flex>
      </v-layout>


      <!-- Quick Entry  -->
        <!-- <v-container>
          <h4>QUICK ENTRY</h4>
          <v-card id="quickEntry">
            <v-layout>
              <v-flex xs10>
              </v-flex>
              <v-flex xs2>
                <v-card-actions>
                  <v-btn icon @click="show = !show">
                    <v-icon dark="true">{{ show ? 'mdi-keyboard_arrow_down' : 'mdi-keyboard_arrow_up' }}</v-icon>
                  </v-btn>
                </v-card-actions> 
              </v-flex>
            </v-layout>

  
          <v-slide-y-transition>
            <v-card-text v-show="show">

              <v-flex xs12>
              
              </v-flex>
              <v-flex xs6>
              </v-flex>
              <v-flex xs6>
              </v-flex>
              <v-flex xs12>
              </v-flex>

            </v-card-text>
          </v-slide-y-transition>
          </v-card>
        </v-container> -->
      <!-- end quick entry -->




        <v-container>
          <h4>GOALS</h4>
          <v-card>
           <p id="goalMessage">Spend under 10 dollars per week</p>
          </v-card>
        </v-container>
        <v-container>
          <h4>PROGRESS</h4>
            <v-card id="graph_box">
            <!-- <Chart id="graph"></Chart> -->
            <p>Graph will go here</p>
            </v-card>
        </v-container>

        <v-container fluid-grid-list-md>
          
          
          <!-- All entry items repeated here, TODO: HOW TO HANDLE MULTIPLE UNITS -->
          <h4>LOG</h4>
          <v-card>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-avatar>10/11</v-list-tile-avatar>
                <v-list-tile-content> 
                  <v-list-tile-title class="align-left">10 Dollars</v-list-tile-title>
                  <!-- <v-list-tile-title class="align-end">unit2</v-list-tile-title> -->
                  <v-list-tile-sub-title class="align-left">Notes will be displayed here</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>arrow</v-list-tile-action>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-avatar>10/11</v-list-tile-avatar>
                <v-list-tile-content> 
                  <v-list-tile-title class="align-left">10 Dollars</v-list-tile-title>
                  <!-- <v-list-tile-title class="align-end">unit2</v-list-tile-title> -->
                  <v-list-tile-sub-title class="align-left">Notes will be displayed here</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>arrow</v-list-tile-action>
              </v-list-tile>



              
            </v-list>
          </v-card>
      
  
          <!-- end data iterator -->
         
      </v-container>

    </v-container>
    <!-- <label for="value">Test:</label> -->
    <!-- <input type="number" id="gValue" name="gValue" value="0"/> -->
    <!-- <button v-on:click="addValue()">Submit</button>  -->
    <router-link to="/">Back</router-link>
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

  data: () => ({
    show: false
  }),

  // methods: {
  //   addValue () {
  //     const inputNum = parseFloat(document.getElementById('gValue').value)
  //     if (Vue.$localStorage.get('gValues') == null) {
  //       Vue.$localStorage.set('gValues', [])
  //     }
  //     var array = Vue.$localStorage.get('gValues')
  //     array.push(inputNum)
  //     Vue.$localStorage.set('gValues', array)
  //     EventBus.$emit('refreshGraph')
  //     }
  //   }
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

#graph{
  max-width: 300px;
}
</style>
