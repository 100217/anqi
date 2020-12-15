import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
  },{
    path: '/project-edit/:projectId/',
    name: 'ProjectEdit',
    component: () => import(/* webpackChunkName: "about" */ '../views/project-edit/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
