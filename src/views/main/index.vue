<template>
  <div class="main_wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>

    <div class="main_container" :class="{'main_container-collapse':sidebarCollapse}">
      <v-tags></v-tags>
      <div class="main_content">
        <!-- <transition name="move" mode="out-in"> -->
        <keep-alive :include="tagsList">
          <!--可以使被包含的组件保留状态，或避免重新渲染。 -->
          <router-view :key="$route.fullPath"></router-view>
          <!-- component matched by the route will render here -->
        </keep-alive>
        <!-- </transition> -->
      </div>
      <v-foot></v-foot>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import vHead from "./header";
import vFoot from "./footer";
import vSidebar from "./sidebar";
import vTags from "./tags";

import { socketService } from "@/services";
import Notification from "element-ui/packages/notification";

export default {
  name: "v-main",
  data() {
    return {
      tagsList: [],
      sidebarCollapse: false,
      noti: ""
    };
  },
  computed: {
    newDevice() {
      return this.$store.getters["dataState/getData"].m1;
    }
  },
  watch: {
    // 新设备
    newDevice: function(val, oldVal) {
      if (val !== "" && val !== oldVal) {
        const h = this.$createElement;

        this.noti = Notification({
          title: "检测到新设备接入",
          dangerouslyUseHTMLString: true,
          duration: 0,
          offset: 80,
          showClose: false,
          customClass: "noti-style",
          message: h(
            "el-button",
            {
              on: {
                click: this.onNewDevice
              },
              attrs: {
                size: "small",
                type: "primary"
              }
            },
            `${val}`
          )
        });
      }

      if (val === "") {
        this.noti.close();
      }
    }
  },
  components: {
    vHead,
    vFoot,
    vSidebar,
    vTags
  },
  mounted() {
    socketService.initSocket();
    socketService.newDevice();
    this.createBeforeunloadHandler();
  },
  beforeDestroy() {
    // 在 beforeDestroy 钩子移除beforeunload事件
    this.destroyedBeforeunloadHandler();
  },
  created() {
    // 监听来自header的sidebarCollapse事件
    bus.$on("sidebarCollapse", msg => {
      this.sidebarCollapse = msg;
    });

    // 监听来自tags的tags事件
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0; i < msg.length; i++) {
        msg[i].component && arr.push(msg[i].component);
      }
      this.tagsList = arr;
    });
  },
  methods: {
    // 新设备
    onNewDevice() {
      this.$router.push("/main/devicemanage");
      this.noti.close();
      setTimeout(() => {
        this.$store.dispatch("dataState/setData", [
          { m2: new Date().valueOf() }
        ]);
      }, 500);
    },

    // 添加beforeunload监听事件
    createBeforeunloadHandler() {
      window.addEventListener("beforeunload", e => {
        this.beforeunloadHandler(e);
      });
    },

    // 移除beforeunload事件
    destroyedBeforeunloadHandler() {
      window.removeEventListener("beforeunload", e => {
        this.beforeunloadHandler(e);
      });
    },

    // beforeunload监听事件
    beforeunloadHandler(e) {
      e = e || window.event;
      if (e) {
        e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
      }
      return "您是否确认离开此页面-您输入的数据可能不会被保存";
    }
  }
};
</script>

<style scoped>
.noti-style {
  width: 250px !important;
}

.main_wrapper {
  width: 100%;
  height: 100%;
  transition: all 2s;
}
.main_container {
  position: absolute;
  top: 50px;
  left: 200px;
  bottom: 0;
  right: 0;
  background: #f0f0f0;
}
.main_content {
  height: calc(100% - 59px);
  height: -webkit-calc(100% - 59px);
  height: -moz-calc(100% - 59px);
  padding: 10px;
  width: 100%;
  background: #fbfdfe;
}
.main_container-collapse {
  left: 65px;
  transition: 0.5s;
}
</style>