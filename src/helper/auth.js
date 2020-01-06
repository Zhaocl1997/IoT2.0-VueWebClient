'use strict'

import ls from './localStorage'
import store from '../store'

const auth = (function () {
    // 判断用户是否登录
    function isLogin() {
        const isLocalEmpty = ls.isLocalEmpty('p1')
        const state = store.getters["userState/getStatus"]

        if (isLocalEmpty || state !== 'login') {
            return false
        } else {
            return true
        }
    }

    // 判断是否为管理员
    function isAdmin() {
        const isLocalEmpty = ls.isLocalEmpty('p1')
        if (!isLocalEmpty) return false

        const user = ls.get('p1')
        if (!user) return false
        if (user.role !== 'admin') return false

        return true
    }

    return {
        isLogin,
        isAdmin
    }
})()

export default auth