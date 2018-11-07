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
        <option>Budget</option>
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
      trackers: [{
        name: null,
        unit: []
      }],
      newTrackerName: null,
      newTrackerUnit: null,
      newTrackerGoal: null,
      NewTrackerCollection: null
    }
  },
  mounted () {
    if (localStorage.getItem('trackers')) {
      try {
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('trackers')
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
      var trackerEntry = {
        'name': this.newTrackerName,
        'unit': this.newTrackerUnit,
        'goal': this.newTrackerGoal,
        'collection': this.NewTrackerCollection
      }
      // this.trackers.push(trackerEntry);
      this.trackers.push(trackerEntry)
      this.newTrackerName = ''
      this.newTrackerUnit = ''
      this.newTrackerGoal = ''
      this.newTrackerCollection = ''
      this.save()
    },
    remove (x) {
      this.trackers.splice(x, 1)
      this.save()
    },
    save () {
      const parsed = JSON.stringify(this.trackers)
      localStorage.setItem('trackers', parsed)
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
