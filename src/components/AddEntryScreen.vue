<template>
  <div>
    <!-- toolbar -->
      <v-toolbar fixed flat id="titlebar">
      <v-flex xs2>
       <router-link to="/"><a id="backButton"><i>back</i></a></router-link>
      </v-flex>
       <v-flex xs8>
      <v-toolbar-title class="page-title">New Entry</v-toolbar-title>
      </v-flex>

       <v-flex xs2>
      <a id="editButton"><i>edit</i></a>
      </v-flex>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      </v-toolbar-items>
    </v-toolbar>
    <!-- /toolbar -->

    <div id="add-entry-div" class="inner">

      <div class='section'>
      <h2 class='prompt'>Describe your <i>{{ $route.params.tracker }}</i> entry here.</h2>
      <!-- <p>Tracker Name: <input v-model="newTrackerName"></p> -->
      </div>
      <div class='section'>
        <div class='section'>
          <h4><input v-model.number="newEntryValue" type="number"> {{this.currentTrackerUnits}}</h4>
          </div>
          <div class='section'>
          <p><b>Date:</b><input id="date_input" v-model="newEntryDate" type="date"></p>
          </div> 
          <div class='section'>
          <h4>Note:<textarea v-model="entryNote"></textarea></h4>
          </div>
          <div class="section" id="btn_section">
          <v-btn large id="small-button" @click="createEntry">Add Entry</v-btn>
          </div>
      </div>
    </div>
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
    //console.log(this.entries[1]);
    this.entries.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    console.log(this.entries);
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

 /* for toolbar */


div .section{
  margin-top: 0;
  margin-bottom: 0;
}

div .input_section{
  text-align: left;
  align-content: left;
  display: inline;

}

.input_section{
  width: 100%;
  height: 10%;
  margin-left:10%;
  margin-bottom: 4%;
}

.section #small-button{
  padding: 10px 10px 10px 10px;
  
} 
.section #btn_section{
  align-content: center;
  text-align: center;
}

#date_input{
  align-content: center;
  text-align: center;
}

</style>