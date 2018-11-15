<template>
  <div id='view-collection-screen' class='inner'>
    <div class='top-bar section'>
      <v-btn fab dark small color="#DF5C46" class='back-button'>
          <router-link to="/"><v-icon>arrow_back</v-icon></router-link>
        </v-btn>
        <!-- <p><router-link to="/">Back</router-link><p/> -->
      <h1 class='page-title'>{{ $route.params.collection }} Collection</h1>
    </div>
    
    <div class='section'>
      <div class='section-title'>
        <h2 class='inline-block'>Trackers</h2>
        <router-link to="/add">
          <v-icon class='add-button' style='color:#DF5C46'>add_circle</v-icon>
        </router-link>
        <p class='inline-block right'><i>edit</i></p>
      </div>

      <!-- vanilla html/css -->
      <div class='box-container'>
        <div class='box' v-for="tracker in filterTrackers($route.params.collection)"  v-bind:key="tracker.id">
          <router-link :to="tracker.path" class='box-text' style='border-radius:10px;background-color:#5c46df;' >{{tracker.name}}</router-link>
        </div>
      </div> 
    </div>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
export default {
  name: 'ViewCollectionScreen',
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