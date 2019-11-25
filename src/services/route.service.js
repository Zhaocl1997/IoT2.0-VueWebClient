import axios from '../helper/axioshttp'

async function options() {
    const url = '/api/v1/route/options'
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

async function index() {
    const url = '/api/v1/route/index'
    const result = await axios.post(url)
    if (result.status === true) {
        return result.data
    }
}

export const routeService = {
    options,
    index
}