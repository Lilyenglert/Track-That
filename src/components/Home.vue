<template>
<div id="Home">
  <keep-alive>
    <transition name="out-in">
      <component :is='currentComponent' @changeComponent='changeComp'></component>
    </transition>
  </keep-alive>
</div>
</template>

<script>
import View1 from './View1.vue'
import View2 from './View2.vue'
import View3 from './View3.vue'
export default {
  data () {
    return {
      currentComponent: 'View1'
    }
  },
  name: 'Home',
  components: {
    View1,
    View2,
    View3
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
