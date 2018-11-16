<template>
  <div>
    <v-btn fab dark small color="#DF5C46">
      <router-link to="./"><v-icon>arrow_back</v-icon></router-link>
    </v-btn>
    <h2>Create Entry for {{ $route.params.tracker }}</h2>
    <p><input v-model.number="newEntryValue" type="number" required="required" >{{this.currentTrackerUnits}}</p>
    <p>Date: <input v-model="newEntryDate" type="date" required="required" ></p>
    <p>Note:<p><textarea v-model="entryNote"></textarea></p>
    <router-link to="./"><button @click="createEntry">Add Entry</button></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
       trackers:[{
         name:'',
         unit:''}
       ],
       entries: [], 
      newEntryValue:null,
      newEntryDate: this.getTodaysDate(), 
      entryID: [],
      entryNote: null,
       currentTracker:'',
       currentTrackerName:'',
       currentTrackerUnits:[],
    }
  },
  created()
  {
    this.getLocal();
    this.currentTracker = this.$route.params.tracker;
    this.instantiateEntry(this.currentTracker);
    
  },
  mounted(){
     if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
      } catch (e) {
        localStorage.removeItem('entries')
      }
    }
    if (localStorage.getItem('entryID')) {
      try {
        this.entryID = JSON.parse(localStorage.getItem('entryID'))
      } catch (e) {
        localStorage.removeItem('entryID')
      }
    }
  },
  methods:{
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
   // this.entries = JSON.parse(localStorage.getItem('entries'));
  },
  instantiateEntry(trackerName)
  {
  for (let index = 0; index < this.trackers.length; index++) {
      if(this.trackers[index].name == trackerName)
      {
        this.currentTrackerUnits = this.trackers[index].unit;
      }
    }
  },
  getTodaysDate(){        
            var yearToday = new Date().getFullYear();
            var monthToday = new Date().getMonth() + 1;
            if( monthToday < 10){
                monthToday = "0" + monthToday;
            }
            var dayToday = new Date().getDate();
            if( dayToday < 10){
                dayToday = "0" + dayToday;
            }
            //console.log(yearToday + monthToday + dayToday);
            return "" + yearToday + "-" + monthToday + "-" + dayToday;
        },
  createEntry()
  {
    var fetchedEntryIDIncremented;
      var fetchedEntryID = JSON.parse(localStorage.getItem('entryID'));

      if(fetchedEntryID != null)
      {      
        var lastEntry = fetchedEntryID.length - 1;
        //console.log("last " + lastEntry);
         fetchedEntryIDIncremented = fetchedEntryID[lastEntry] + 1;
          //console.log('in not null' + fetchedTrackerID);
      }else{
        fetchedEntryIDIncremented = 0;
      // console.log('in null '+ fetchedTrackerIDIncremented);
      }
  
    var newEntryInput = {
      'id' : fetchedEntryIDIncremented, 
        "message": this.entryNote,
        "date" : this.newEntryDate,
        "value": this.newEntryValue,
        "unit": this.currentTrackerUnits,
        "trackerID": this.$route.params.id
    };
    this.entries.push(newEntryInput);

    this.entryID.push(fetchedEntryIDIncremented);

    
    console.log("pushed");
   this.save();
   this.cleanEntryValues();

   
  },
  cleanEntryValues()
    {
      this.entryNote = ''
      this.newEntryDate = ''
      this.newEntryValue = ''
    },

  save()
  {
    const parsed = JSON.stringify(this.entries);
    localStorage.setItem('entries', parsed);


      const parsedID = JSON.stringify(this.entryID)
      localStorage.setItem('entryID', parsedID)
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
