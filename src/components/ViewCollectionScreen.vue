<template>
  <div>
    <h2>{{ $route.params.collection }} Collection</h2>
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
            <div class = 'box' v-for="tracker in filterTrackers($route.params.collection)" v-bind:key="tracker.id">
                  <router-link :to="tracker.path" class='box-text' style='border-radius:10px;background-color:#5c46df;' >{{tracker.name}}</router-link>
            </div>
      </div> 
    </div>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
export default {
  name: 'ScreenTemplate',
  data () {
    return {

      collections: [{
        name: null
      }],
      trackers: [{
        name: null,
        unit: [],
        goal: null,
        collection: null
      }],
    }
  },
  methods: {
    filterTrackers: function (currentCollection) {
      return this.trackers.filter(function (tracker) {
        return tracker.collection === currentCollection
      })
    }
  },
  mounted () {
    if (localStorage.getItem('collections')) {
      try {
        this.collections = JSON.parse(localStorage.getItem('collections'))
      } catch (e) {
        localStorage.removeItem('collections')
      }
    }
    if (localStorage.getItem('trackers')) {
      try {
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('trackers')
      }
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
