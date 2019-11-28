import { userService } from '../services'
import router from '../router'
import { tip } from '../components/MessageBox';

let user = JSON.parse(localStorage.getItem('p1'));
let state = user
    ? { status: "login", user }
    : { status: "logout", user: null };

const getters = {
    getUserInfo: state => {
        if (state.user) {
            return state.user
        } else {
            return null
        }
    },
};

const actions = {
    // 登入
    async login({ /* dispatch,  */commit }, params) {
        const result = await userService.login(params)
        if (result.status === true) {
            commit('loginSuccess', result.data.user);
            tip.success('登录成功')

            setTimeout(() => {
                router.push('/default');
            }, 2000)
        } else {
            commit('loginFailure', result);
        }
    },

    // 登出
    logout({ commit }) {
        userService.logout();
        router.push('/login');
        commit('logout');
    },

    // 注册
    async register({ commit }, params) {
        const result = await userService.register(params)
        if (result.status === true) {
            commit('registerok');
            tip.success('注册成功')
            setTimeout(() => {
                router.push('/login');
            }, 2000)
        }
    }
};

const mutations = {
    loginSuccess(state, user) {
        state.status = "login"
        state.user = user;
    },

    loginFailure(state) {
        state.status = "loginFailure"
        state.user = null;
    },

    logout(state) {
        state.status = "logout"
        state.user = null;
    },

    registerok(state) {
        state.status = "registerok"
    }
};

export const userState = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};