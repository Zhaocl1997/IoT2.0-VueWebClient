import axios from '../helper/axioshttp'

// 获取指定用户所有设备信息
async function index(params) {
    const url = '/api/v1/device/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 添加设备
async function create(params) {
    const url = '/api/v1/device/create'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 查询设备信息
async function read(params) {
    const url = '/api/v1/device/read'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 修改设备信息
async function update(params) {
    const url = '/api/v1/device/update'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 删除设备
async function del(params) {
    const url = '/api/v1/device/delete'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const deviceService = {
    index,
    create,
    read,
    update,
    del,
}