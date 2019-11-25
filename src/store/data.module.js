let state = {
    f: '', // camera图片名
    t: '0', // DHT11温度
    h: '0', // DHT11湿度
    a: ''
}

const actions = {
    saveDataInfo({ commit }, item) {
        commit('saveDataInfoSuccess', item)
    }
}

const mutations = {
    saveDataInfoSuccess(state, item) {
        state.n = item.n
        state.m = item.m
    }
}

export const dataState = {
    namespaced: true,
    state,
    actions,
    mutations,
};