<template>
  <div class="footer">
    <!-- <marquee
      id="affiche"
      align="left"
      behavior="scroll"
      bgcolor="#FF0000"
      direction="up"
      height="300"
      width="200"
      hspace="50"
      vspace="20"
      loop="-1"
      scrollamount="10"
      scrolldelay="100"
      onMouseOut="this.start()"
      onMouseOver="this.stop()"
    >这是一个完整的例子</marquee>-->

    <div class="marquee">
      <div class="marquee_title">
        <span>推送消息</span>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{ marquee_top:animate }">
          <li v-for="item in newsList" :key="item.id">
            <span>{{ item.msg }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-footer",
  data() {
    return {
      animate: false,
      newsList: [
        {
          id: 1,
          msg: "本平台仍在开发测试阶段，如有任何问题请联系右上方微信！"
        },
        {
          id: 2,
          msg: "本平台纯属个人测试使用，没有任何商业用途！"
        },
        {
          id: 3,
          msg: "本平台前后台均为作者本人搭建，使用了阿里云作为云服务商。"
        },
        {
          id: 4,
          msg:
            "本平台前端技术栈有：Vue全家桶，socket-io-client，axios，Chart.js，ElementUI"
        },
        {
          id: 5,
          msg:
            "本平台后端技术栈有：Express框架，MongoDB，jsonwebtoken，socket-io，MQTT协议"
        }
      ]
    };
  },
  mounted() {
    setInterval(this.newsScoll, 5000);
  },
  methods: {
    newsScoll() {
      this.animate = true;
      setTimeout(() => {
        this.newsList.push(this.newsList[0]);
        this.newsList.shift();
        this.animate = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
.marquee {
  color: #3a3a3a;
  background-color: #b3effe;
  display: flex;
}
.marquee_title {
  padding: 0 20px;
  border-right: 1px solid #000000;
}
.marquee_box {
  position: relative;
  width: 60%;
  overflow: hidden;
}
.marquee_list {
  position: absolute;
  top: 2px;
  left: 0;
}
.marquee_top {
  transition: all 0.5s;
  margin-top: -20px;
}
.marquee_list li {
  font-size: 14px;
  padding-left: 20px;
}
.marquee_list li span {
  padding: 0 2px;
}
</style>