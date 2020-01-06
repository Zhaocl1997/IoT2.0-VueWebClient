<template>
  <div id="app">
    <router-view></router-view>
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
  </div>
</template>

<script>
import { getIP2 } from "./helper/public";

export default {
  name: "app",
  mounted() {
    getIP2();
  }
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  // data() {
  //   return {
  //     isRouterAlive: true
  //   };
  // },
  // methods: {
  //   // 刷新
  //   reload() {
  //     this.isRouterAlive = false;
  //     this.$nextTick(function() {
  //       this.isRouterAlive = true;
  //     });
  //   }
  // }
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/elementui.css";
</style>