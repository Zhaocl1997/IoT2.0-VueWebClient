<template>
  <div class="sensor">
    <div class="sensor_header"></div>

    <table width="900" cellspacing="0" class="sensor_table">
      <tr align="center">
        <td width="225" height="50">设备名称</td>
        <td width="225">{{ this.$route.query.name }}</td>
        <td width="225">mac地址</td>
        <td width="225">{{ macAddress }}</td>
      </tr>
      <tr align="center">
        <td height="50">LED开关</td>
        <td>
          <el-switch v-model="LEDstatus" @change="onSwitch(LEDstatus)"></el-switch>
        </td>
        <td>采集时间</td>
        <td>{{ time }}</td>
      </tr>
      <tr align="center">
        <td height="50">实时温度</td>
        <td>{{ temp }}℃</td>
        <td>实时湿度</td>
        <td>{{ humi }}%</td>
      </tr>
    </table>

    <div id="sensor_chart-con">
      <canvas id="sensor_chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { format } from "@/helper/public";
import { dataService, socketService } from "@/services";

export default {
  name: "sensorData",
  data() {
    return {
      LEDstatus: false,
      macAddress: "",
      temp: "",
      humi: "",
      time: "",

      // chart视图数据
      planetChartData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "温度℃",
              data: [],
              backgroundColor: ["rgba(86,67,250,0.4)"],
              borderColor: ["rgba(41,152,255,.1)"],
              borderWidth: 0.1
            },

            {
              label: "湿度%",
              data: [],
              backgroundColor: ["rgba(255,119,48,.4)"],
              borderColor: ["rgba(255,185,0,.4)"],
              borderWidth: 0.1
            }
          ]
        },
        options: {
          title: {
            text: "温度℃  湿度% vs 时间",
            display: true
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.8)"
            }
          },
          layout: {
            padding: {
              left: 20,
              right: 30,
              top: 10,
              bottom: 10
            }
          },
          tooltips: {
            callbacks: {
              labelColor: function() {
                return {
                  borderColor: "#55c57a",
                  backgroundColor: "#7ed56f"
                };
              },
              labelTextColor: function() {
                return "#7ed56f";
              }
            }
          },

          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 20
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  autoSkip: true
                }
              }
            ]
          }
        }
      }
    };
  },
  computed: {
    newTempAndHumi() {
      // 监听新的temp和humi
      return {
        temp: this.$store.state.dataState.t,
        humi: this.$store.state.dataState.h
      };
    }
  },
  watch: {
    // 检测数据变化
    newTempAndHumi: function(val, oldVal) {
      if (val != 0 && val !== oldVal) {
        // 通过清空数据重置视图
        this.planetChartData.data.labels = [];
        this.planetChartData.data.datasets[0].data = [];
        this.planetChartData.data.datasets[1].data = [];

        // 删除canvas并重新新建
        document.getElementById("sensor_chart").remove();
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "sensor_chart");
        document.querySelector("#sensor_chart-con").appendChild(canvas);

        // 重新请求
        this.init({ macAddress: this.macAddress, pagerow: 20 });
      }
    }
  },
  mounted() {
    this.macAddress = this.$route.query.macAddress;
    this.init({ macAddress: this.macAddress, pagerow: 20 });
    socketService.initSocket({ macAddress: this.macAddress });
  },
  methods: {
    // 初始化
    async init(item) {
      const result = await dataService.index(item);

      // 最新数据
      this.temp = result.data[0].data.t;
      this.humi = result.data[0].data.h;
      this.time = format(result.data[0].createdAt, "YYYY/MM/DD HH:mm:ss");
      this.macAddress = result.data[0].macAddress;

      // 数据反转
      const data = result.data.reverse();

      // 绑定数据
      data.forEach(item => {
        // 格式化时间
        item["createdAt"] = format(item["createdAt"], "HH:mm:ss");

        // x轴时间
        this.planetChartData.data.labels.push(item.createdAt);
        // y轴温度
        this.planetChartData.data.datasets[0].data.push(item.data.t);
        // y轴湿度
        this.planetChartData.data.datasets[1].data.push(item.data.h);
      });

      // 创建视图
      this.createChart("sensor_chart", this.planetChartData);
    },

    // 创建视图
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },

    // 改变LED状态
    async onSwitch(value) {
      await dataService.onLED({ l: value });
    }
  }
};
</script>

<style scoped>
.sensor {
  border: 1px rgba(139, 28, 106, 0.2) solid;
  width: 930px;
  height: 650px;
  margin: auto;
  margin-top: 60px;
}
.sensor_header {
  background: linear-gradient(to right bottom, #00f5ff, #00c5cd);
  height: 40px;
  padding-top: 9px;
  padding-left: 80px;
}
.sensor_table {
  margin-left: 15px;
  margin-top: 10px;
  border: 1px rgba(0, 245, 255, 0.8) solid;
  border-collapse: collapse;
}
.sensor_table tr td {
  border: 1px rgba(0, 245, 255, 0.8) solid;
}
</style>