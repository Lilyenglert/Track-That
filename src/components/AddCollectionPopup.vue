<template>
  <transition name="popup">
  <div class="popup-backdrop">
    <div class="popup">
      <h2>Create Collection</h2>
      <p><input v-model="newCollectionName"></p>
      <button @click="add">Add Collection</button>
      <button @click="close">Close</button>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'CollectionPopup',
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
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .popup-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
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
</style>
