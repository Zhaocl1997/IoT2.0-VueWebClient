'use strict'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMask from 'v-mask'
import Element from './plugins/element'


import * as api from './services' // api
import CRUD from './helper/actions' // CRUD
import ls from "./helper/localStorage" // 存储
import cookie from './helper/cookie'
import time from './helper/time' // 时间
import info from "./components/MessageBox" // 提示框

Vue.use(Element)
Vue.use(VueMask)

Vue.prototype.$api = api
Vue.prototype.$CRUD = CRUD

Vue.prototype.$ls = ls
Vue.prototype.$cookie = cookie

Vue.prototype.$time = time

Vue.prototype.$info = info

Vue.config.productionTip = false

Vue.filter('format', function (value) {
  return time.format(value)
})

Vue.filter('byteToKB', function (value) {
  return Number.parseInt(value / 1024);
})

Vue.filter('url', function (value) {
  return `https://iot--camera.oss-cn-hangzhou.aliyuncs.com/${value}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')