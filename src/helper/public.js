import config from '../helper/config'
import axios from "axios";

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

// mongoDB时间转换为日期
export function format(time, format) {
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
            return 2
        case 3:
        case 4:
            return val.length < 12 ? 3 : 4
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
            return true;
        case 'string':
            if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!value) return true;
            break;
        case 'number':
            if (0 === value || isNaN(value)) return true;
            break;
        case 'object':
            if (null === value || value.length === 0) return true;
            for (var i in value) {
                return false;
            }
            return true;
    }
    return false;
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
    let isLogin = isEmpty(JSON.parse(localStorage.getItem(localName)));
    if (isLogin) {
        return false
    } else {
        return true
    }
}

// 获取当前客户IP
export function getIP() {
    return new Promise((resolve, reject) => {
        axios('https://pv.sohu.com/cityjson')
            .then(res => {
                resolve(res.data.split('"')[3])
            })
            .catch((err) => {
                reject(err)
            });
    })
}

export function getIP2() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://pv.sohu.com/cityjson";
    document.head.appendChild(script);
}

// 获取当前时间
export function getNow() {
    let date_ob = new Date()
    let date = ("0" + date_ob.getDate()).slice(-2)
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
    let year = date_ob.getFullYear()
    let hours = date_ob.getHours()
    let minutes = date_ob.getMinutes()
    let seconds = date_ob.getSeconds()
    // let mseconds = date_ob.getMilliseconds()
    let result = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    return result
}