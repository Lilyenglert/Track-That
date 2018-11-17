<template>
<div id='home-screen'>

    <!-- lily topbar -->
    <v-toolbar fixed id="titlebar">
      <v-flex xs2>
      <router-link to="/"><a id="backButton"><i>back</i></a></router-link>
      </v-flex>
      <v-flex xs8>
        <v-toolbar-title class="page-title">{{ $route.params.collection }} Edit Collections</v-toolbar-title>
      </v-flex>

      <v-flex xs2>
        <a id="editButton"><i>edit</i></a>
      </v-flex>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down"></v-toolbar-items>
    </v-toolbar>
    
    <v-container class="inner">

    <div class='section'>
      <div class='section-title'>
        <h2 class='inline-block'>Your Collections</h2>
        <v-btn fab dark small color="#DF5C46" class='add-thing'>
          <router-link to="/add"><v-icon>add</v-icon></router-link>
        </v-btn>
        <!-- <p class='inline-block right'><i>edit</i></p> -->
      </div>

      <!-- GRID WITH COLLECTIONS DELETE AND RENAME BUTTONS -->
      <div id="grid">
        <div class = 'box' v-for="(collection, n) in collections" v-bind:key="collection.n">
          <div class='box-text' style='border-radius:10px;background-color:#df5c46'>{{collection.name}}</div>
       
        <button flat class='rename_button' id='small-button'>Rename</button>

          <button flat class='delete_button' id='small-button' @click="remove(collection,n)">Remove</button>
        </div>
      </div> 
     
    </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'EditCollectionScreen',
  data () {
    return {
      collections: [],
      trackers:[]
    }
  },
  mounted () {
    if (localStorage.getItem('collections')) {
      try {
        this.collections = JSON.parse(localStorage.getItem('collections'))
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('collections')
        localStorage.removeItem('trackers')
      }
    }
  },
  methods:{
    remove (collection, x) {
      this.collections.splice(x, 1)
      for (let index = 0; index < this.trackers.length; index++) {
        if(this.trackers[index].collection == collection.name){
          console.log("Bingo")
          this.trackers[index].collection = null;
        }
      }
      this.save()
    }, 
    save () {
      const parsed = JSON.stringify(this.collections)
      const parsedTracker = JSON.stringify(this.trackers)
      localStorage.setItem('collections', parsed)
      localStorage.setItem('trackers', parsedTracker)
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

#grid{
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;
}

.box {
    height: 120px;
    width: 120px;
    /* max-width: 130px; */
    display: table-column;
    vertical-align: middle;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 4%;
    margin-left: 4%;
    border-radius: 3px;
    filter: drop-shadow(1px 1px 2px gray);
}

.box a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 4vw;
    padding: 5px;
    text-transform: capitalize;
}

#small-button.delete_button{
  padding: 5px;
  margin: 15px;

}


</style>
