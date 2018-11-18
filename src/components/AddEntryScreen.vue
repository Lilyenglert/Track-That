<template>
  <div id='add-entry'>
    <v-app>
      <!-- toolbar -->
      <v-toolbar fixed flat id="titlebar">
        <v-flex xs2>
          <router-link to="./"><a id="backButton"><i>back</i></a></router-link>
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
        </div>

        <div class='section'>
            <div class='section'>
            <div v-if="this.currentTrackerUnits.length ==1">
                <h4><input v-model.number="newEntryValue" type="number" required="required" >{{this.currentTrackerUnits[0]}} </h4>
            </div>
            <div v-else>
                <h4><input v-model.number="newEntryValue" type="number" required="required" >{{this.currentTrackerUnits[0]}} </h4>
                <h4><input v-model.number="newEntryValue2" type="number" required="required" >{{this.currentTrackerUnits[1]}} </h4>
            </div>
            </div>

          <div class='section'>
            <p><b>Date:</b><input v-model="newEntryDate" type="date" id="date_input" required="required" ></p>
          </div>
          <div class='section'>
            <h4>Note:<textarea v-model="entryNote"></textarea></h4>
          </div>
          <div class="section" id="btn_section">
          
          <v-btn block large id="small-button" @click="createEntry" color='#DF5C46'>
            <router-link to="./">Add Entry</router-link>
          </v-btn>
          </div>
        </div>
      </div>
    </v-app>
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
      newEntryValue2:null,
      newEntries:[],
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
    console.log(this.currentTrackerUnits);
    
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
         fetchedEntryIDIncremented = fetchedEntryID[lastEntry] + 1;
      }else{
        fetchedEntryIDIncremented = 0;
      }
    this.newEntries.push(this.newEntryValue);
    if(this.newEntryValue2 != null)
    {
      this.newEntries.push(this.newEntryValue2);
    }
  
    var newEntryInput = {
        'id' : fetchedEntryIDIncremented, 
        "message": this.entryNote,
        "date" : this.newEntryDate,
        "value": this.newEntries,
        "unit": this.currentTrackerUnits,
        "trackerID": this.$route.params.id
    };
    this.entries.push(newEntryInput);

    this.entries.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()})

    this.entryID.push(fetchedEntryIDIncremented);

    
    console.log("pushed");
   this.save();
   this.cleanEntryValues();

   
  },
  cleanEntryValues()
    {
      this.entryNote = ''
      this.newEntryValue = ''
      if(this.newEntries.length == 2)
      [
        this.newEntryValue2 = ''
      ]
      this.newEntries = []
    },
  save()
  {
    const parsed = JSON.stringify(this.entries);
    localStorage.setItem('entries', parsed);


    const parsedID = JSON.stringify(this.entryID)
    localStorage.setItem('entryID', parsedID)

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