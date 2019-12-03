<template>
  <div class="header">
    <div class="header_con">
      <div class="header_con-left">
        <!-- 收起侧面菜单按钮 -->
        <div class="header_con-left-btn" @click="onSidebarCollapse">
          <img src="/icon/logo.png" />
        </div>

        <div class="header_con-left-title">物联网管理中心</div>
      </div>

      <div class="header_con-right">
        <div class="header-user-con">
          <div
            class="header_con-right-weather"
            @mouseover="onWeather('y')"
            @mouseout="onWeather('n')"
          >
            <img class="header_con-right-weather-icon" :src="wSrc" />
            <div class="header_con-right-info" v-if="onWeatherDiv">{{ weather }}</div>
          </div>

          <div class="header_con-right-contact" @mouseover="onVX('y')" @mouseout="onVX('n')">
            <img class="header_con-right-contact-icon" src="/icon/vx.png" />
            <!-- <span>联系</span> -->
            <div class="header_con-right-img" v-if="onVXDiv">
              <img src="/img/vx.jpg" style="width:108px;height:108px" />
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
      onWeatherDiv: false,
      wType: "",
      wHigh: "",
      wLow: "",
      wFengli: "",
      wFengXiang: "",
      wSrc: "",
      wCity: ""
    };
  },
  computed: {
    userIP() {
      return localStorage.getItem("ip");
    },
    userrole() {
      return JSON.parse(localStorage.getItem("p1")).role;
    },
    weather() {
      return (
        "所在城市：" +
        this.wCity +
        "\n今日天气：" +
        this.wType +
        "\n今日风力：" +
        this.wFengli +
        "\n今日风向：" +
        this.wFengXiang +
        "\n最高温度：" +
        this.wHigh +
        "\n最低温度：" +
        this.wLow
      );
    },
    onNameChange() {
      return this.$store.state.dataState.b;
    }
  },
  watch: {
    onNameChange: async function(val, oldVal) {
      if (val != 0 && val !== oldVal) {
        await this.getName();
        // await this.getWeather();
      }
    }
  },
  mounted() {
    this.getName();
    // this.getWeather();
    if (document.body.clientWidth < 1500) {
      this.onSidebarCollapse();
    }
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    async getName() {
      const result = await userService.read();
      this.username = result.name;
    },

    async getWeather() {
      const result = await userService.weather({ IP: this.userIP });
      if (result) {
        this.wType = result.today.type;
        this.wHigh = result.today.high.split("温")[1];
        this.wLow = result.today.low.split("温")[1];
        this.wFengli = result.today.fengli.split("[")[2].split("]")[0];
        this.wFengXiang = result.today.fengxiang;
        this.wCity = result.city;

        switch (this.wType) {
          case "晴":
            this.wSrc = "/icon/clear.png";
            break;

          case "阴":
            this.wSrc = "/icon/overcast.png";
            break;

          case "多云":
            this.wSrc = "/icon/cloud.png";
            break;

          case "小雨":
            this.wSrc = "/icon/smallrain.png";
            break;

          case "中雨":
            this.wSrc = "/icon/mediumrain.png";
            break;

          case "大雨":
            this.wSrc = "/icon/bigrain.png";
            break;

          case "小雪":
            this.wSrc = "/icon/smallsnow.png";
            break;

          case "中雪":
            this.wSrc = "/icon/mediumsnow.png";
            break;

          case "大雪":
            this.wSrc = "/icon/bigsnow.png";
            break;

          default:
            break;
        }
      } else {
        this.wSrc = "/icon/weather.png";
      }
    },

    // 菜单折叠按钮
    onSidebarCollapse() {
      this.sidebarCollapse = !this.sidebarCollapse;
      // 发布sidebarCollapse事件
      bus.$emit("sidebarCollapse", this.sidebarCollapse);
    },

    onAvatar() {
      this.$router.push("/infomanage");
    },

    // 用户名下拉菜单选择事件
    onCommand(command) {
      if (command == "logout") {
        checkBox("您真的要退出吗?").then(action => {
          if (action === true) {
            this.logout();
            this.$store.state.dataState.a = "";
            this.$store.state.dataState.b = "";
          }
        });
      }
    },

    // 天气
    onWeather(value) {
      if (value === "y") {
        this.onWeatherDiv = true;
      } else {
        this.onWeatherDiv = false;
      }
    },

    // vx
    onVX(value) {
      if (value === "y") {
        this.onVXDiv = true;
      } else {
        this.onVXDiv = false;
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
.header_con-right-weather-icon {
  position: absolute;
  top: -13px;
  right: 50px;
  max-width: 25px;
  max-height: 25px;
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
  margin-left: 0px;
  margin-bottom: 6px;
}
.header_con-right-contact-icon {
  position: absolute;
  top: -9px;
  right: 17px;
  max-width: 25px;
  max-height: 25px;
}
.header_con-right-img {
  top: 30px;
  right: -30px;
  z-index: 8888;
  position: absolute;
}
</style>