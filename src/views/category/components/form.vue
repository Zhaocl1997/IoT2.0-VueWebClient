<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
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
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="dialogFormData.name" placeholder="请输入分类名称" />
      </el-form-item>

      <el-form-item label="关键字：" prop="key">
        <el-input v-model="dialogFormData.key" placeholder="请输入关键字" />
      </el-form-item>

      <el-form-item label="分类描述：" prop="desc">
        <el-input
          type="textarea"
          :rows="9"
          maxlength="200"
          show-word-limit
          v-model="dialogFormData.desc"
          placeholder="请输入分类描述"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { categoryService } from "@/services";
import { formMixins } from "@/mixins";
import { tip } from "@/components/MessageBox";

export default {
  mixins: [formMixins],
  name: "categoryForm",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        key: [{ required: true, message: "关键字不能为空", trigger: "blur" }],
        desc: [{ required: true, message: "分类描述不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    // 请求
    async onAction() {
      if (this.dialogTitle == "编辑分类") {
        const result = await categoryService.update(this.dialogFormData);
        if (result === true) {
          tip.uS();
          return result;
        }
      } else if (this.dialogTitle == "新建分类") {
        const parentID = this.dialogFormData._id;
        delete this.dialogFormData._id;

        const result = await categoryService.create({
          ...this.dialogFormData,
          parentID
        });
        if (result === true) {
          tip.cS();
          return result;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>