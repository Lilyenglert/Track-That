<template>
  <div id="app">
    <v-toolbar dark color="primary">
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">{page title}</v-toolbar-title>
      <!-- <router-view name="Home">Toolbar</router-view> -->
    </v-toolbar>

    <transition name="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
.out-in-enter-active {
        transition-delay: 0.4s;
        transition-duration: 0.4s;
    }
    .out-in-enter {
        transition-delay: 0.4s;
        transition-duration: 0.4s;
        opacity: 0;
    }
    .out-in-leave-active {
        transition: all 0.4s;
        opacity: 0;;
    }

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
