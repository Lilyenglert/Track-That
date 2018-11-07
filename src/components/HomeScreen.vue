<template>
  <div>
    <v-toolbar dark color="primary">
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title class="white--text">Overview</v-toolbar-title>
    </v-toolbar>

      <h1>Hi, {Liam!}</h1>
      <h2>Notifications</h2>
      <p>None yet!</p>
    
    <h2>Trackers</h2>
    <router-link to="/view">Coffee Budget</router-link>
    <p></p>
    <router-link to="/add">Create New +</router-link>
    <h2>Collections</h2>
    <router-link to="/template">Template</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen'
}
</script>