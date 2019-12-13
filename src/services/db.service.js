import axios from '../helper/axioshttp'

async function index(params) {
    const url = '/api/v1/db/index'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

async function exportDB(params) {
    const url = '/api/v1/db/export'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

async function importDB(params) {
    const url = '/api/v1/db/import'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}


async function list(params) {
    const url = '/api/v1/db/list'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}


export const dbService = {
    index,
    exportDB,
    importDB,
    list
}