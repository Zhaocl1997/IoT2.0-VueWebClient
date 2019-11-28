<template>
  <div class="default">
    <div class="default_con">
      <div class="default_con-title">
        <h1>Welcome</h1>
      </div>

      <div class="default_con-main">
        <el-carousel indicator-position="outside" height="480px">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="default_con-foot">
        <a href="https://github.com/Zhaocl1997" target="_Blank">
          <img src="/icon/github.png" style="cursor: pointer" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-default",
  data() {
    return {
      img: [
        "/img/d1.jpg",
        "/img/d2.jpg",
        "/img/d3.jpg",
        "/img/d4.jpg",
        "/img/d5.jpg",
        "/img/d6.jpg"
      ]
    };
  }
};
</script>

<style scoped>
.default_con-title {
  text-align: center;
  margin: 20px;
}
.default_con-main {
  padding-top: 50px;
  margin: 0 auto;
  width: 640px;
}
.default_con-foot {
  margin-top: 20px;
  text-align: center;
}
</style>