'use strict'

import axios from '../helper/axioshttp'

export default function base_api(model, action) {
    switch (action) {
        case 'options':
            return async function options(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.data
                }
            }

        case 'index':
            return async function index(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.data
                }
            }

        case 'create':
            return async function create(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.status
                }
            }

        case 'read':
            return async function read(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.data
                }
            }

        case 'update':
            return async function update(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.status
                }
            }

        case 'updateStatus':
            return async function updateStatus(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.status
                }
            }

        case 'delete':
            return async function del(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.status
                }
            }

        case 'deleteMany':
            return async function delMany(params) {
                const url = `/api/v1/${model}/${action}`
                const result = await axios.post(url, params)
                if (result.status === true) {
                    return result.status
                }
            }

        default:
            break;
    }
}