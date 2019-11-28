import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'

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
        path: '/default',
        name: 'default',
        meta: {
          title: '默认页'
        },
        component: () => import(/* webpackChunkName: "default" */ '../views/default/index.vue')
      },
      {
        path: '/menumanage',
        name: 'menumanage',
        meta: {
          title: '菜单管理'
        },
        component: () => import(/* webpackChunkName: "menumanage" */ '../views/menu/index.vue')
      },
      {
        path: '/rolemanage',
        name: 'rolemanage',
        meta: {
          title: '角色管理'
        },
        component: () => import(/* webpackChunkName: "rolemanage" */ '../views/role/index.vue')
      },
      {
        path: '/usermanage',
        name: 'usermanage',
        meta: {
          title: '用户管理'
        },
        component: () => import(/* webpackChunkName: "usermanage" */ '../views/user/index.vue')
      },
      {
        path: '/devicemanage',
        name: 'devicemanage',
        meta: {
          title: '设备管理'
        },
        component: () => import(/* webpackChunkName: "devicemanage" */ '../views/device/index.vue')
      },
      {
        path: '/sensorData',
        name: 'sensorData',
        meta: {
          title: '传感器实时数据'
        },
        component: () => import(/* webpackChunkName: "sensorData" */ '../views/device/sensor.vue')
      },
      {
        path: '/cameraData',
        name: 'cameraData',
        meta: {
          title: '摄像头实时数据'
        },
        component: () => import(/* webpackChunkName: "cameraData" */ '../views/device/camera.vue')
      },
      {
        path: '/cameraDataMore',
        name: 'cameraDataMore',
        meta: {
          title: '摄像头照片库'
        },
        component: () => import(/* webpackChunkName: "cameraDataMore" */ '../views/data/camera.vue')
      },
      {
        path: '/infomanage',
        name: 'infomanage',
        meta: {
          title: '个人中心'
        },
        component: () => import(/* webpackChunkName: "infomanage" */ '../views/user/info.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.path === '/login')
    return next();

  try {
    let token = JSON.parse(localStorage.getItem('p1')).token;
    if (token) next()
  } catch (e) {
    return next();
  }
  next();
})

router.afterEach(() => {
  NProgress.done()
})

export default router