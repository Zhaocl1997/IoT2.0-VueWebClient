<template>
  <div class="header">
    <div class="header_con" id="header">
      <div class="header_con-left">
        <!-- 收起侧面菜单按钮 -->
        <div class="header_con-left-btn" @click="onSidebarCollapse">
          <img src="/icon/logo.png" />
        </div>

        <div class="header_con-left-title">物联网管理中心</div>
      </div>

      <div class="header_con-right">
        <div class="header-user-con">
          <!-- 上锁 -->
          <el-button
            @click="onLockUp"
            style="margin-right:20px;"
            size="mini"
            type="info"
            icon="el-icon-lock"
            circle
          ></el-button>

          <!-- 主题色选择 -->
          <el-color-picker v-model="color" @change="onColor" size="mini" style="margin-right:20px;"></el-color-picker>

          <div class="header_con-right-weather" @mouseover="onWeather(1)" @mouseout="onWeather(0)">
            <span>实时温度：{{ nowTemp }}</span>
          </div>

          <!-- 天气控件 -->
          <v-weather v-show="onSKYDiv" @nowTemp="onNowTemp"></v-weather>

          <div class="header_con-right-contact" @mouseover="onVX(1)" @mouseout="onVX(0)">
            <span>联系</span>
            <div class="header_con-right-img" v-if="onVXDiv">
              <img src="/img/vx.jpg" />
            </div>
          </div>

          <!-- 用户名下拉菜单 -->
          <el-dropdown class="header_con-right-name" @command="onCommand">
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
              :fit="imgFit"
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
import { userService } from "@/services";
import vWeather from "../user/components/base/weather";

export default {
  mixins: [avatarMixins],
  name: "v-header",
  data() {
    return {
      size: 45, // 头像大小
      imgFit: "cover", // 头像自适应
      username: "",
      sidebarCollapse: false,
      onVXDiv: false,
      onSKYDiv: false,
      nowTemp: "" || "获取失败",
      color: localStorage.getItem("color") || "#252a2f"
    };
  },
  components: {
    vWeather
  },
  computed: {
    userrole() {
      return JSON.parse(localStorage.getItem("p1")).role;
    },
    onNameChange() {
      return this.$store.getters["dataState/getData"].n;
    }
  },
  watch: {
    onNameChange: function(val, oldVal) {
      if (val !== "" && val !== oldVal) {
        this.getName();
      }
    }
  },
  mounted() {
    this.getName();
    if (document.body.clientWidth < 1500) {
      this.onSidebarCollapse();
    }
    const head = document.getElementById("header");
    head.style.backgroundColor = this.color;
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    // 获取昵称
    async getName() {
      const result = await userService.read();
      this.username = result.data.name;
    },

    onNowTemp(val) {
      this.nowTemp = val;
    },

    // 菜单折叠按钮
    onSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse;
      // 发布sidebarCollapse事件
      bus.$emit("sidebarCollapse", this.sidebarCollapse);
    },

    // 上锁
    onLockUp() {
      this.$router.push("/main/lock-up");
      localStorage.setItem("lock", true);
    },

    // 点击头像
    onAvatar() {
      this.$router.push("infomanage");
    },

    // 用户名下拉菜单选择事件
    onCommand(command) {
      if (command == "logout") {
        checkBox("您真的要退出吗?").then(action => {
          if (action === true) {
            this.logout();
          }
        });
      }
    },

    // 天气
    onWeather(value) {
      if (value === 1) {
        this.onSKYDiv = true;
      } else {
        this.onSKYDiv = false;
      }
    },

    // vx
    onVX(value) {
      if (value === 1) {
        this.onVXDiv = true;
      } else {
        this.onVXDiv = false;
      }
    },

    // 选择主题颜色
    onColor(val) {
      const head = document.getElementById("header");
      head.style.backgroundColor = val;
      localStorage.setItem("color", val);
      this.$store.dispatch("dataState/setData", [{ c: new Date().valueOf() }]);
    }
  }
};
</script>

<style scoped>
.test {
  height: 100%;
  width: 100%;
  background-color: red;
}
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
  padding: 0 5px;
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
  margin-right: 35px;
}
.header_con-right-weather span {
  margin-right: 20px;
}
.header_con-right-info {
  padding-left: 20px;
  white-space: pre-wrap;
  color: black;
  background-color: lightblue;
  width: 150px;
  top: 30px;
  right: -25px;
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
  font-size: 14px;
  margin-left: 0px;
}
.header_con-right-contact {
  margin-right: 20px;
}
.header_con-right-img {
  top: 34px;
  right: -40px;
  z-index: 8888;
  position: absolute;
}
.header_con-right-img img {
  width: 108px;
  height: 108px;
}
</style>