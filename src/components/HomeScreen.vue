<template>
  <div class='inner'>
    
    <div class='section'>
      <h1 class='greeting'>Hi, Liam!</h1>
      <p class='caption'>It's a beautiful day to achieve your goals.</p>
    </div>
    <div class='section'>
      <div class='section-title'>
        <h1 class='inline-block'>Trackers</h1>
        <v-icon class='add-button' style='color:#DF5C46'>add_circle</v-icon>
        <p class='inline-block right'><i>edit</i></p>
      </div>

      <!-- vanilla html/css -->
      <div class='box-container'>
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#5c46df;'>Coffee Budget</router-link>
          </div>
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#46df5c'>Instagram Time</router-link>
          </div>
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#df467d'>Squats</router-link>
          </div>  
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#467ddf'>Jumping Jacks</router-link>
          </div>        
      </div>
      
    </div>
    <div class='section'>
      <h1 class='inline-block'>Collections</h1>
      <v-icon class='add-button' style='color:#DF5C46'>add_circle</v-icon>
      <p class='inline-block right'><i>edit</i></p>
      <!-- <router-link to="/template">Template</router-link> -->

      <div class='box-container'>
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#df5c46'>Food Stuff</router-link>
          </div>
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#46dfa8'>Social Media</router-link>
          </div>
          <div class='box'>
            <router-link to="/view" class='box-text' style='border-radius:10px;background-color:#5c46df'>Fitness</router-link>
          </div>    
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen'
}

let colors = ['#5c46df', '#46df5c', '#df467d', '#467ddf', '#46dfa8', '#df5c46'];
let randIndex = Math.floor(Math.random() * (colors.length + 1));



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
