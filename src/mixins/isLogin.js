'use strict'

import auth from '../helper/auth'

export const isLoginMixins = {
    computed: {
        isLogin() {
            return auth.isLogin()
        }
    }
}