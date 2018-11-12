<template>
  <div class='inner'>
    <div class='section'> 
      <h1>Hi, {Liam!}</h1>
      <p>It's a beautiful day to achieve your goals.</p>
    </div>
    
    <div class='section'> 
      <h1>Trackers</h1>
      <router-link to="/add">Create New +</router-link>
      <router-link to="/view">Coffee Budget</router-link>
    </div>
    
    <div class='section'>
      <h2>Collections</h2>
      <router-link to="/template">Template</router-link>
    </div>
    
  </div>

</template>

<script>
export default {
  name: 'HomeScreen'
}
</script>