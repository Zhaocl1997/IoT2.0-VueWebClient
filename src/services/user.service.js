'use strict'

import axios from '../helper/axioshttp'
import { socketService } from "../services";
import store from "../store";
import base_api from "./base_api";

const options = base_api('user', 'options')
const index = base_api('user', 'index')
const create = base_api('user', 'create')
const read = base_api('user', 'read')
const update = base_api('user', 'update')
const updateStatus = base_api('user', 'updateStatus')
const del = base_api('user', 'delete')

/**
 * @method weather
 * @param { Object } 
 * @returns { data }
 * @description 获取天气数据 
 */
async function weather(params) {
    const url = '/api/v1/user/weather'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

/**
 * @method avatar
 * @param { Object } 
 * @returns { Boolean }
 * @description 上传头像 
 */
async function avatar(params) {
    const url = '/api/v1/user/avatar'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

/**
 * @method register
 * @param { Object } 
 * @returns { Boolean }
 * @description 注册 封装到vuex
 */
async function register(params) {
    const url = '/api/v1/user/register'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
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
            role: result.data.user.role.name
        }
        localStorage.setItem('p1', JSON.stringify(user))
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
        localStorage.clear()
        store.dispatch("dataState/clearData", ["u", "t", "h", "m1", "m2", "a", "n"]);
        socketService.closeSocket();
        return result.status
    }
}

/**
 * @method captcha
 * @param { null } 
 * @returns { data }
 * @description 获取验证码
 */
async function captcha() {
    const url = "/api/v1/user/captcha"
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

/**
 * @method updateInfo
 * @param { Object } 
 * @returns { Boolean }
 * @description 更新用户信息(admin)
 */
async function updateInfo(params) {
    const url = '/api/v1/user/updateInfo'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const userService = {
    weather,
    avatar,
    register,
    login,
    logout,
    captcha,

    options,
    index,
    create,
    read,
    update,
    updateStatus,
    updateInfo,
    del,
}