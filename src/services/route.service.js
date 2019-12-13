import axios from '../helper/axioshttp'

async function options() {
    const url = '/api/v1/route/options'
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

async function index(params) {
    const url = '/api/v1/route/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

async function create(params) {
    const url = '/api/v1/route/create'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function read(params) {
    const url = '/api/v1/route/read'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

async function update(params) {
    const url = '/api/v1/route/update'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function updateNeedLogin(params) {
    const url = '/api/v1/route/updateNeedLogin'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function del(params) {
    const url = '/api/v1/route/delete'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const routeService = {
    options,
    index,
    create,
    read,
    update,
    updateNeedLogin,
    del
}