import Vue from 'vue'
import Vuex from 'vuex'

import { userState } from './user.module';
import { dataState } from './data.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userState,
    dataState
  }
})