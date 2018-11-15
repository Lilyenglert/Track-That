<template>
  <div>
    <h2>Create Entry for {{ $route.params.tracker }}</h2>
    <p><input v-model.number="newEntryValue" type="number"></p>
    <p>Date: <input v-model="newEntryDate" type="date">{{currentTrackerUnits}}</p>
    <p>Note:<p><textarea v-model="entryNote"></textarea></p>
    <button @click="createEntry(trackerName)">Add Entry</button>
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
       entries: [
       {}
        ], 
       currentTracker:'',
       currentTrackerName:'',
       currentTrackerUnits:[],
    }
  },
  methods:{
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
  },
  createEntry(trackerName)
  {
    console.log('tracker name ' + trackerName);
    for (let index = 0; index < this.trackers.length; index++) {
      if(this.trackers[index].name == trackerName)
      {
        this.currentTracker = this.trackers[index];
        this.currentTrackerName = this.trackers[index].name; 
        this.currentTrackerUnits = this.trackers[index].unit;
      }
    }
    var newEntryInput = {
        "message": this.entryNote,
        "date" : this.newEntryDate,
        "value": this.newEntryValue,
        "unit": this.currentTrackerUnits,
        "trackerID": this.$route.params.id
    };
  this.entries.push(newEntryInput);
  console.log("pushed");
  const parsed = JSON.stringify(this.entries);
  localStorage.setItem('entries', parsed);
  // console.log(this.currentTracker);
  // console.log(this.currentTrackerName);
  // console.log(this.currentTrackerUnits);
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
