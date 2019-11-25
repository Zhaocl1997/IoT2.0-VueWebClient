<template>
  <div class="header">
    <div class="header_con">
      <div class="header_con-left">
        <!-- 收起侧面菜单按钮 -->
        <div class="header_con-left-btn" @click="handleSidebarCollapse">
          <img src="/img/logo.png" />
        </div>

        <div class="header_con-left-title">IOT管理中心</div>
      </div>

      <div class="header_con-right">
        <div class="header-user-con">
          <div
            class="header_con-right-weather"
            @mouseover="displayWeather('y')"
            @mouseout="displayWeather('n')"
          >
            <span>天气</span>
            <div class="header_con-right-info" v-if="displayWeatherDiv">多云</div>
          </div>

          <div
            class="header_con-right-contact"
            @mouseover="displayVX('y')"
            @mouseout="displayVX('n')"
          >
            <span>联系</span>
            <div class="header_con-right-img" v-if="displayVXDiv">
              <img src="/img/vx.jpg" style="width:108px;height:108px" />
            </div>
          </div>

          <!-- 用户名下拉菜单 -->
          <el-dropdown class="header_con-right-name" @command="handleCommand">
            <span class="header_con-right-dropdown">
              {{ username }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="person">个人中心</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 用户头像 -->
          <div class="header_con-right-avatar" @click="onAvatar">
            <el-avatar
              v-if="this.avatarURL || this.onAvatarFirstChange"
              :src="imgURL"
              :key="imgURL"
              :fit="fit"
            ></el-avatar>
            <el-avatar v-if="!(this.avatarURL)" :size="size">{{ userrole }}</el-avatar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import { mapActions } from "vuex";
import { checkBox } from "@/components/MessageBox";
import { avatarMixins } from "@/mixins";

export default {
  mixins: [avatarMixins],
  name: "v-header",
  data() {
    return {
      size: 48, // 头像大小
      fit: "cover", // 头像自适应
      username: JSON.parse(localStorage.getItem("p1")).name,
      userrole: JSON.parse(localStorage.getItem("p1")).role,
      sidebarCollapse: false,
      displayVXDiv: false,
      displayWeatherDiv: false
    };
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.handleSidebarCollapse();
    }
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    // 菜单折叠按钮
    handleSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse;
      // 发布sidebarCollapse事件
      bus.$emit("sidebarCollapse", this.sidebarCollapse);
    },

    onAvatar() {
      this.$router.push("/personmanage");
    },

    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "logout") {
        checkBox("您真的要退出吗?").then(action => {
          if (action === true) {
            this.logout();
            this.$store.state.dataState.a = "";
          }
        });
      }
    },

    // 天气
    displayWeather(value) {
      if (value === "y") {
        this.displayWeatherDiv = true;
      } else {
        this.displayWeatherDiv = false;
      }
    },

    // vx
    displayVX(value) {
      if (value === "y") {
        this.displayVXDiv = true;
      } else {
        this.displayVXDiv = false;
      }
    }
  }
};
</script>

<style scoped>
.header_con {
  height: 50px;
  font-size: 22px;
  color: #fff;
  background: #252a2f;
}
.header_con-left {
  float: left;
  padding-left: 10px;
}
.header_con-left-btn {
  float: left;
  padding: 0 10px;
  cursor: pointer;
  line-height: 60px;
}
.header_con-left-title {
  float: left;
  line-height: 50px;
  font-size: 18px;
}
.header_con-right {
  float: right;
  padding-right: 10px;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.header_con-right-name {
  margin-left: 20px;
  margin-right: 10px;
}
.header_con-right-weather {
  position: relative;
  font-size: 14px;
  margin-right: 28px;
}
.header_con-right-weather span {
  font-size: 14px;
  color: white;
}
.header_con-right-info {
  color: black;
  top: 50px;
  right: 0;
  z-index: 8888;
  position: absolute;
}
.header_con-right-avatar {
  position: relative;
  top: 3px;
  left: 0;
  cursor: pointer;
}
.header_con-right-dropdown {
  color: #fff;
  cursor: pointer;
}
.header_con-right-contact {
  position: relative;
  margin-left: 0px;
  margin-bottom: 6px;
}
.header_con-right-contact span {
  font-size: 14px;
  color: white;
}
.header_con-right-img {
  top: 43px;
  right: -40px;
  z-index: 8888;
  position: absolute;
}
</style>