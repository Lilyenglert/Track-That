<template>
    <div id="app">
        <button @click="getLocal">Access trackers</button>
        <div v-for="tracker in trackers" v-bind:key="tracker.id">
            <p>{{tracker.name}}</p>
            <!-- <button @click="remove(n)">Remove</button> -->
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
       ]
    }
  },
  methods:{
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
  }
  }
}

</script>

<style>

</style>
