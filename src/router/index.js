import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'

import { localTake } from "../helper/public";

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '主页'
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/auth/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      title: '主体'
    },
    component: () => import(/* webpackChunkName: "main" */ '../views/main/index.vue'),
    children: [
      {
        path: 'default',
        name: 'default',
        meta: {
          title: '默认页',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "default" */ '../views/default/index.vue')
      },
      {
        path: 'menumanage',
        name: 'menumanage',
        meta: {
          title: '菜单管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "menumanage" */ '../views/menu/index.vue')
      },
      {
        path: 'rolemanage',
        name: 'rolemanage',
        meta: {
          title: '角色管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "rolemanage" */ '../views/role/index.vue')
      },
      {
        path: 'usermanage',
        name: 'usermanage',
        meta: {
          title: '用户管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "usermanage" */ '../views/user/index.vue')
      },
      {
        path: 'devicemanage',
        name: 'devicemanage',
        meta: {
          title: '设备管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "devicemanage" */ '../views/device/index.vue')
      },
      {
        path: 'infomanage',
        name: 'infomanage',
        meta: {
          title: '信息管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "infomanage" */ '../views/user/info.vue')
      },
      {
        path: 'datamanage',
        name: 'datamanage',
        meta: {
          title: '数据管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "datamanage" */ '../views/data/index.vue')
      },
      {
        path: 'loggermanage',
        name: 'loggermanage',
        meta: {
          title: '日志管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "loggermanage" */ '../views/logger/index.vue')
      },
      {
        path: 'routemanage',
        name: 'routemanage',
        meta: {
          title: '路由管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "routemanage" */ '../views/route/index.vue')
      },
      {
        path: 'backupmanage',
        name: 'backupmanage',
        meta: {
          title: '数据备份管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "backupmanage" */ '../views/backup/index.vue')
      },
      {
        path: 'articlemanage',
        name: 'articlemanage',
        meta: {
          title: '文章管理',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "articlemanange" */ '../views/article/index.vue')
      },
      {
        path: 'sensorData',
        name: 'sensorData',
        meta: {
          title: '传感器实时数据',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "sensorData" */ '../views/device/sensor.vue')
      },
      {
        path: 'cameraData',
        name: 'cameraData',
        meta: {
          title: '摄像头实时数据',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "cameraData" */ '../views/device/camera.vue')
      },
      {
        path: 'cameraDataMore',
        name: 'cameraDataMore',
        meta: {
          title: '摄像头照片库',
          needLogin: true
        },
        component: () => import(/* webpackChunkName: "cameraDataMore" */ '../views/data/camera.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    meta: {
      title: '未知地址'
    }
  },
]

// 实例化router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫，to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  NProgress.start()

  let isLogin = localTake('p1')
  if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
    if (isLogin) { // 判断是否已经登录
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

// 重写路由的push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router