<template>
  <div>
    <div class="weather">
      <img :src="today" class="weather-icon" @mouseover="onMouseover" @mouseout="onMouseout" />
    </div>

    <div v-show="isShow" class="weather_con_wrap">
      <div class="weather_con" v-for="item in arr" :key="item.id">
        <img class="weather_img" :src="item.src" />
        <div class="weather_info">{{ item.weather }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-weather",
  data() {
    return {
      arr: [],
      today: "",
      isShow: false
    };
  },
  computed: {
    month() {
      return new Date().getMonth() + 1 > 12 ? 1 : new Date().getMonth() + 1;
    },
    ip() {
      return this.$ls.get("ip").ip;
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    onMouseover() {
      this.isShow = true;
    },
    onMouseout() {
      this.isShow = false;
    },
    async init() {
      const result = await this.$api.userService.weather({ IP: this.ip });
      this.$ls.set("city", { city: result.data.city });

      const data = result.data.forecast;

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

          case "霾":
            src = "/icon/sky/haze.png";
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

      this.today = this.arr[0].src;
    }
  }
};
</script>

<style scoped>
.weather {
  height: 29px;
  width: 29px;

  margin-right: 10px;

  border: 1px solid #dcdfe6;
  border-radius: 3px;
  border-color: #909399;

  cursor: pointer;
}
.weather-icon {
  height: 22px;
  width: 22px;

  position: relative;
  top: 2px;
  left: 2px;
}

.weather_con_wrap {
  position: absolute;
  top: 50px;
  right: 30px;
  z-index: 2000;
  display: flex;
}
.weather_con {
  height: 140px;
  width: 110px;
  font-size: 14px;
  background-color: lightblue;

  z-index: 1000;

  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #888888;
}
.weather_img {
  position: relative;
  top: 3px;
  right: -30px;
  width: 48px;
  height: 48px;
}
.weather_info {
  text-align: center;
  white-space: pre-wrap;
  color: black;
}
</style>