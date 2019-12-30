<template>
  <div class="password">
    <el-popover placement="right" width="200" trigger="focus">
      <el-input
        v-model="password"
        :placeholder="placeholder"
        prefix-icon="el-icon-lock"
        show-password
        clearable
        type="password"
        minlength="9"
        maxlength="16"
        @input="onPass"
        @keyup.enter.native="onConfirm"
        slot="reference"
        :style="`width:${this.width}px;`"
      >
        <el-button slot="append" icon="el-icon-unlock" v-if="append" @click="onConfirm"></el-button>
      </el-input>

      <p id="title">{{ title }}</p>

      <div class="password-base" :class="classes"></div>

      <p>请至少输入9位。请不要输入过于简单的密码。</p>
    </el-popover>
  </div>
</template>

<script>
import { checkStrong } from "@/helper/public";

export default {
  name: "v-pass",
  data() {
    return {
      title: "强度：无",
      password: this.value,
      one: false,
      two: false,
      three: false
    };
  },
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "请输入密码"
    },
    width: {
      type: Number,
      default: 330
    },
    append: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "value",
    event: "pass"
  },
  computed: {
    classes() {
      return {
        one: this.one && !this.two && !this.three,
        two: !this.one && this.two && !this.three,
        three: !this.one && !this.two && this.three
      };
    }
  },
  methods: {
    // 提交
    onPass(val) {
      this.$emit("pass", val);
    },

    // 解锁按钮
    onConfirm() {
      this.$emit("unlock", this.password);
    }
  },
  watch: {
    password: function(newV) {
      const msgText = checkStrong(newV);

      switch (msgText) {
        case 0:
          this.one = false;
          this.two = false;
          this.three = false;
          this.title = "强度：无";
          document.getElementById("title").style.color = "black";
          break;

        case 1:
          this.one = true;
          this.two = false;
          this.three = false;
          this.title = "强度：弱";
          document.getElementById("title").style.color = "rgba(255, 0, 0, 0.6)";
          break;

        case 2:
          this.one = false;
          this.two = true;
          this.three = false;
          this.title = "强度：中";
          document.getElementById("title").style.color = "rgba(0, 128, 0, 0.6)";
          break;

        case 3:
          this.one = false;
          this.two = false;
          this.three = true;
          this.title = "强度：强";
          document.getElementById("title").style.color = "rgba(0, 0, 255, 0.6)";
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.password {
  margin: 0 auto;
}
.password-base {
  width: 150px;
  height: 10px;
  border-radius: 10px;
  margin: 10px;
  background: #eee;
}
.one {
  width: 50px;
  transition: width 0.5s;
  background-color: rgba(255, 0, 0, 0.6);
}
.two {
  width: 100px;
  transition: width 0.5s;
  background-color: rgba(0, 128, 0, 0.6);
}
.three {
  width: 150px;
  transition: width 0.5s;
  background-color: rgba(0, 0, 255, 0.6);
}
</style>