import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/message/:id',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
  {
    path: '/new_message',
    name: 'NewMessage',
    component: () => import('../views/NewMessage.vue')
  },
  {
    path: '/user_edit',
    name: 'UserEdit',
    component: () => import('../views/UserEdit.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
