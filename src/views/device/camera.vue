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
        <td>{{ picSize }}KB</td>
        <td>采集时间</td>
        <td>{{ time }}</td>
      </tr>
    </table>

    <div class="camera_con">
      <img :src="url" alt="No image" class="camera_con-img" />
    </div>

    <div class="camera_more">
      <router-link :to="{ path: '/cameraDataMore', query: { macAddress: this.macAddress }}">更多照片</router-link>
    </div>
  </div>
</template>

<script>
import { format } from "@/helper/public";
import { dataService, socketService } from "@/services";
import config from "@/helper/config";

export default {
  name: "cameraData",
  data() {
    return {
      macAddress: "",
      url: "",
      time: "",
      size: ""
    };
  },
  computed: {
    picSize() {
      return Number.parseInt(this.size / 1024);
    },
    newUrl() {
      // 监听新的fname
      return this.$store.state.dataState.f;
    }
  },
  watch: {
    // 检测数据变化
    newUrl: function(val, oldVal) {
      if (val != 0 && val !== oldVal) {
        this.init({ macAddress: this.macAddress, pagerow: 1 });
      }
    }
  },
  mounted() {
    this.macAddress = this.$route.query.macAddress;
    this.init({ macAddress: this.macAddress, pagerow: 1 });
    socketService.initSocket({ macAddress: this.macAddress });
  },
  methods: {
    async init(item) {
      const result = await dataService.index(item);
      const data = result.data[0];

      // 最新数据
      this.url = config.apiUrl + "camera/" + data.data.fname;
      this.size = data.data.size;
      this.time = format(data.createdAt, "YYYY/MM/DD HH:mm:ss");
      this.macAddress = data.macAddress;
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