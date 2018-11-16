<template>
  <div>
    <h2>Create Entry for {{ $route.params.tracker }}</h2>
    <p><input v-model.number="newEntryValue" type="number">{{this.currentTrackerUnits}}</p>
    <p>Date: <input v-model="newEntryDate" type="date"></p>
    <p>Note:<p><textarea v-model="entryNote"></textarea></p>
    <button @click="createEntry">Add Entry</button>
    <p><router-link to="./">Back</router-link><p/>
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
      newEntryDate: null, 
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
  createEntry()
  {
    //console.log('tracker name ' + trackerName);
  
    var newEntryInput = {
        "message": this.entryNote,
        "date" : this.newEntryDate,
        "value": this.newEntryValue,
        "unit": this.currentTrackerUnits,
        "trackerID": this.$route.params.id
    };
    this.entries.push(newEntryInput);
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
