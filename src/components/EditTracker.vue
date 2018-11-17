<template>
  <div id='add-tracker-screen' class='inner'>
    <div class='top-bar section'>
      <v-btn fab dark small color="#DF5C46">
          
          <router-link to="./"><v-icon>arrow_back</v-icon></router-link>
        </v-btn>
        <!-- <p><router-link to="/">Back</router-link><p/> -->
      <h1 class='page-title'>Edit Tracker</h1>
    </div>
    
    <div class='section'>
      <h2 class='prompt'>What do you want to track?</h2>
      <p>Tracker Name: <input v-model="newTrackerName"></p>
    </div>
    
    <div class='section'>
      <h2 class='prompt'>What units are we tracking?</h2>
      <p>Tracker Units: <input v-model="newTrackerUnit"></p>
    </div>
    
    <div class='section'>
      <h2 class='prompt'>Write down any goals you have.</h2>
      <p class='optional'>(Optional)</p>
      <textarea v-model="newTrackerGoal"></textarea>
    </div>
    
    <div class='section'>
      <h2 class='prompt'>Add tracker to collection?</h2>
      <p class='optional'>(Optional)</p>
      <p>
        <select v-model="NewTrackerCollection">
          <option v-for="collection in collections" v-bind:key="collection.id">{{collection.name}}</option>
        </select>
      </p>
    </div>
    
    <!-- <button @click="add">Add Tracker</button> -->
    <router-link to="/"><v-btn block dark color="#DF5C46" @click="edit" class='submit-button'>Confirm Changes</v-btn></router-link>
  </div>
</template>

<script>
export default {
  name: 'EditTracker',
  data () {
    return {
      collections: [{
        name: null
      }],
      trackers: [], 
      trackerID: [], 
      path : null,
      newTrackerName: null,
      newTrackerUnit: null,
      newTrackerGoal: null,
      NewTrackerCollection: null
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
    if (localStorage.getItem('trackerID')) {
      try {
        this.trackerID = JSON.parse(localStorage.getItem('trackerID'))
      } catch (e) {
        localStorage.removeItem('trackerID')
      }
    }
  },
  methods: {
    edit () {

        this.getLocal();
        var newName = this.newTrackerName;
        if (this.newTrackerName!=null) {this.trackers[this.$route.params.id].name = this.newTrackerName};
        if (this.newTrackerUnit!=null) {this.trackers[this.$route.params.id].unit = this.newTrackerUnit};
        if (this.newTrackerGoal!=null) {this.trackers[this.$route.params.id].goal = this.newTrackerGoal};
        if (this.NewTrackerCollection!=null) {this.trackers[this.$route.params.id].collection = this.NewTrackerCollection};
        if (this.newTrackerName!=null) {this.trackers[this.$route.params.id].path = '/view/' + this.$route.params.id + '/' + newName + '/'};
        console.log(this.trackers[this.$route.params.id]);

        this.cleanTrackerValues();
        this.save()
    },

    getLocal()
    {
        this.trackers = JSON.parse(localStorage.getItem('trackers'));
        // this.entries = JSON.parse(localStorage.getItem('entries'));
    },
    remove (x) {
      this.trackers.splice(x, 1)
      this.save()
    },
    save () {
      const parsed = JSON.stringify(this.trackers)
      localStorage.setItem('trackers', parsed)

      const parsedID = JSON.stringify(this.trackerID)
      localStorage.setItem('trackerID', parsedID)


    }, 
    cleanTrackerValues()
    {
      this.newTrackerName = ''
      this.newTrackerUnit = ''
      this.newTrackerGoal = ''
      this.newTrackerCollection = ''
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