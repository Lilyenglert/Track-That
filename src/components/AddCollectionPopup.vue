<template>
  <transition name="popup">
  <div class="popup-backdrop">
    <div class="popup">
      <h2>Create Collection</h2>
      <p><input v-model="newCollectionName"></p>
      <div id="save-back">
      <v-btn color='#DF5C46' class="small-button" @click="add">Save</v-btn>
      <v-btn class='close-button' @click="close">Close</v-btn>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'AddCollectionPopup',
  data () {
    return {
      collections: [],
      newCollectionName: null,
      newCollectionPath: null
    }
  },
  mounted () {
    if (localStorage.getItem('collections')) {
      try {
        this.collections = JSON.parse(localStorage.getItem('collections'))
      } catch (e) {
        localStorage.removeItem('collections')
      }
    }
  },
  methods: {
    add () {
      // ensure they actually typed something
      if (!this.newCollectionName) {
        return
      }
      var trackerEntry = {
        'name': this.newCollectionName,
        'path' : '/collectionView/' + this.newCollectionName + '/',
      }
      if(this.collections)
      this.collections.push(trackerEntry)
      this.collections.sort(function(a, b){
        var first = a.name.toLowerCase(); var second = b.name.toLowerCase();
        if(first < second) { return -1; }
        if(first > second) { return 1; }
        return 0;
      })
      this.newCollectionName = ''
      this.save()
      this.$emit('close');
    },
    remove (x) {
      this.collections.splice(x, 1)
      this.save()
    },
    save () {
      const parsed = JSON.stringify(this.collections)
      localStorage.setItem('collections', parsed)
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


h2{
  margin-bottom: 5px;
}
  .popup-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    align-content: center;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    padding: 30px;
    box-shadow: 1px 1px 10px rgb(197, 197, 197);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .popup-enter {
  opacity: 0;
}

.popup-leave-active {
  opacity: 0;
}

.popup-enter .popup-container,
.popup-leave-active .popup-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#save-back{
  display: inline;
  text-align: center;
}

.close-button .v-btn__content {
  color: black;
}

</style>
