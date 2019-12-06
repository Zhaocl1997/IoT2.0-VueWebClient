<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :before-close="cancel"
    :close-on-click-modal="false"
    center
    width="60%"
  >
    <el-form
      ref="dialogform"
      :model="dialogFormData"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="问题" prop="topic">
        <el-input v-model="dialogFormData.topic"></el-input>
      </el-form-item>

      <el-form-item label="分类">
        <el-select v-model="dialogFormData.category" placeholder="请选择分类">
          <el-option label="浏览器" value="browser"></el-option>
          <el-option label="Http协议" value="http"></el-option>
          <el-option label="HTML" value="html"></el-option>
          <el-option label="CSS" value="css"></el-option>
          <el-option label="JavaScript" value="js"></el-option>
          <el-option label="Vue" value="vue"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="答案" prop="answer" style="height:400px;">
        <div style=" height:400px; overflow-y: auto;">
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor
            v-model="dialogFormData.answer"
            ref="myQuillEditor"
            :options="editorOption"
            style="height: 380px; margin-bottom: 54px"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          ></quill-editor>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel()">取 消</el-button>
      <el-button size="small" type="primary" @click="save()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import { articleService } from "@/services";
import { alertBox } from "@/components/MessageBox";

export default {
  name: "questionAddEditForm",
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    dialogFormData: {
      type: Object,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      editorOption: {
        // some quill options
      },
      rules: {
        topic: [{ required: true, message: "问题不能为空", trigger: "blur" }],
        answer: [{ required: true, message: "答案不能为空", trigger: "blur" }]
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },

    //点击确定按钮
    async save() {
      //第一步，验证数据输入是否合法
      if ((await this.verifydata()) !== true) return;

      let action;
      if (this.dialogTitle == "新增") {
        action = "add";
      } else {
        action = "update";
      }

      //第二部保存数据
      try {
        await articleService.addQuestion(this.dialogFormData, action);

        alertBox("数据保存成功", "信息管理");

        this.dialogFormData = {};
        this.$emit("save");
      } catch (error) {
        console.log("hh");
      }
    },

    //输入数据验证
    async verifydata() {
      return await this.$refs["dialogform"].validate().then(function(result) {
        return result;
      });
    },

    //取消按钮
    cancel() {
      this.$refs["dialogform"].clearValidate();
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
</style>