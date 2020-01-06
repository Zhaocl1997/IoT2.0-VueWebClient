'use strict'

import axios from '../helper/axioshttp'

async function like(params) {
    const url = '/api/v1/user_like_article/like'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data.data
    }
}

async function unlike(params) {
    const url = '/api/v1/user_like_article/unlike'
    const result = await axios.post(url, params)
    if (result.status === true) {
        return result.data.data
    }
}

export const userLikeArticleService = {
    like,
    unlike
}