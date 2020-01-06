<template>
  <div class="base">
    <el-avatar :size="120" :src="user.avatar"></el-avatar>

    <div class="base-con-name">{{ user.name }}</div>
    <div class="base-con-welcome">欢迎您的使用</div>
    <div class="base-con-info">登陆地点：{{ city }}</div>
    <div class="base-con-info">登录IP：{{ ip }}</div>
  </div>
</template>

<script>
export default {
  name: "v-base",
  computed: {
    user() {
      return this.$ls.get("p1");
    },
    ip() {
      return this.$ls.get("ip").ip;
    },
    city() {
      return this.$ls.get("city").city;
    }
  }
};
</script>

<style scoped>
.base-con-name {
  font-size: 20px;
  font-weight: bolder;
  color: rgba(45, 140, 240, 0.8);
}
.base-con-info {
  white-space: pre-wrap;
}
</style>