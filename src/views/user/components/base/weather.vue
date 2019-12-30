<template>
  <div class="weather">
    <template v-for="item in arr">
      <div class="weather_con" :key="item.id">
        <img class="weather_img" :src="item.src" />
        <div class="weather_info">{{ item.weather }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { userService } from "@/services";

export default {
  name: "v-weather",
  data() {
    return {
      arr: [],
      nowTemp: ""
    };
  },
  computed: {
    month() {
      return new Date().getMonth() + 1 > 12 ? 1 : new Date().getMonth() + 1;
    },
    ip() {
      return localStorage.getItem("ip");
    }
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      const result = await userService.weather({ IP: this.ip });
      const data = result.data.forecast;
      this.nowTemp = result.data.wendu + "℃";

      this.$emit("nowTemp", this.nowTemp);

      for (let i = 0; i < data.length; i++) {
        const one = data[i];

        let id = i;
        let date = `${this.month}月${one.date.split("日")[0]}日 ${
          one.date.split("日")[1]
        }`;
        let temp = `${one.low.split("温")[1].split("℃")[0]} ~ ${
          one.high.split("温")[1]
        }`;
        let type = `${one.type}`;
        let feng = `${one.fengxiang} ${one.fengli.split("[")[2].split("]")[0]}`;

        let src = "";
        switch (one.type) {
          case "晴":
            src = "/icon/sky/clear.png";
            break;

          case "阴":
            src = "/icon/sky/overcast.png";
            break;

          case "多云":
            src = "/icon/sky/cloud.png";
            break;

          case "阵雨":
            src = "/icon/sky/rain_shower.png";
            break;

          case "小雨":
            src = "/icon/sky/rain_small.png";
            break;

          case "中雨":
            src = "/icon/sky/rain_medium.png";
            break;

          case "大雨":
            src = "/icon/sky/rain_big.png";
            break;

          case "阵雪":
            src = "/icon/sky/snow_shower.png";
            break;

          case "小雪":
            src = "/icon/sky/snow_small.png";
            break;

          case "中雪":
            src = "/icon/sky/snow_medium.png";
            break;

          case "大雪":
            src = "/icon/sky/snow_big.png";
            break;

          case "雨夹雪":
            src = "/icon/sky/snow_rain.png";
            break;

          default:
            break;
        }

        this.arr.push({
          id,
          src,
          weather: `${date}` + `\n${temp}` + `\n${type}` + `\n${feng}`
        });
      }
    }
  }
};
</script>

<style scoped>
.weather {
  position: absolute;
  top: 50px;
  right: 0px;
}
.weather_con {
  z-index: 8888;
  font-size: 14px;
  background-color: lightblue;
  border-radius: 10px;
  position: relative;
  display: inline-block;
  height: 140px;
  border: 1px solid gray;
  box-shadow: 5px 5px 5px #888888;
}
.weather_img {
  position: relative;
  top: 3px;
  right: -32px;
  width: 48px;
  height: 48px;
}
.weather_info {
  position: relative;
  margin: 5px;
  text-align: center;
  white-space: pre-wrap;
  color: black;
}
</style>