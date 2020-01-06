<template>
  <el-dialog
    center
    top="10vh"
    width="780px"
    @open="onOpen"
    @close="onCancel"
    @before-close="onCancel"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible="dialogVisible"
    :z-index="1000"
  >
    <el-form
      ref="dialogform"
      :model="dialogFormData"
      :rules="rules"
      size="small"
      label-width="100px"
      :label-position="labelPosition"
    >
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="dialogFormData.title" placeholder="请输入文章标题" style="width:600px;" />
      </el-form-item>

      <el-form-item label="文章简述：" prop="intro">
        <el-input
          v-model="dialogFormData.intro"
          placeholder="请输入文章简述"
          type="textarea"
          :rows="4"
          maxlength="100"
          show-word-limit
          style="width:600px;"
        />
      </el-form-item>

      <el-form-item label="文章分类：" prop="category">
        <el-cascader
          placeholder="请选择文章分类"
          v-model="dialogFormData.category"
          :options="catOptions"
          :props="cascader"
          @change="onCategory"
          clearable
          style="width:600px;"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="文章标签：" prop="tag" v-model="dialogFormData.tag">
        <el-tag
          :key="tag"
          v-for="tag in dialogFormData.tag"
          closable
          :disable-transitions="false"
          @close="onTagClose(tag)"
        >{{ tag }}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="onInputConfirm"
          @blur="onInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="onShowInput">+ 添加标签</el-button>
      </el-form-item>

      <el-form-item label="文章内容：" prop="content">
        <v-quill v-model="dialogFormData.content"></v-quill>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { formMixins } from "@/mixins";
import vQuill from "./quill";

export default {
  mixins: [formMixins],
  name: "articleForm",
  components: {
    vQuill
  },
  data() {
    return {
      // 级联属性
      cascader: {
        expandTrigger: "hover",
        children: "subs",
        value: "_id",
        label: "name"
      },

      catOptions: [], // 级联数据

      inputVisible: false, // 标签输入框是否可见
      inputValue: "", // 标签输入框值

      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "文章简述不能为空", trigger: "blur" }
        ],
        tag: [{ required: true, message: "文章标签不能为空", trigger: "blur" }],
        category: [
          {
            required: true,
            message: "文章分类不能为空",
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "文章内容不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    dynamicTags() {
      return this.dialogFormData.tag ? this.dialogFormData.tag : [];
    }
  },
  methods: {
    // 打开时绑定分类数据
    async onOpen() {
      const result = await this.$api.categoryService.options();
      this.catOptions = result.data;
    },

    // tag 关闭
    onTagClose(tag) {
      this.dialogFormData.tag.splice(this.dialogFormData.tag.indexOf(tag), 1);
    },

    // 展示input
    onShowInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // 确定input即添加新标签
    onInputConfirm() {
      let inputValue = this.inputValue;
      const isSame = this.dialogFormData.tag.includes(inputValue);
      if (inputValue) {
        if (isSame) {
          return this.$info.tip.error("标签重复");
        }
        this.dialogFormData.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    // 选择分类
    onCategory(val) {
      if (val === undefined) return;
      this.dialogFormData.category = val[val.length - 1];
    },

    // 请求
    onAction() {
      return this.$CRUD.action("文章", this.$api.articleService, this.$info, {
        t: this.dialogTitle,
        d: this.dialogFormData
      });
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>