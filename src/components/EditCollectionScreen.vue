<template>
  <div>
    <h2>Edit Collections</h2>

    <div class='box-container'>
          <div class = 'box' v-for="(collection, n) in collections" v-bind:key="collection.n">
                  <div @click="remove(n)" class='box-text' style='border-radius:10px;background-color:#df5c46'>{{collection.name}}</div>
                   <!-- <button class='box-text' @click="remove(n)">Remove</button> -->
          </div>
        </div>
    <!-- <div v-for="(collection, n) in collections" v-bind:key="collection.n">
      <p>
        <span>{{ collection.name }}</span>
        <button @click="remove(n)">Remove</button>
      </p>
    </div> -->
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
export default {
  name: 'EditCollectionScreen',
  data () {
    return {
      collections: [],
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
  methods:{
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
