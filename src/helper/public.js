'use strict'

import axios from "axios";
import config from '../helper/config'
import { aes } from "../helper/crypto";
import { checkBox, tip } from '../components/MessageBox'

// 计算页面中表格行数
export function countLineNum() {
    try {
        const tableHeight = document.getElementById("table-main").clientHeight - config.tableHeadHeight
        const lineNum = parseInt(tableHeight / config.tableLineHeight)
        return lineNum
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

// 时间格式转换
export function format(time, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!time) throw new Error('Time must be provided!')

    const t = new Date(time) // 2019-11-09T06:27:57.040Z
    const tf = (i) => { return (i < 10 ? '0' : '') + i }

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => {
        switch (key) {
            case 'YYYY':
                return tf(t.getFullYear())
            case 'MM':
                return tf(t.getMonth() + 1)
            case 'DD':
                return tf(t.getDate())
            case 'HH':
                return tf(t.getHours())
            case 'mm':
                return tf(t.getMinutes())
            case 'ss':
                return tf(t.getSeconds())
        }
    })
}

// 检查字符串强度
export function checkStrong(val) {
    let modes = 0
    // 正则表达式验证符合要求的
    if (val.length < 1) return modes
    if (/\d/.test(val)) modes++ // 数字
    if (/[a-z]/.test(val)) modes++ // 小写
    if (/[A-Z]/.test(val)) modes++ // 大写  
    if (/\W/.test(val)) modes++ // 特殊字符

    //逻辑处理
    switch (modes) {
        case 1:
            return 1
        case 2:
            return 1
        case 3:
            return 2
        case 4:
            return 3
    }
    return modes
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

// 检验local是否有内容
export function localTake(localName) {
    let hasItem = isEmpty(JSON.parse(localStorage.getItem(localName)))
    if (hasItem) {
        return false
    } else {
        return true
    }
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
    const ip = localStorage.getItem('ip')
    if (ip) return

    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://pv.sohu.com/cityjson"
    document.head.appendChild(script)

    setTimeout(() => {
        localStorage.setItem("ip", window.returnCitySN["cip"])
    }, 1000);
}

// 获取当前时间
export function getNow() {
    return format(new Date(), 'YYYY-MM-DD HH:mm:ss')
}

// 设置cookie
export function setCookie(field, password, exdays) {
    // 获取时间
    const exdate = new Date()

    // 加密
    const userField = aes.en(field)
    const userPwd = aes.en(password)

    // 保存的天数
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)

    // 字符串拼接cookie
    window.document.cookie =
        "userField" +
        "=" +
        userField +
        ";path=/;expires=" +
        exdate.toGMTString()

    window.document.cookie =
        "userPwd" + "=" + userPwd + ";path=/;expires=" + exdate.toGMTString()
}

// 读取cookie
export function getCookie() {
    let result = {}

    if (document.cookie.length > 0) {
        // 这里显示的格式需要切割一下自己可输出看下
        const arr = document.cookie.split("; ")

        for (let i = 0; i < arr.length; i++) {
            const arr2 = arr[i].split("=") // 再次切割
            // 判断查找相对应的值
            if (arr2[0] === "userField") {
                result.loginField = aes.de(arr2[1])
            } else if (arr2[0] === "userPwd") {
                result.password = aes.de(arr2[1])
            }
        }
    }
    return result
}

// 清除cookie
export function clearCookie() {
    setCookie("", "", -1) // 修改2值都为空，天数为负1天就好了
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
    var prev = Date.now()
    return function () {
        var context = this
        var args = arguments
        var now = Date.now()
        if (now - prev >= delay) {
            fn.apply(context, args)
            prev = Date.now()
        }
    }
}

// 单个删除流程
export async function singleDelete(title, service, id, fn) {
    const action = await checkBox(`是否删除该${title}?`)
    if (action === true) {
        const result = await service.del({ _id: id })
        if (result === true) {
            tip.dS()
            fn()
        }
    } else {
        tip.cancel()
    }
}

// 多个删除流程
export async function mutipleDelete(title, service, self) {
    const id = self.multipleSelection.map(a => a._id)
    const action = await checkBox(`是否删除这些${title}?`)
    if (action === true) {
        const result = await service.delMany({ _id: id })
        if (result === true) {
            tip.dS()
            self.init()
        }
    } else {
        tip.cancel()
        self.$refs.multipleTable.clearSelection()
    }
}


// 新建或修改流程
export async function action({ t, d }, title, service) {
    if (t == `编辑${title}`) {
        const result = await service.update(d)
        if (result === true) {
            tip.uS()
            return result
        }
    } else if (t == `新建${title}`) {
        const result = await service.create(d)
        if (result === true) {
            tip.cS()
            return result
        }
    }
}