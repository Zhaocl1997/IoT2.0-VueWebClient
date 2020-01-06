'use strict'

import ls from './localStorage'

export function authHeader() {

    let user = ls.get('p1')
    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token
            // 'version':'1.0',
            // 'apptype':'atpweb',
            // 'browser':'chrome',
            // 'OS':'windows10'
        };
    } else {
        return {};
    }
}