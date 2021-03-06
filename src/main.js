import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
import api from '@api/index'
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
