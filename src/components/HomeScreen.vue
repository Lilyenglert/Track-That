<template>
  <div class='inner'>
    <div class='section'>
      <h1>Hi, {Liam!}</h1>
      <p>It's a beautiful day to achieve your goals.</p>
    </div>
    <div class='section'>
      <div class='section-title'>
        <h1 class='inline-block'>Trackers</h1>
        <p class='inline-block right'><i>edit</i></p>
      </div>
      <v-container grid-list-lg text-xs-center>
        <v-layout row wrap fill-height>
          <v-flex xs6>
            <v-card color="blue darken-1" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Coffee Budget</div>
                  <!-- <div>Foster the People</div>
                  <div>(2014)</div> -->
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card dark color="primary">
              <v-card-text class="px-0">Create new</v-card-text>
            </v-card>
          </v-flex>
          
        </v-layout>
      </v-container>


      <div class='box-container'>
        <div class='box'>
          <router-link to="/view" class='box-text'>Coffee Budget</router-link>
        </div>
        
        <div class='box'>
          <router-link to="/add" class='box-text'>Create new</router-link>
        </div>
        
      </div>
      
    </div>
    <div class='section'>
      <h1>Collections</h1>
      <router-link to="/template">Template</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen'
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
