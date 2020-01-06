'use strict'

import crypto from "./crypto";

const cookie = (function () {
    // 设置cookie
    function set(field, password, exdays) {
        // 获取时间
        const exdate = new Date()

        // 加密
        const userField = crypto.aes.en(field)
        const userPwd = crypto.aes.en(password)

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

    // 获取cookie
    function get() {
        let result = {}

        if (document.cookie.length > 0) {
            // 这里显示的格式需要切割一下自己可输出看下
            const arr = document.cookie.split("; ")

            for (let i = 0; i < arr.length; i++) {
                const arr2 = arr[i].split("=") // 再次切割
                // 判断查找相对应的值
                if (arr2[0] === "userField") {
                    result.loginField = crypto.aes.de(arr2[1])
                } else if (arr2[0] === "userPwd") {
                    result.password = crypto.aes.de(arr2[1])
                }
            }
        }
        return result
    }

    // 清空cookie
    function clear() {
        set("", "", -1) // 修改2值都为空，天数为负1天就好了
    }

    return {
        set,
        get,
        clear
    }
})()

export default cookie