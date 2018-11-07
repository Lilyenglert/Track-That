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

    <h3>Goals</h3>
    <v-card id="goals_box">
    <h4>Spend under 10 dollars per week</h4>
    </v-card>
    <h3>Progress</h3>
    <v-card id="graph_box">
    <h4>The Graph will go here</h4>
    </v-card>
    <h3>Log</h3>
    <v-card id="log_box">
    <h4>The Graph will go here</h4>
    </v-card>
    </v-app>

    <label for="value">Test:</label>
    <input type="number" id="gValue" name="gValue" value="0"/>
    <button v-on:click="addValue()">Submit</button>
    <Chart></Chart>
    <router-link to="/">Back</router-link>
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
