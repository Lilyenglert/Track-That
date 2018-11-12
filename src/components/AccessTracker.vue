<template>
    <div id="app">
        <button @click="getLocal">Access trackers</button>
        <div v-for="tracker in trackers" v-bind:key="tracker.id">
            <p>{{tracker.name}}</p>
            <button @click="createEntry(tracker.name)">Create Entry</button>
        </div>
       </div> 
</template>

<script>
export default {
  data(){
    return {
       trackers:[{
         name:'',
         unit:''}
       ],

       entries: [
       {
         name: null,
         date: null, 
         value:null,
         unit:null}
        ], 
       currentTracker:'',
       currentTrackerName:'',
       currentTrackerUnits:[],
       entries:[{
         date:'',
         amount: [],
         image:[], 
       }]
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
      "name": this.currentTrackerName,
        "date" : new Date,
        "value": 7,
        "unit": this.currentTrackerUnits
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

<style>

</style>
