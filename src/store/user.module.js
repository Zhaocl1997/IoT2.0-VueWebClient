'use strict'

import { userService } from '../services'
import router from '../router'
import info from '../components/MessageBox'
import ls from '../helper/localStorage'

let user = ls.get('p1')
let state = user
    ? { status: "login", user }
    : { status: "logout", user: null }

const getters = {
    getUserInfo: state => {
        if (state.user) {
            return state.user
        } else {
            return null
        }
    },
    getStatus: state => {
        if (state.status) {
            return state.status
        } else {
            return null;
        }
    }
}

const actions = {
    // 登入
    async login({ /* dispatch */ commit }, params) {
        const result = await userService.login(params)
        if (result) {
            commit('loginSuccess', result)
            info.tip.success('登录成功')
            setTimeout(() => {
                router.push('/main/default')
            }, 2000)
        } else {
            commit('loginFailure')
        }
    },

    // 登出
    async logout({ commit }) {
        const result = await userService.logout()
        if (result === true) {
            commit('logout')
            info.tip.success('登出成功')
            router.push('/')
        }
    },

    // 注册
    async register({ commit }, params) {
        const result = await userService.register(params)
        if (result === true) {
            commit('registerok')
            info.tip.success('注册成功')
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        }
    }
}

const mutations = {
    loginSuccess(state, user) {
        state.status = "login"
        state.user = user
    },

    loginFailure(state) {
        state.status = "loginFailure"
        state.user = null
    },

    logout(state) {
        state.status = "logout"
        state.user = null
    },

    registerok(state) {
        state.status = "registerok"
    }
}

export const userState = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}