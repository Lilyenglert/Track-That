<template>
<div id='edit-collection'>

    <v-toolbar fixed id="titlebar">
      <v-flex xs2>
      <router-link to="/"><a id="backButton"><i>back</i></a></router-link>
      </v-flex>
      <v-flex xs8>
        <v-toolbar-title class="page-title">{{ $route.params.collection }} Edit Collections</v-toolbar-title>
      </v-flex>
      <v-flex xs2>
      </v-flex>
    </v-toolbar>
    
    <v-container class="inner">

    <div class='section'>
      <div class='section-title'>
        <h2 class='inline-block'>Your Collections</h2>
      </div>

      <!-- GRID WITH COLLECTIONS DELETE AND RENAME BUTTONS -->
      <div id="grid">
        <div id="grid-box" v-for="(collection, n) in collections" v-bind:key="collection.n">
          <div class ='box' id='overlay_box'>
            <div class='box-text' id='icon-text-box' style='border-radius:7px;background-color:rgb(255,255,255,0.1);'><a></a>
             <v-btn flat icon class='delete_button' id='add-thing' @click="warning(collection, n)"><v-icon>close</v-icon></v-btn>
            </div>
          </div>
          <div class ='box'>
            <div class='box-text' style='border-radius:7px;background-color:#5c46df;'><a>{{collection.name}}</a></div>
          </div>
          <div id='buttons-box'>
            <v-btn small color="#DF5C46" class='rename_button' id='small-button' @click="renamePopup(collection, n)">Rename</v-btn>
          </div>
        </div>
      </div> 
     
    </div>
    </v-container>

    <DeleteWarningPopup v-show="isPopupVisible" @close="closeWarning" @delete="runRemove"/>
    <RenameCollectionPopup v-show="renamePopupVisible" @close="closeRename" @rename="runRename"/>
  </div>
</template>

<script>
import DeleteWarningPopup from './DeleteWarningPopup.vue'
import RenameCollectionPopup from './RenameCollectionPopup.vue'
export default {
  name: 'EditCollectionScreen',
  components:{
    DeleteWarningPopup,
    RenameCollectionPopup
  },
  data () {
    return {
      collections: [],
      trackers:[],
      isPopupVisible: false,
      renamePopupVisible: false,
      selectedCollection: null,
      selectedKey: null,
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
    warning(collection,x){
      this.isPopupVisible = true;
      this.selectedCollection = collection;
      this.selectedKey = x;
    },
    renamePopup(collection,x){
      this.renamePopupVisible = true;
      this.selectedCollection = collection;
      this.selectedKey = x;
    },
    closeWarning() {
      this.isPopupVisible = false;
    },
    closeRename() {
      this.renamePopupVisible = false;
    },
    runRemove() {
      this.isPopupVisible = false;
      this.remove(this.selectedCollection, this.selectedKey)
      this.selectedCollection = null;
      this.selectedKey = null;
    },
    runRename(newName){
      if (!newName) {
        return
      }
      this.renamePopupVisible = false;
      for (let index = 0; index < this.trackers.length; index++) {
        if(this.trackers[index].collection == this.selectedCollection.name){
          this.trackers[index].collection = newName;
        }
      }
      this.collections[this.selectedKey].name = newName
      this.collections[this.selectedKey].path = '/collectionView/' + newName + '/'
      this.save()
    },
    remove (collection, x) {
      this.collections.splice(x, 1)
      for (let index = 0; index < this.trackers.length; index++) {
        if(this.trackers[index].collection == collection.name){
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

.section-title{
  margin-top: 10%;
}

#grid-box{
  align-content: center;
  text-align: center;
}

#buttons-box{
  display: inline;
}

.box{
  padding-left: 6px;
  margin-top: 30px;
  margin-bottom: 5px;
}

.box-text{
   z-index: 0; 
}

.rename_button #small-button{
  float: center;
  margin-bottom: 0;
}

.delete_button #small-button{
  float: right;
  margin-bottom: 0;
  z-index: 11;
  opacity: .8;
  margin: 10px;
  font-size: 5px;

}


#overlay_box{
  z-index: 10;
  position: absolute;
}

#icon-text-box.box-text{
  display: table-cell;
  vertical-align: top;
  text-align: right;
  padding: 0;
}

#add-thing{
  margin: 0;
}

</style>
