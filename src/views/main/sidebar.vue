<template>
  <div class="sidebar">
    <div class="siderbar_con">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="sidebarCollapse"
        unique-opened
        router
        background-color="#252a2f"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 循环 -->
        <template v-for="item in items">
          <!-- 有二级标题 -->
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item._id">
              <!-- 一级循环 -->
              <template slot="title">
                <img :src="item.icon" class="siderbar_con-icon" />
                <span class="siderbar_con-title">{{ item.title }}</span>
              </template>

              <!-- 二级循环 -->
              <template v-for="subItem in item.subs">
                <!-- 有三级标题 -->
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem._id">
                  <template slot="title" class="siderbar_con-title">{{ subItem.title }}</template>
                  <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item>
                </el-submenu>

                <!-- 没三级标题 -->
                <el-menu-item v-else :index="subItem.index" :key="subItem._id">
                  <img :src="subItem.icon" class="siderbar_con-icon" />
                  <span class="siderbar_con-title">{{ subItem.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>

          <!-- 没二级标题 -->
          <template v-else>
            <el-menu-item :index="item.index" :key="item._id">
              <img :src="item.icon" class="siderbar_con-icon" />
              <span class="siderbar_con-title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import { menuService } from "@/services";

export default {
  name: "v-sidebar",
  data() {
    return {
      sidebarCollapse: false,
      items: []
    };
  },
  computed: {
    onRoutes() {
      return "";
    }
  },
  created() {
    this.init();

    // 监听来自header的sidebarCollapse事件
    bus.$on("sidebarCollapse", msg => {
      this.sidebarCollapse = msg;
    });
  },
  methods: {
    // 获取菜单数据
    async init() {
      const result = await menuService.index();
      this.items = result;
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  overflow: hidden;
}
.siderbar_con {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
}
.siderbar_con::-webkit-scrollbar {
  width: 0;
}
.siderbar_con-icon {
  width: 16px;
  height: 16px;
}
.siderbar_con > ul {
  height: 100%;
}
.siderbar_con-title {
  font-size: 12px;
  padding-left: 12px;
}
</style>