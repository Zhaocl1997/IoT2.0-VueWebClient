'use strict'

import axios from '../helper/axioshttp'
import base_api from "./base_api";

const index = base_api('db', 'index')

// 备份
async function exportDB(params) {
    const url = '/api/v1/db/export'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 还原
async function importDB(params) {
    const url = '/api/v1/db/import'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

// 还原清单
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