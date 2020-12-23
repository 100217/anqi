import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/user-list'
  },{
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
    children: [
      {
        path: '/user-list',
        name: 'Home',
        component: () => import('../views/home/user-list.vue')
      },{
        path: '/price-manage',
        name: 'PriceManage',
        component: () => import('../views/home/price-manage.vue')
      }
    ],
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
      }
    ],
  },{
    path: '/member-expenses/:maccount',
    name: 'MemberExpenses',
    component: () => import('../views/member-center/expenses.vue')
  },{
    path: '/member-recharge/:maccount',
    name: 'MemberRecharge',
    component: () => import('../views/member-center/recharge.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
