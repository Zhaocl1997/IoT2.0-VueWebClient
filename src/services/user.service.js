'use strict'

import axios from '../helper/axioshttp'
import { socketService } from "../services";
import store from "../store";
import base_api from "./base_api";
import ls from '../helper/localStorage'

const options = base_api('user', 'options')
const index = base_api('user', 'index')
const create = base_api('user', 'create')
const read = base_api('user', 'read')
const update = base_api('user', 'update')
const updateStatus = base_api('user', 'updateStatus')
const del = base_api('user', 'delete')
const delMany = base_api('user', 'deleteMany')

// 注册
async function register(params) {
    const url = '/api/v1/user/register'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 验证码
async function captcha() {
    const url = "/api/v1/user/captcha"
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

/**
 * @method login
 * @param { Object } 
 * @returns { data }
 * @description 登录 封装到vuex id/token/role 存储到local
 */
async function login(params) {
    const url = '/api/v1/user/login'
    const result = await axios.post(url, params)
    if (result.status === true) {
        const user = {
            id: result.data.user._id,
            token: result.data.token,
            role: result.data.user.role.name,
            avatar: result.data.user.avatar,
            name: result.data.user.name
        }
        ls.set('p1', user)
        return user
    }
}

/**
 * @method logout
 * @param { null } 
 * @returns { Boolean }
 * @description 登出 封装到vuex 清空local/清空vuex/断开socket
 */
async function logout() {
    const url = '/api/v1/user/logout'
    const result = await axios.post(url)
    if (result.status === true) {
        ls.remove('p1')
        ls.remove('route')
        ls.remove('open')
        store.dispatch("dataState/clearData", ["u", "t", "h", "m1", "m2", "a", "n"]);
        socketService.closeSocket();
        return result.status
    }
}

// 天气
async function weather(params) {
    const url = '/api/v1/user/weather'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 头像
async function avatar(params) {
    const url = '/api/v1/user/avatar'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

/* findpass */
async function checkExist(params) {
    const url = '/api/v1/user/checkExist'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function sendCode(params) {
    const url = '/api/v1/user/sendCode'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function checkCode(params) {
    const url = '/api/v1/user/checkCode'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function resetPass(params) {
    const url = '/api/v1/user/resetPass'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 解锁
async function unlock(params) {
    const url = '/api/v1/user/unlock'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 修改密码
async function changePass(params) {
    const url = '/api/v1/user/changePass'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 更新个人信息
async function updateInfo(params) {
    const url = '/api/v1/user/updateInfo'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const userService = {
    register,
    login,
    logout,
    captcha,

    checkExist,
    sendCode,
    checkCode,
    resetPass,

    weather,
    avatar,
    changePass,

    options,
    index,
    create,
    read,
    update,
    updateStatus,
    unlock,
    updateInfo,
    del,
    delMany
}