<template>
  <div id='add-tracker'>
    <v-app>
      <!-- toolbar -->
      <v-toolbar fixed id="titlebar">
        <v-flex xs2>
          <v-btn flat icon class='add-thing'>
            <v-icon color="#DF5C46" @click="$router.go(-1)">arrow_back</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs8>
          <v-toolbar-title class="page-title">Add Tracker</v-toolbar-title>
        </v-flex>
      </v-toolbar>
      <!-- /toolbar -->
      
      <v-container class="inner">
        
        <div class='section'>
          <h2 class='prompt'>What do you want to track?</h2>
          <p>Tracker Name: <input v-model="newTrackerName"></p>
        </div>
        
        <div class='section'>
          <h2 class='prompt'>What units are we tracking?</h2>
          <p>Tracker Units: <input v-model="newTrackerUnit" :maxlength="15"></p>
          <div v-if="isAddUnit" >
            <p>Tracker Units: <input v-model="newTrackerUnit2" :maxlength="15"></p>
            <v-btn block dark color="#DF5C46" style="margin-top:7%;text-align:center;" @click="removeUnit" >One unit please!</v-btn>
          </div>
          <div v-if="isOneUnit" class='centered'>
            <v-btn dark color="#DF5C46" style="margin-top:7%;text-align:center" @click="addUnit">Add Another Unit</v-btn>
          </div>
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
        
        <router-link to="/" class='colored-button'>
          <v-btn block dark color="#DF5C46" @click="add" class='submit-button'>
            Add Tracker
          </v-btn>
        </router-link>
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
      
      this.cleanTrackerValues();
      this.save()
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
.section{
  text-align: left;
  margin-bottom: 10%;
}

/* div.v-btn{
  text-align: center;
  align-content: center
} */
</style>