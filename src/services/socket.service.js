import io from 'socket.io-client'
import store from '../store'
import config from '../helper/config'

function initSocket(item) {

    const token = JSON.parse(localStorage.getItem('p1')).token
    const socket = io(config.apiUrl, {
        'query': 'token=' + token
    });

    // 监听'data:save:macAddress'事件
    socket.on(`data:save:${item.macAddress}`, function (data) {
        // 摄像头
        if (data.data.fname) {
            store.state.dataState.f = data.data.fname
        }

        // 温湿度传感器
        if (data.data.t && data.data.h) {
            store.state.dataState.t = data.data.t
            store.state.dataState.h = data.data.h
        }
    });
}

export const socketService = {
    initSocket
}