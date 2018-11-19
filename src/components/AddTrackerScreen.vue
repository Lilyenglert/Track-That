<template>
  <div id='add-tracker'>
    <v-app>
      <!-- toolbar -->
      <v-toolbar fixed id="titlebar">
        <v-flex xs2>
        <router-link to="/"><a id="backButton"><i>back</i></a></router-link>
        </v-flex>
        <v-flex xs8>
          <v-toolbar-title class="page-title">Add Tracker</v-toolbar-title>
        </v-flex>

       
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down"></v-toolbar-items>
      </v-toolbar>
      <!-- /toolbar -->
      
      <v-container class="inner">
        <!-- <div class='top-bar section'>
          <v-btn fab dark small color="#DF5C46" class='back-button'>
              <router-link to="/"><v-icon>arrow_back</v-icon></router-link>
            </v-btn>
            <p><router-link to="/">Back</router-link><p/>
          <h1 class='page-title'>Create Tracker</h1>
        </div> -->
        
        <div class='section'>
          <h2 class='prompt'>What do you want to track?</h2>
          <p>Tracker Name: <input v-model="newTrackerName" :maxlength="15"></p>
        </div>
        <div v-show='containsSpecChars'><p>Tracker name should only contain numbers and/or letters.</p></div>
        <div class='section'>
      <h2 class='prompt'>What units are we tracking?</h2>
      <p>Tracker Units: <input v-model="newTrackerUnit" :maxlength="15"></p>
      <div v-if="isAddUnit" >
      <p>Tracker Units: <input v-model="newTrackerUnit2" :maxlength="15"></p>
      <v-btn block dark color="#DF5C46" @click="removeUnit" >One unit please!</v-btn>
      </div>
      <div v-if="isOneUnit">
      <v-btn block dark color="#DF5C46" @click="addUnit" >Add Another Unit</v-btn>
      </div>
    </div>
        
        
        <div class='section'>
          <h2 class='prompt'>Write down any goals you have.</h2>
          <p class='optional'>(Optional)</p>
          <textarea v-model="newTrackerGoal" :maxlength="140"></textarea>
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
        
        <v-btn block dark color="#DF5C46" @click="add" class='submit-button'>
          Add Tracker
        </v-btn>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'AddTrackerScreen',
  data () {
    return {
      collections: [{
        name: null
      }],
      trackers: [], 
      isAddUnit: false,
      isOneUnit: true,
      trackerID: [], 
      path : null,
      units:[],
      newTrackerName: null,
      newTrackerUnit: null,
      newTrackerUnit2: null,
      newTrackerGoal: null,
      containsSpecChars: false,
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
    add () {
      // console.log('clicked');
      // ensure they actually typed something
      if (!this.newTrackerName) {
        return
      }
      if (!this.newTrackerUnit) {
        return
      }
      var fetchedTrackerIDIncremented;
      var fetchedTrackerID = JSON.parse(localStorage.getItem('trackerID'));
      if(fetchedTrackerID != null)
      {      
        var lastEntry = fetchedTrackerID.length - 1;
         fetchedTrackerIDIncremented = fetchedTrackerID[lastEntry] + 1;
      }else{
        fetchedTrackerIDIncremented = 0;
      }
      
      this.units.push(this.newTrackerUnit);
      if(this.newTrackerUnit2 != null){
        this.units.push(this.newTrackerUnit2);
      }
      var isAlphanumeric = require('is-alphanumeric');
      var exp  = '/^[a-z0-9]+$/i';
        if(!isAlphanumeric(this.newTrackerName))
        {
          this.containsSpecChars = true;
        }
        else{
          
        this.containsSpecChars = false;
       this.newTrackerName = this.newTrackerName.replace(/\//g, '-');
       this.newTrackerName = encodeURI(this.newTrackerName);
       this.NewTrackerCollection = encodeURI(this.NewTrackerCollection);
      var trackerEntry = {
        'id' : fetchedTrackerIDIncremented, 
        'path' : '/view/' + fetchedTrackerIDIncremented + '/' + this.newTrackerName + '/',
        'name': this.newTrackerName,
        'unit': this.units,
        'goal': this.newTrackerGoal,
        'collection': this.NewTrackerCollection
      }; 
      this.trackerID.push(fetchedTrackerIDIncremented);
      if(trackerEntry.name !=null)
      {
        console.log("not null");
        this.trackers.push(trackerEntry)
      }
      this.trackers.sort(function(a, b){
        var first = a.name.toLowerCase(); var second = b.name.toLowerCase();
        if(first < second) { return -1; }
        if(first > second) { return 1; }
        return 0;
      })
      
      this.cleanTrackerValues();
      this.save()
      this.$router.push('/')
        }
    },
    remove (x) {
      this.trackers.splice(x, 1)
      this.save()
    },
    save() {
      const parsed = JSON.stringify(this.trackers)
      localStorage.setItem('trackers', parsed)
      const parsedID = JSON.stringify(this.trackerID)
      localStorage.setItem('trackerID', parsedID)
    }, 
    cleanTrackerValues()
    {
      this.newTrackerName = ''
      this.newTrackerUnit = ''
      this.newTrackerUnit2 = ''
      this.unit = []
      this.newTrackerGoal = ''
      this.newTrackerCollection = ''
    },
    addUnit()
    {
      this.isAddUnit = true;
      this.isOneUnit = false;
    },
    removeUnit()
    {
      this.isAddUnit = false;
      this.isOneUnit = true;
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
#add-tracker .inner {
  text-align: center;
}
</style>