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
      <div v-if="this.trackers[this.$route.params.id].unit.length == 2">
        <p>Tracker Units: <input v-model="newTrackerUnit1"></p>
        <p>Tracker Units: <input v-model="newTrackerUnit2"></p>
      </div>
      <div v-else>
        <p>Tracker Units: <input v-model="newTrackerUnit1"></p>
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
    
    <!-- <button @click="add">Add Tracker</button> -->
    <router-link to="./"><v-btn block dark color="#DF5C46" @click="edit" class='submit-button'>Confirm Changes</v-btn></router-link>
    <router-link to="/"><v-btn block dark color="#DF5C46" @click="remove" class='submit-button'>Remove Tracker</v-btn></router-link>
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
      entries:[],
      trackers: [], 
      trackerID: [], 
      path : null,
      entryUnit1:null, 
      entryUnit2:null,
      newTrackerName: null,
      newTrackerUnit1: null,
      newTrackerUnit2: null,
      newTrackerGoal: null,
      NewTrackerCollection: null
    }
  },
  mounted () {

    this.getLocal();
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
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
      } catch (e) {
        localStorage.removeItem('entries')
      }
    }

    this.newTrackerName = this.trackers[this.$route.params.id].name;
    if(this.trackers[this.$route.params.id].unit.length == 2)
    {
      this.newTrackerUnit1 = this.trackers[this.$route.params.id].unit[0];
      this.newTrackerUnit2 = this.trackers[this.$route.params.id].unit[1];
    }else{
      this.newTrackerUnit1 = this.trackers[this.$route.params.id].unit;
    }
   
   this.newTrackerGoal = this.trackers[this.$route.params.id].goal;
   this.NewTrackerCollection = this.trackers[this.$route.params.id].collection;
    console.log(this.$route.params);
  },
  methods: {
    edit () {

        var newName = this.newTrackerName;
        console.log('in edit ' + this.entries[0].unit[0]);
        if (this.newTrackerName!=null) {this.trackers[this.$route.params.id].name = this.newTrackerName};
        if(this.trackers[this.$route.params.id].unit.length == 2)
        {

          for(var i = 0; i < this.entries.length; i++)
          {
            if(this.entries[i].trackerID == this.$route.params.id)
            {
              this.entries[i].unit[0] = this.newTrackerUnit1;
              this.entries[i].unit[1] = this.newTrackerUnit2;
            }
          }
          if (this.newTrackerUnit1!=null) {this.trackers[this.$route.params.id].unit[0] = this.newTrackerUnit1};
          if (this.newTrackerUnit2!=null) {this.trackers[this.$route.params.id].unit[1] = this.newTrackerUnit2};
        }else{
          if(this.newTrackerUnit1!=null) {this.trackers[this.$route.params.id].unit = this.newTrackerUnit1};

           for(var i = 0; i < this.entries.length; i++)
          {
            if(this.entries[i].trackerID == this.$route.params.id)
            {
              this.entries[i].unit = this.newTrackerUnit1;
            }
          }
        }
        if (this.newTrackerGoal!=null) {this.trackers[this.$route.params.id].goal = this.newTrackerGoal};
        if (this.NewTrackerCollection!=null) {this.trackers[this.$route.params.id].collection = this.NewTrackerCollection};
        if (this.newTrackerName!=null) {this.trackers[this.$route.params.id].path = '/view/' + this.$route.params.id + '/' + newName + '/'};
        //this.pushValues();
        this.cleanTrackerValues();
        this.save()
    }, 
    
    getLocal()
    {
        this.trackers = JSON.parse(localStorage.getItem('trackers'));
       this.entries = JSON.parse(localStorage.getItem('entries'));
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

      localStorage.setItem('entries', JSON.stringify(this.entries));

    }, 
    cleanTrackerValues()
    {
      this.newTrackerName = ''
      this.newTrackerUnit1 = ''
      this.newTrackerUnit2 = ''
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