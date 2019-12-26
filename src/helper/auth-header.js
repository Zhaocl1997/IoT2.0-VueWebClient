'use strict'

export function authHeader() {

    let user = JSON.parse(localStorage.getItem('p1'));
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