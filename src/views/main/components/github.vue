<template>
  <div class="github">
    <a href="https://github.com/Zhaocl1997" target="_Blank">
      <img src="/icon/github.png" class="github-icon" />
    </a>
  </div>
</template>

<script>
export default {
  name: "v-contact"
};
</script>

<style scoped>
.github {
  height: 29px;
  width: 29px;

  margin-right: 10px;

  border: 1px solid #dcdfe6;
  border-radius: 3px;
  border-color: #909399;

  cursor: pointer;

  text-align: center;
}
.github-icon {
  height: 22px;
  width: 22px;
  margin-top: 2px;
}
</style>