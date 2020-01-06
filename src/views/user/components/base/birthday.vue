<template>
  <div id="myDate">
    <el-select
      v-model="yearsModel"
      @change="onDateChange(1)"
      placeholder="请选择"
      style="width:100px;"
    >
      <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-select
      v-model="monthsModel"
      @change="onDateChange(2)"
      placeholder="请选择"
      style="width:100px;"
      v-if="yearsModel"
    >
      <el-option v-for="item in months" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-select
      v-model="daysModel"
      @change="onDateChange(3)"
      placeholder="请选择"
      style="width:100px;"
      v-if="monthsModel"
    >
      <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
 
<script>
export default {
  name: "userBirthDay",
  props: {
    value: Object
  },
  model: {
    prop: "value",
    event: "birth"
  },
  data() {
    return {
      yearsModel: this.value.year,
      years: [],
      monthsModel: this.value.month,
      months: [],
      daysModel: this.value.day,
      days: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myDate = new Date();
      let year = myDate.getFullYear(); // 获取当前年
      let month = myDate.getMonth() + 1; // 获取当前月
      // let day = myDate.getDate(); // 获取当前日

      this.initSelectYear(year);
      this.initSelectMonth();
      this.initSelectDay(year, month);
    },
    initSelectYear(year) {
      // 50年选择项
      this.years = [];
      for (let i = 0; i < 50; i++) {
        this.years.push({ value: year - i, label: year - i + "年" });
      }
    },
    initSelectMonth() {
      // 月份选择项
      this.months = [];
      for (let i = 1; i <= 12; i++) {
        this.months.push({ value: i, label: i + "月" });
      }
    },
    initSelectDay(year, month) {
      // 日期选择项
      let maxDay = this.getMaxDay(year, month);
      this.days = [];
      for (let i = 1; i <= maxDay; i++) {
        this.days.push({ value: i, label: i + "日" });
      }
    },

    // 变化
    onDateChange(type) {
      // 1年 2月 3日
      if (type == 1 || type == 2) {
        if (this.monthsModel == 0) {
          this.initSelectDay(this.yearsModel, 1);
        } else {
          this.initSelectDay(this.yearsModel, this.monthsModel);
        }
      }

      // 操作父组件方法
      let obj = {
        year: this.yearsModel,
        month: this.monthsModel,
        day: this.daysModel
      };
      this.$emit("birth", obj);
    },

    // 获取一个月的天数
    getMaxDay(year, month) {
      let new_year = year; // 取当前的年份
      let new_month = month++; // 取下一个月的第一天，方便计算（最后一天不固定）
      if (month > 12) {
        // 如果当前大于12月，则年份转到下一年
        new_month -= 12; // 月份减
        new_year++; // 年份增
      }
      let new_date = new Date(new_year, new_month, 1); // 取当年当月中的第一天
      return new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate(); // 获取当月最后一天日期
    }
  }
};
</script>