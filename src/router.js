import Vue from 'vue'
import Router from 'vue-router'
import HomeScreen from './components/HomeScreen.vue'
import AddTrackerScreen from './components/AddTrackerScreen.vue'
import ViewTrackerScreen from './components/ViewTrackerScreen.vue'
import ScreenTemplate from './components/ScreenTemplate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeScreen
    },
    {
      path: '/add',
      name: 'AddTrackerScreen',
      component: AddTrackerScreen
    },
    {
      path: '/view',
      name: 'ViewTrackerScreen',
      component: ViewTrackerScreen
    },
    {
      path: '/template',
      name: 'Template',
      component: ScreenTemplate
    }
  ]
})
