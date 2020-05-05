import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/User.vue'
import Essay from '../components/Essay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home },
    { path: '/home/user', name: 'user', component: User },
    { path: '/home/essay', name: 'essay', component: Essay }
  ]
})
