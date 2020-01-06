<template>
  <div>
    <div @click="onFullScreen" class="fullscreen">
      <i class="el-icon-full-screen fullscreen-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-fullScreen",
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    onFullScreen() {
      let element = document.documentElement;
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.isFullscreen = !this.isFullscreen;
    }
  }
};
</script>

<style scoped>
.fullscreen {
  height: 29px;
  width: 29px;

  margin-right: 10px;

  border: 1px solid #dcdfe6;
  border-radius: 3px;
  border-color: #909399;

  cursor: pointer;

  text-align: center;
}
.fullscreen-icon {
  font-size: 20px;
  position: relative;
  top: -2px;
}
</style>