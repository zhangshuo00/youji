import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/User.vue'
import Essay from '../components/Essay.vue'
import Comments from '../components/Comments.vue'
import Echarts from '../components/Echarts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: 'echarts', name: 'echarts', component: Echarts },
        { path: 'user', name: 'user', component: User },
        { path: 'essay', name: 'essay', component: Essay },
        { path: 'comments', name: 'comments', component: Comments }
      ]
    }
  ]
})
