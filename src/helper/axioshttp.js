'use strict'

import axiosOriginal from 'axios'
import config from '../helper/config'
import { authHeader } from '../helper/auth-header'
import crypto from './crypto';
import ls from './localStorage'
import info from '../components/MessageBox';
import router from "../router";

// 实例化axios对象
const axios = axiosOriginal.create({
  baseURL: config.apiUrl,
  // timeout: 1000,            // 超时毫秒数  
  withCredentials: true     // 携带认证信息cookie
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers = authHeader()
    config.headers.clientip = ls.get('ip').ip
      ? ls.get('ip').ip : '127.0.0.1'
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

/**
* get方式请求，url传参
* @param url 请求url
* @param params 参数
* @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const get = (url, params, module, level) =>
  axios(getConfig(url, 'get', true, params, module, level))
    .then(res => successback(res))
    .catch(error => errback(error));


/**
* post方式请求 json方式传参
* @param url 请求url
* @param params 参数
* @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const post = (url, params, level) =>
  axios(getConfig(url, 'post', true, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));


// 参数转换
const param2String = data => {
  if (typeof data === 'string') {
    return data;
  }
  let ret = '';
  for (let it in data) {
    let val = data[it];
    if (typeof val === 'object' && //
      (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
      val = JSON.stringify(val);
    }
    ret += it + '=' + encodeURIComponent(val) + '&';
  }
  if (ret.length > 0) {
    ret = ret.substring(0, ret.length - 1);
  }
  return ret;
};

// 错误回调函数
const errback = error => {
  if (error.response) { // 请求已经发出，服务器响应的状态码为非2xx
    error.message = '服务器响应异常,请联系系统管理（' + error.message + '）'
  } else if (error.request) { // 发出了请求，没有收到响应 
    error.message = '网络连接异常,请联系系统管理（' + error.message + '）'
  } else if (error.status === false) {
    // promise 抛出reject时触发错误
    // console.log(error.message)
    // return Promise.reject({ status: false, message: error.message }) 
    error.message = '操作失败（' + error.message + '）'
  } else {
    error.message = '未知错误（' + error.message + '）'
  }

  // 令牌过期
  if (error.code === '888888') {
    router.push('/')
  }

  info.tip.error(error.message)
  return Promise.reject({ status: false, message: error.message })
};

// 成功回调函数
const successback = res => {
  if (res.status === 200) {
    switch (res.data.code) {
      case "000000":
        return Promise.resolve({ status: true, data: res.data.data })

      case "888888":
        return Promise.reject({ code: "888888", message: res.data.message })

      case "999999":
        return Promise.reject({ status: false, message: res.data.message })

      default:
        return Promise.reject({ status: false, message: "未知格式错误" })
    }

  }
};


/**
* @param url 请求url
* @param method get,post,put,delete
* @param isjson 是否json提交参数
* @param params 参数
* @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const getConfig = (url, method, isjson, params, level = 0) => {
  let config_ = {
    url,
    method,
    headers: {
      level
    }
  };

  // 时间戳
  if (level === 1) { // 加密
    params = { encrypt: crypto.aes.en(JSON.stringify(params)) };
  } else if (level === 2) { // 签名
    let timestamp = new Date().getTime();
    // 获取token
    let token = this.$store.state.token;
    if (!token) {
      token = JSON.parse(sessionStorage.getItem('user')).token;
      this.$store.state.token = token;
    }
    // 签名串
    let signstr = crypto.sign(token, timestamp, params);
    config_.headers = {
      level,
      timestamp,
      signstr
    };
  }

  // 表单提交参数
  if (!isjson) {
    config_.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config_.responseType = 'text';
    config_.transformRequest = [function (data) {
      return param2String(data);
    }];
  }

  // 设置参数
  if (method in { 'get': true, 'delete': true }) {
    config_.params = params;      //`params` are the URL parameters to be sent with the request Must be a plain object or a URLSearchParams object
  } else if (method in { 'post': true, 'put': true }) {
    config_.data = params;
  }

  return config_;
};

// 统一方法输出口
export default {
  axios,
  get,
  post
};