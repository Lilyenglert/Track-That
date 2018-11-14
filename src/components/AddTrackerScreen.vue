<template>
  <div>
    <h2>Create Tracker</h2>
    <p>What do you want to track?</p>
    <p>Tracker Name: <input v-model="newTrackerName"></p>
    <p>What units are we tracking?</p>
    <p>Tracker Units: <input v-model="newTrackerUnit"></p>
    <p>Do you have any goals? (Optional)</p>
    <p><textarea v-model="newTrackerGoal"></textarea></p>
    <p>Add tracker to collection? (Optional)</p>
    <p>
      <select v-model="NewTrackerCollection">
        <option v-for="collection in collections" v-bind:key="collection.id">{{collection.name}}</option>
      </select>
    </p>
    <button @click="add">Add Tracker</button>
    <p><router-link to="/">Back</router-link><p/>
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
      trackers: [{
        id: null,
        path: null, 
        name: null,
        unit: [],
        goal: null,
        collection: null
      }], 
      trackerID: [0], 
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
    add () {
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
        console.log("last " + lastEntry);
         fetchedTrackerIDIncremented = fetchedTrackerID[lastEntry] + 1;
          console.log('in not null' + fetchedTrackerID);
      }else{
        fetchedTrackerIDIncremented = 0;
       console.log('in null '+ fetchedTrackerIDIncremented);
      }
      
      
    
      var trackerEntry = {
        'id' : fetchedTrackerIDIncremented, 
        'path' : '/view/' + fetchedTrackerIDIncremented + '/' + this.newTrackerName + '/',
        'name': this.newTrackerName,
        'unit': this.newTrackerUnit,
        'goal': this.newTrackerGoal,
        'collection': this.NewTrackerCollection
      }; 

      this.trackerID.push(fetchedTrackerIDIncremented);
      this.trackers.push(trackerEntry)
      this.cleanTrackerValues();
      this.save()
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
