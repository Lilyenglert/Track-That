<template>
  <div>
    <h2>{{ $route.params.tracker }} Tracker</h2>
    <!-- <label for="value">Test:</label>
    <input type="number" id="gValue" name="gValue" value="0"/>
    <button v-on:click="addValue()">Submit</button> -->
    <AddEntryScreen></AddEntryScreen>
    <Chart></Chart>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import Chart from './Chart.vue'
import AddEntryScreen from './AddEntryScreen.vue'
import Vue from 'vue'
import Storage from 'vue-web-storage'
import EventBus from '../eventBus.js'
Vue.use(Storage)
export default {
  name: 'ViewTrackerScreen',
  components: {
    Chart,
    AddEntryScreen
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
