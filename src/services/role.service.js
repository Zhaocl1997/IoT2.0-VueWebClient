import axios from '../helper/axioshttp'

async function options() {
    const url = '/api/v1/role/options'
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

// 获取角色
async function index(params) {
    const url = '/api/v1/role/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 创建新角色
async function create(params) {
    const url = '/api/v1/role/create'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 查询角色信息
async function read(params) {
    const url = '/api/v1/role/read'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 更新角色信息
async function update(params) {
    const url = '/api/v1/role/update'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function updateStatus(params) {
    const url = '/api/v1/role/updateStatus'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 删除角色
async function del(params) {
    const url = '/api/v1/role/delete'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const roleService = {
    index,
    create,
    read,
    update,
    updateStatus,
    del,
    options
}