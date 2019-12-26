'use strict'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from './plugins/element'
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')