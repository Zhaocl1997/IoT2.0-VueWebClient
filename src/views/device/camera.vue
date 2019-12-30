<template>
  <div class="camera">
    <div class="camera_header"></div>

    <table width="900" cellspacing="0" class="camera_table">
      <tr align="center">
        <td width="225" height="50">设备名称</td>
        <td width="225">{{ this.$route.query.name }}</td>
        <td width="225">mac地址</td>
        <td width="225">{{ macAddress }}</td>
      </tr>
      <tr align="center">
        <td height="50">照片大小</td>
        <td>{{ size }}KB</td>
        <td>采集时间</td>
        <td>{{ time }}</td>
      </tr>
    </table>

    <div class="camera_con">
      <img :src="url" alt="暂无图片" class="camera_con-img" />
    </div>

    <div class="camera_more">
      <router-link
        :to="{ path: '/main/cameraDataMore', query: { macAddress: this.macAddress }}"
      >更多照片</router-link>
    </div>
  </div>
</template>

<script>
import { format, getNow } from "@/helper/public";
import { dataService, socketService } from "@/services";

export default {
  name: "cameraData",
  data() {
    return {
      macAddress: "",
      url: "" || "/img/none.jpg",
      time: "" || getNow(),
      size: "" || 0
    };
  },
  computed: {
    newUrl() {
      // 监听新的u
      return this.$store.getters["dataState/getData"].u;
    }
  },
  watch: {
    // 检测数据变化
    newUrl: function(val, oldVal) {
      if (val !== undefined && val !== oldVal) {
        this.init();
      }
    }
  },
  mounted() {
    this.macAddress = this.$route.query.macAddress;
    this.init();
    socketService.newData({ macAddress: this.macAddress });
  },
  methods: {
    async init() {
      const result = await dataService.indexByMac({
        pagerow: 1,
        pagenum: 1,
        macAddress: this.macAddress
      });

      if (result.data.length === 0) return;

      const data = result.data[0];

      // 最新数据
      this.url = `https://iot--camera.oss-cn-hangzhou.aliyuncs.com/${data.data.url}`;
      this.size = Number.parseInt(data.data.size / 1024);
      this.time = format(data.cA, "YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>

<style scoped>
.camera {
  border: 1px rgba(139, 28, 106, 0.2) solid;
  width: 930px;
  height: 650px;
  margin: auto;
  margin-top: 60px;
}
.camera_header {
  background: linear-gradient(to right bottom, #00f5ff, #00c5cd);
  height: 40px;
  padding-top: 9px;
  padding-left: 80px;
}
.camera_table {
  margin-left: 15px;
  margin-top: 10px;
  border: 1px rgba(0, 245, 255, 0.8) solid;
  border-collapse: collapse;
}
.camera_table tr td {
  border: 1px rgba(0, 245, 255, 0.8) solid;
}
.camera_con {
  margin: 5px 50px 5px;
  text-align: center;
}
.camera_con-img {
  margin: 0 auto;
  width: 640px;
  height: 480px;
}
.camera_more {
  font-size: 10px;
  position: relative;
  bottom: 25px;
  left: -20px;
  text-align: right;
}
</style>