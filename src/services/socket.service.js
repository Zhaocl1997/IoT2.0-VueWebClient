'use strict'

import io from 'socket.io-client'
import store from '../store'
import config from '../helper/config'

// 初始化socket
const initSocket = () => {
    const token = JSON.parse(localStorage.getItem('p1')).token
    const socket = io(config.apiUrl, {
        'query': 'token=' + token
    })

    socket.on('connect', () => {
        console.log('Socket connected');
    })

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    })

    register(socket)
}

// 断开socket
const closeSocket = () => {
    if (!socket) return;
    socket.close()
}

// 注册socket
let socket = undefined
const register = (_socket) => {
    socket = _socket
}

// 新设备接入
const newDevice = () => {
    if (!socket) return;
    socket.on('new:device', (data) => {
        store.dispatch('dataState/setData', [{ m1: data.macAddress }])
    })
}

// 新数据上来
const newData = (item) => {
    if (!socket) return;
    socket.on(`data:save:${item.macAddress}`, (data) => {
        // 摄像头
        if (data.data.url) {
            store.dispatch('dataState/setData', [{ u: data.data.url }])
        }

        // 温湿度传感器
        if (data.data.t && data.data.h) {
            store.dispatch('dataState/setData', [{ t: data.data.t }, { h: data.data.h }])
        }
    })
}

export const socketService = {
    initSocket,
    closeSocket,
    newDevice,
    newData
}