<template>
<div id="Home">
    <transition name="out-in">
      <keep-alive>
        <component :is='currentComponent' @changeComponent='changeComp'></component>
      </keep-alive>
    </transition>
</div>
</template>

<script>
import HomeScreen from './HomeScreen.vue'
import AddTrackerScreen from './AddTrackerScreen.vue'
import ViewTrackerScreen from './ViewTrackerScreen.vue'
import ScreenTemplate from './ScreenTemplate.vue'
export default {
  data () {
    return {
      currentComponent: 'HomeScreen'
    }
  },
  name: 'Hub',
  components: {
    HomeScreen,
    AddTrackerScreen,
    ViewTrackerScreen,
    ScreenTemplate
  },
  methods: {
    changeComp (component) {
      this.currentComponent = component
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
