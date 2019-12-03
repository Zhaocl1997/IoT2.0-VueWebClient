import axios from '../helper/axioshttp'

// 获取天气
async function weather(params) {
    const url = '/api/v1/user/weather'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 上传头像
async function avatar(params) {
    const url = '/api/v1/user/avatar'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 注册 封装到vuex
async function register(params) {
    const url = '/api/v1/user/register'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result
    }
}

// 登录 封装到vuex
async function login(params) {
    const url = '/api/v1/user/login'
    const result = await axios.post(url, params)
    if (result.status === true) {
        // 把基础信息存到local
        const user = {
            id: result.data.user._id,
            token: result.data.token,
            role: result.data.user.role
        }
        localStorage.setItem('p1', JSON.stringify(user))
        return result
    }
}

// 登出 封装到vuex
async function logout() {
    const url = '/api/v1/user/logout'
    const result = await axios.post(url)
    if (result.status === true) {
        localStorage.removeItem('p1')
    }
}

// 获取验证码
async function captcha() {
    const url = "/api/v1/user/captcha"
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

// 获取用户options
async function options() {
    const url = '/api/v1/user/options'
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

// 获取所有用户信息
async function index(params) {
    const url = '/api/v1/user/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 新建用户
async function create(params) {
    const url = '/api/v1/user/create'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 获取指定用户信息
async function read(params) {
    const url = '/api/v1/user/read'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 更新指定用户信息
async function update(params) {
    const url = '/api/v1/user/update'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 删除指定用户
async function del(params) {
    const url = '/api/v1/user/delete'
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
    del,
}