'use strict'

import axios from '../helper/axioshttp'
import base_api from "./base_api";

const index = base_api('data', 'index')
const del = base_api('data', 'delete')

// 通过mac获取数据
async function indexByMac(params) {
    const url = '/api/v1/data/indexByMac'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data
    }
}

// 开关LED
async function onLED(params) {
    const url = '/api/v1/data/onLED'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.status
    }
}

export const dataService = {
    index,
    indexByMac,
    onLED,
    del
}