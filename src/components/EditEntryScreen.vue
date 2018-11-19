
<template>
  <div>
    <!-- toolbar -->
      <v-toolbar fixed flat id="titlebar">
      <v-flex xs2>
       <router-link to="../"><a id="backButton"><i>back</i></a></router-link>
      </v-flex>
       <v-flex xs8>
      <v-toolbar-title class="page-title">Edit Entry</v-toolbar-title>
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
        <h2 class='prompt'>Edit your <i>{{ $route.params.tracker }}</i> entry here.</h2>
      </div>

      <div class='section'>
       <div v-if="this.currentEntryUnits.length ==1">
          <h4><input v-model.number="newEntryValue" type="number" required="required" >{{this.currentEntryUnits[0]}} </h4>
       </div>
      <div v-else>
          <h4><input v-model.number="newEntryValue" type="number" required="required" >{{this.currentEntryUnits[0]}} </h4>
          <h4><input v-model.number="newEntryValue2" type="number" required="required" >{{this.currentEntryUnits[1]}} </h4>
       </div>
       </div>

    <div class='section'>
      <p><b>Date:</b><input v-model="newEntryDate" type="date" id="date_input" required="required" ></p>
    </div>
    <div class='section'>
      <h4>Note:<textarea v-model="entryNote" :maxlength="140"></textarea></h4>
    </div>
     <div class="section" id="btn_section">
       <!-- <button @click="test">Test</button> -->
    <router-link to="../"><v-btn large id="small-button" @click="editEntry">Confirm Changes</v-btn></router-link>
    <v-btn large id="small-button" @click="warning">Remove Entry</v-btn>
    <DeleteWarningPopup v-show="isPopupVisible" @close="closeWarning" @delete="remove"/>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import DeleteWarningPopup from './DeleteWarningPopup.vue'
export default {
  name: 'EditEntryScreen',
   components:{
    DeleteWarningPopup,
  },
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
      currentEntry:null,
      currentEntryUnits:[],
      newEntryDate: null, 
      entryID: [],
      entryNote: null,
       currentTracker:'',
       currentTrackerName:'',
       currentTrackerUnits:[],
      isPopupVisible: false
    }
  },
  created(){
   // console.log(this.$route.params.entryid);
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

    for(var i = 0; i < this.entries.length; i++)
    {
      if(this.entries[i].id == this.$route.params.entryid)
      {
        this.currentEntry = this.entries[i];
        this.newEntryDate = this.currentEntry.date;
        
        this.currentEntryUnits = this.currentEntry.unit;
        if(this.currentEntry.unit.length == 2)
        {
          this.newEntryValue = this.currentEntry.value[0];
          this.newEntryValue2 = this.currentEntry.value[1];
        }   
        else{
          this.newEntryValue = this.currentEntry.value[0];
        }
      }
    }

  },
  methods:{
    editEntry() {

    for(var i = 0; i < this.entries.length; i++)
      {
      if(this.entries[i].id == this.$route.params.entryid)
      {
        if(this.currentEntry.unit.length == 1)
        {
          if (this.newEntryValue!=null) {this.entries[i].value[0] = this.newEntryValue};
        }
        else{
          if (this.newEntryValue!=null) {this.entries[i].value[0] = this.newEntryValue};
          if (this.newEntryValue2!=null) {this.entries[i].value[1] = this.newEntryValue2};
        }
        if (this.newEntryDate!=null) {this.entries[i].date = this.newEntryDate};
      }
      }
      this.save();
    },
    warning() {
      this.isPopupVisible = true;
    },
    closeWarning() {
      this.isPopupVisible = false;
    },

    remove()
    {
      for (var i = 0; i < this.entries.length; i++)
      {
          if(this.entries[i].id == this.$route.params.entryid)
          {
            this.entries.splice(i, 1);
          }
      }
       this.save ();
       this.$router.go(-1)
    },
     save () {
    
      localStorage.setItem('entries', JSON.stringify(this.entries));

    },
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