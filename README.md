IoT2.0-Web-Client 
===========================

## Introduction

### Functionality

- Use **Vue** as the base framework

- Use **ElementUI** as UI framework

- Use **socket.io-client** as data interact with backend

- Use **axios** as HTTP bases

- Use **ChartJS** as data display

### Structure
```
│  App.vue
│  main.js
│  router.js
│
├─assets
│  └─css
│          elementui.css
│          main.css
│
├─components
│      MessageBox.js
│      pagination.vue
│
├─helper
│      area.js
│      auth-header.js
│      axioshttp.js
│      config.js
│      crypto.js
│      public.js
│      weather.js
│
├─mixins
│      avatar.js
│      form.js
│      rule.js
│      table.js
│
├─plugins
│      element.js
│
├─services
│      data.service.js
│      device.service.js
│      index.js
│      menu.service.js
│      role.service.js
│      route.service.js
│      socket.service.js
│      user.service.js
│
├─store
│      data.module.js
│      index.js
│      user.module.js
│
└─views
    ├─auth
    │  │  findpass.vue
    │  │  Home.vue
    │  │  Login.vue
    │  │  Register.vue
    │  │
    │  └─components
    │          verifycode.vue
    │
    ├─data
    │      camera.vue
    │
    ├─default
    │      index.vue
    │
    ├─device
    │  │  camera.vue
    │  │  index.vue
    │  │  sensor.vue
    │  │
    │  └─components
    │          addeditform.vue
    │
    ├─main
    │      bus.js
    │      footer.vue
    │      header.vue
    │      index.vue
    │      sidebar.vue
    │      tags.vue
    │
    ├─menu
    │  │  index.vue
    │  │
    │  └─components
    │          addeditform.vue
    │
    ├─role
    │  │  index.vue
    │  │
    │  └─components
    │          addeditform.vue
    │
    └─user
        │  index.vue
        │  person.vue
        │
        └─components
                addeditform.vue
                avatar.vue
                birthday.vue
```
### Usage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
