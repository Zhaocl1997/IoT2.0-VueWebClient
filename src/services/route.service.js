'use strict'

import axios from '../helper/axioshttp'
import base_api from "./base_api";

const options = base_api('route', 'options')
const index = base_api('route', 'index')
const create = base_api('route', 'create')
const read = base_api('route', 'read')
const update = base_api('route', 'update')
const del = base_api('route', 'delete')

// 更新路由是否需要登录
async function updateNeedLogin(params) {
    const url = '/api/v1/route/updateNeedLogin'
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