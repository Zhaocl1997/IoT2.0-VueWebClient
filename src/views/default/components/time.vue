<template>
  <div class="time-info">
    <div class="time-info__top">{{ time }}</div>
    <div class="time-info__middle">
      <div>{{ date }}</div>
      <div>{{ week }}</div>
    </div>
    <div class="time-info__bottom">
      <div>{{ nong }}</div>
    </div>
  </div>
</template>

<script>
import nongli from "@/helper/nongli";

export default {
  name: "v-time",
  data() {
    return {
      time: "",
      date: "",
      week: "",
      nong: ""
    };
  },
  mounted() {
    setInterval(() => {
      this.time = this.$time.format(new Date(), "HH:mm:ss");
    }, 1000);

    const weekMap = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];

    this.week = weekMap[new Date().getDay()];
    this.date = this.$time.format(new Date(), "YYYY-MM-DD");

    this.nong = nongli(
      this.date.split("-")[0],
      this.date.split("-")[1],
      this.date.split("-")[2]
    );
  }
};
</script>

<style scoped>
.time-info {
  text-align: center;
}
.time-info > * {
  display: inline-block;
  vertical-align: middle;
}
.time-info__top {
  font-size: 30px;
  margin-right: 5px;
  margin-bottom: 10px;
}
.time-info__middle {
  font-size: 20px;
  white-space: pre-wrap;
  margin-bottom: 10px;
}
.time-info__bottom {
  font-size: 16px;
  white-space: pre-wrap;
}
</style>