<template>
<div id="app">
  <h2>Tracker</h2>
  <div v-for="(tracker, n) in trackers" v-bind:key="tracker.n">
    <p>
      <span>{{ tracker.name + " : " + tracker.unit }}</span>
      <button @click="remove(n)">Remove</button>
    </p>
  </div>

  <p>
    <input v-model="newTrackerName">
    <input v-model="newTrackerUnit">
     <!-- <button @click="add">Add Unit</button> -->
    <button @click="add">Add Tracker</button>
  </p>
</div>
</template>
 
<script>
export default {
  data(){
    return {
        trackers: [{
          name: null,
          unit: []
        }
        ],
        newTrackerName: null,
        newTrackerUnit: null
    }
  },
  mounted() {
    if (localStorage.getItem('trackers')) {
      try {
        this.trackers = JSON.parse(localStorage.getItem('trackers'));
      } catch(e) {
        localStorage.removeItem('trackers');
      }
    }
  },
  methods: {
    add() {
      // ensure they actually typed something
      if (!this.newTrackerName) {
        return;
      }
      if (!this.newTrackerUnit) {
        return;
      }
      
    var trackerEntry = {
        "name" : this.newTrackerName,
         "unit": this.newTrackerUnit,
    };

      //this.trackers.push(trackerEntry);
      this.trackers.push(trackerEntry);
      this.newTrackerName = '';
      this.newTrackerUnit = '';
      this.save();
    },
    remove(x) {
      this.trackers.splice(x, 1);
      this.save();
    },
    save() {
      const parsed = JSON.stringify(this.trackers);
      localStorage.setItem('trackers', parsed);
    }
  }
}
</script>
