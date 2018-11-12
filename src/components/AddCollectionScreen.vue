<template>
  <div>
    <div v-for="(collection, n) in collections" v-bind:key="collection.n">
      <p>
        <span>{{ collection.name }}</span>
        <button @click="remove(n)">Remove</button>
      </p>
    </div>
    <h2>Create Collection</h2>
    <p><input v-model="newCollectionName"></p>
    <button @click="add">Add Collection</button>
    <p><router-link to="/">Back</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'AddCollectionScreen',
  data () {
    return {
      collections: [{
        name: null
      }],
      newCollectionName: null
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
        'name': this.newCollectionName
      }
      // this.trackers.push(trackerEntry);
      this.collections.push(trackerEntry)
      this.newCollectionName = ''
      this.save()
    },
    remove (x) {
      this.collections.splice(x, 1)
      this.save()
    },
    save () {
      const parsed = JSON.stringify(this.collections)
      localStorage.setItem('collections', parsed)
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
