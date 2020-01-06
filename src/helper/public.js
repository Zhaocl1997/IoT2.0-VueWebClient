'use strict'

import axios from "axios";
import config from '../helper/config'
import ls from './localStorage'

// 计算页面中表格行数
export function countLineNum() {
    try {
        const tableHeight = document.getElementById("table-main").clientHeight - config.tableHeadHeight
        const lineNum = parseInt(tableHeight / config.tableLineHeight)
        return lineNum - 1
    } catch (error) {
        return 10
    }
}

// 计算页面中照片个数
export function countPicNum() {
    try {
        const perHeight = Math.floor(document.getElementById("table-con").clientWidth / 240)
        const perWidth = Math.floor(document.getElementById("table-con").clientHeight / 180)
        const total = perHeight * perWidth
        return total
    } catch (error) {
        return 10
    }
}

// 给URL加时间戳
export function addUrlTimeStamp(url) {
    const getTimestamp = new Date().valueOf()
    if (url) {
        if (url.indexOf("?") > -1) {
            url = url + "&timestamp=" + getTimestamp
        } else {
            url = url + "?timestamp=" + getTimestamp
        }
        return url
    }
    return
}

// 判断value是否为空
export function isEmpty(value) {
    switch (typeof value) {
        case 'undefined':
            return true
        case 'string':
            if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
            break
        case 'boolean':
            if (!value) return true
            break
        case 'number':
            if (0 === value || isNaN(value)) return true
            break
        case 'object':
            if (null === value || value.length === 0) return true
            for (var i in value) {
                return false
            }
            return true
    }
    return false
}

// 返回：a的差集并排序
export function arr_diffA(a, b) {
    return a.filter(x => !(new Set(b).has(x)))
}

// 返回：拼接的新数组
export function arr_concat(arr, ...args) {
    return [].concat(arr, ...args).sort()
}


// 通过axios获取IP
export function getIP() {
    return new Promise((resolve, reject) => {
        axios('https://pv.sohu.com/cityjson')
            .then(res => {
                resolve(res.data.split('"')[3])
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// 通过dom获取IP 
export function getIP2() {
    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://pv.sohu.com/cityjson"
    document.head.appendChild(script)

    setTimeout(() => {
        ls.remove('ip')
        ls.set('ip', { ip: window.returnCitySN["cip"] })
    }, 1000);
}

// 计算字符串字节
export function sizeOfStr(str, charset) {
    var total = 0,
        charCode,
        i,
        len
    charset = charset ? charset.toLowerCase() : ""
    if (charset === "utf-16" || charset === "utf16") {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0xffff) {
                total += 2
            } else {
                total += 4
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0x007f) {
                total += 1
            } else if (charCode <= 0x07ff) {
                total += 2
            } else if (charCode <= 0xffff) {
                total += 3
            } else {
                total += 4
            }
        }
    }
    return total;
}

// 防抖
export function debounce(fn, delay) {
    var timeout = null
    return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, delay)
    }
}

// 节流
export function throttle(fn, delay) {
    var timer = 0
    var _delay = delay
    return function () {
        if (!timer) {
            setTimeout(() => { fn(); timer = 0 }, _delay)
        }
    }
}