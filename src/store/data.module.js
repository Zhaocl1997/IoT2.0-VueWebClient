'use strict'

let state = {
    u: '', // camera url
    t: '', // DHT11温度
    h: '', // DHT11湿度

    a: '', // 头像修改
    n: '', // 名称修改

    m1: '', // 新设备接入
    m2: '', // 新设备添加

    c: '', // 主题颜色
}

const getters = {
    getData: state => {
        return state
    },
}

const actions = {
    setData({ commit }, arr) {
        commit('setDataSuccess', arr)
    },
    clearData({ commit }, arr) {
        commit('clearDataSuccess', arr)
    }
}

const mutations = {
    setDataSuccess(state, arr) {
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            const key = Object.keys(e)
            state[key] = e[key]
        }
    },
    clearDataSuccess(state, arr) {
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            state[e] = ""
        }
    }
}

export const dataState = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};