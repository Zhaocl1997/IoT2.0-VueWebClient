<template>
  <div class="password">
    <el-form :model="ruleForm" :rules="rules" ref="password" @submit.native.prevent>
      <el-form-item prop="password">
        <el-popover placement="right" width="200" trigger="focus">
          <el-input
            v-model="ruleForm.password"
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
            :style="`width:${width}px;`"
            autocomplete="off"
          >
            <el-button slot="append" icon="el-icon-unlock" v-if="append" @click="onConfirm"></el-button>
          </el-input>

          <p id="title" :class="titleClasses">{{ title }}</p>

          <div class="password-base" :class="divClasses"></div>

          <p>请至少输入9位。请不要输入过于简单的密码。</p>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "v-password",
  data() {
    return {
      title: "强度：无",
      ruleForm: {
        password: this.value
      },
      one: false,
      two: false,
      three: false,
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 9,
            max: 16,
            message: "密码长度在9到16位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    value: String,
    placeholder: { type: String, default: "请输入密码" },
    width: { type: Number, default: 330 },
    append: { type: Boolean, default: false }
  },
  model: {
    prop: "value",
    event: "pass"
  },
  computed: {
    stateOne() {
      return this.one && !this.two && !this.three;
    },
    stateTwo() {
      return !this.one && this.two && !this.three;
    },
    stateThree() {
      return !this.one && !this.two && this.three;
    },

    divClasses() {
      return {
        one: this.stateOne,
        two: this.stateTwo,
        three: this.stateThree
      };
    },
    titleClasses() {
      return {
        titleOne: this.stateOne,
        titleTwo: this.stateTwo,
        titleThree: this.stateThree
      };
    }
  },
  methods: {
    // 检查密码强度
    checkStrong(val) {
      let modes = 0;
      // 正则表达式验证符合要求的
      if (val.length < 1) return modes;
      if (/\d/.test(val)) modes++; // 数字
      if (/[a-z]/.test(val)) modes++; // 小写
      if (/[A-Z]/.test(val)) modes++; // 大写
      if (/\W/.test(val)) modes++; // 特殊字符

      //逻辑处理
      switch (modes) {
        case 1:
          return 1;
        case 2:
          return 1;
        case 3:
          return 2;
        case 4:
          return 3;
      }
      return modes;
    },
    // 提交
    onPass(val) {
      this.$emit("pass", val);
    },

    // 验证
    validate() {
      return this.$refs["password"].validate();
    },

    // 解锁按钮
    onConfirm() {
      this.$emit("unlock", this.ruleForm.password);
    }
  },
  watch: {
    "ruleForm.password": {
      deep: true,
      handler: function(newV) {
        const msgText = this.checkStrong(newV);

        switch (msgText) {
          case 0:
            this.one = false;
            this.two = false;
            this.three = false;
            this.title = "强度：无";
            break;

          case 1:
            this.one = true;
            this.two = false;
            this.three = false;
            this.title = "强度：弱";
            break;

          case 2:
            this.one = false;
            this.two = true;
            this.three = false;
            this.title = "强度：中";
            break;

          case 3:
            this.one = false;
            this.two = false;
            this.three = true;
            this.title = "强度：强";
            break;

          default:
            break;
        }
      }
    }
  }
};
</script>

<style scoped>
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
.titleOne {
  color: rgba(255, 0, 0, 0.6);
}
.titleTwo {
  color: rgba(0, 128, 0, 0.6);
}
.titleThree {
  color: rgba(0, 0, 255, 0.6);
}
</style>