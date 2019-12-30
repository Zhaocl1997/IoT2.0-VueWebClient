<template>
  <div class="cd-btn">
    <el-button
      @click="onClick"
      :type="btntype"
      :disabled="disabled"
      :size="btnsize"
      :style="`width:${btnwidth}px`"
      :round="btnround"
    >{{ btntext }}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,

      btntext: this.text,
      btndelay: this.delay,
      btntype: this.type,
      btnsize: this.size,
      btnwidth: this.width,
      btnround: this.round
    };
  },
  props: {
    text: {
      type: String,
      default: "发送验证码"
    },
    delay: {
      type: Number,
      default: 10
    },
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "medium"
    },
    width: {
      type: Number,
      default: 120
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.disabled = true;
      let interval = window.setInterval(() => {
        this.btntext = `${this.btndelay}秒后重发`;
        --this.btndelay;
        if (this.btndelay < 0) {
          this.btntext = "重新发送";
          this.btndelay = 10;
          this.disabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
      this.$emit("sendEmail");
    }
  }
};
</script>

<style scoped>
</style>