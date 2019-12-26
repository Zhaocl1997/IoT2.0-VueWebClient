<template>
  <div>
    <div v-for="(item, index) in block" :key="index">
      <!-- svg图片和信息 -->
      <div class="con" :style="item.style">
        <svg
          class="con_svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <image :href="item.href" height="60" width="60" />
        </svg>

        <div class="con_title">{{ item.title }}</div>
        <div class="con_info">{{ item.info }}</div>
      </div>

      <!-- 箭头 -->
      <svg
        style="position:absolute;"
        v-for="arrow in item.arrow"
        :key="arrow.id"
        :style="arrow.style"
      >
        <defs>
          <marker
            :id="arrow.id"
            markerWidth="10"
            markerHeight="10"
            refX="0"
            refY="3"
            :orient="arrow.degree"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#1E4246" />
          </marker>
        </defs>

        <line x1="50" y1="50" x2="50" y2="50" stroke-width="2" :marker-end="`url(#${arrow.id})`" />
      </svg>

      <!-- 线 -->
      <svg class="con_line" v-for="line in item.line" :key="line.id">
        <line
          :x1="`${line.pos.x1}`"
          :y1="`${line.pos.y1}`"
          :x2="`${line.pos.x2}`"
          :y2="`${line.pos.y2}`"
          :style="line.style"
        />
      </svg>

      <!-- 圆环 -->
      <svg class="con_line" v-for="circle in item.circle" :key="circle.id">
        <circle
          :cx="`${circle.size.cx}`"
          :cy="`${circle.size.cy}`"
          :r="`${circle.size.r}`"
          :style="circle.style"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.con {
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 1000;
}
.con_line {
  position: absolute;
  left: 10px;
  top: 50px;
  width: 700px;
  height: 400px;
}
.con_svg {
  width: 60px;
  height: 60px;
}
.con_title {
  font-size: 10px;
}
.con_info {
  font-size: 8px;
}
</style>