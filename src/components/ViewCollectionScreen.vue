<template>
  <div>
    <h2>{{ $route.params.collection }} Collection</h2>
    <div v-for="tracker in filterTrackers" v-bind:key="tracker.id">
      <p><router-link to="/view/1/Coffee">{{tracker.name}}</router-link></p>
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
      }]
    }
  },
  computed: {
    filterTrackers: function () {
      return this.trackers.filter(function (tracker) {
        return tracker.collection === 'Budget'
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
