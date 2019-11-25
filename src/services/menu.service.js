import axios from '../helper/axioshttp'

// 获取指定用户菜单
async function index(params) {
    const url = '/api/v1/menu/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 创建新菜单
async function create(params) {
    const url = '/api/v1/menu/create'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 查询菜单信息
async function read(params) {
    const url = '/api/v1/menu/read'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 更新菜单信息
async function update(params) {
    const url = '/api/v1/menu/update'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 删除菜单
async function del(params) {
    const url = '/api/v1/menu/delete'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const menuService = {
    index,
    create,
    read,
    update,
    del,
}