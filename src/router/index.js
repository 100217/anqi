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
    component: () => import('../views/project-edit/index.vue')
  },{
    path: '/add-member',
    name: 'AddMember',
    component: () => import('../views/home/add-member.vue')
  },{
    path: '/member-center',
    component: () => import('../views/member-center/index.vue'),
    children: [
      {
        path: 'info/:maccount',
        name: 'MemberInfo',
        component: () => import('../views/member-center/info.vue')
      },{
        path: 'expenses-records/:maccount',
        name: 'ExpensesRecords',
        component: () => import('../views/member-center/expenses-records.vue')
      },{
        path: 'recharge-records/:maccount',
        name: 'RechargeRecords',
        component: () => import('../views/member-center/recharge-records.vue')
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
