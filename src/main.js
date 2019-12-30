'use strict'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMask from 'v-mask'
import Element from './plugins/element'

Vue.use(Element)
Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')