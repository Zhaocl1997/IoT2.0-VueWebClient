import axios from '../helper/axioshttp'

async function index(params) {
    const url = '/api/v1/logger/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

async function del(params) {
    const url = '/api/v1/logger/delete'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const loggerService = {
    index,
    del
}