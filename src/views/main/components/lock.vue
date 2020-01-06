<template>
  <div @click="onLockUp" class="lock">
    <i class="el-icon-lock lock-icon"></i>
  </div>
</template>

<script>
export default {
  name: "v-lock",
  methods: {
    onLockUp() {
      this.$router.push("/main/lock-up");
      this.$ls.set("lock", { lock: true });
    }
  }
};
</script>

<style scoped>
.lock {
  height: 29px;
  width: 29px;

  margin-right: 10px;

  border: 1px solid #dcdfe6;
  border-radius: 3px;
  border-color: #909399;

  cursor: pointer;

  text-align: center;
}
.lock-icon {
  font-size: 20px;
  position: relative;
  top: -2px;
}
</style>