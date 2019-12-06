import axios from '../helper/axioshttp'

// 选项
async function options(params) {
    const url = '/api/v1/data/options'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 返回设备数据
async function index(params) {
    const url = '/api/v1/data/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 下行数据
async function onLED(params) {
    const url = '/api/v1/data/onLED'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 删除
async function del(params) {
    const url = '/api/v1/data/delete'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const dataService = {
    options,
    index,
    onLED,
    del
}