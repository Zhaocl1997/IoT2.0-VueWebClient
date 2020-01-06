<template>
  <div class="header" id="header">
    <div class="header-left">
      <!-- 收起侧面菜单按钮 -->
      <div class="header-left-btn" @click="onSidebarCollapse">
        <img src="/icon/logo.png" />
      </div>

      <div class="header-left-title">物联网管理中心</div>
    </div>

    <div class="header-right">
      <div class="header-right-login" v-if="this.isLogin">
        <!-- 天气 -->
        <v-weather></v-weather>

        <!-- 颜色 -->
        <v-color></v-color>

        <!-- 全屏 -->
        <v-full-screen></v-full-screen>

        <!-- 上锁 -->
        <v-lock></v-lock>

        <!-- github -->
        <v-github></v-github>

        <!-- 下拉 -->
        <v-command></v-command>

        <!-- 头像 -->
        <v-avatar></v-avatar>
      </div>

      <div class="header-right-notlogin">
        <router-link :to="{ path:'/login'}">登录</router-link>

        <span style="padding-left:10px;">·</span>

        <router-link :to="{ path:'/register'}">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./bus";

import { isLoginMixins } from "@/mixins";

import vWeather from "./components/weather";
import vColor from "./components/color";
import vLock from "./components/lock";
import vFullScreen from "./components/fullScreen";
import vGithub from "./components/github";
import vCommand from "./components/command";
import vAvatar from "./components/avatar";

export default {
  mixins: [isLoginMixins],
  name: "v-header",
  data() {
    return {
      sidebarCollapse: false
    };
  },
  components: {
    vWeather,
    vColor,
    vLock,
    vFullScreen,
    vGithub,
    vCommand,
    vAvatar
  },
  mounted() {
    if (this.isLogin) {
      if (document.body.clientWidth < 1500) {
        this.onSidebarCollapse();
      }
    }
  },
  methods: {
    // 菜单折叠按钮
    onSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse;
      // 发布sidebarCollapse事件
      bus.$emit("sidebarCollapse", this.sidebarCollapse);
    }
  }
};
</script>

<style scoped>
.header {
  height: 50px;
  font-size: 22px;
  color: #fff;
  background: #252a2f;
}

.header-left {
  float: left;
  padding-left: 10px;
}
.header-left-btn {
  float: left;
  padding: 0 5px;
  cursor: pointer;
  line-height: 60px;
}
.header-left-title {
  float: left;
  line-height: 50px;
  font-size: 18px;
}

.header-right {
  float: right;
  padding-right: 10px;
}

.header-right-login {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 50px;
  align-items: center;
}

.header-right-notlogin {
  font-size: 14px;
  margin: 10px;
  padding-top: 4px;
}
.header-right-notlogin a {
  color: white;
  padding-left: 10px;
}
</style>