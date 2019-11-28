<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
    @close="onCancel"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :before-close="onDialogClose"
  >
    <el-form
      ref="dialogform"
      :model="dialogFormData"
      :rules="rules"
      size="small"
      label-width="100px"
      :label-position="labelPosition"
    >
      <el-form-item label="设备名称：" prop="name">
        <el-input v-model="dialogFormData.name" placeholder="请输入设备名称" />
      </el-form-item>

      <el-form-item label="mac地址：" prop="macAddress">
        <el-input v-model="dialogFormData.macAddress" placeholder="请输入mac地址" />
      </el-form-item>

      <el-form-item label="设备种类：" prop="type">
        <el-select v-model="dialogFormData.type" placeholder="请选择设备种类" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="设备状态: " prop="status">
        <el-tooltip :content="'设备状态: ' + dialogFormData.status" placement="top">
          <el-switch v-model="dialogFormData.status" />
        </el-tooltip>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deviceService } from "@/services";
import { tip } from "@/components/MessageBox";
import { formMixins } from "@/mixins";

export default {
  mixins: [formMixins],
  name: "DeviceAddEditForm",
  data() {
    return {
      options: [
        {
          value: "sensor",
          label: "温湿度传感器"
        },
        {
          value: "camera",
          label: "摄像头"
        }
      ],
      rules: {
        name: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
          { min: 5, max: 12, message: "设备名称长度在5到12位", trigger: "blur" }
        ],
        macAddress: [
          { required: true, message: "mac地址不能为空", trigger: "blur" },
          {
            pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
            message: "mac地址格式不对",
            trigger: "blur"
          }
        ],
        type: [
          { required: true, message: "设备种类不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "设备状态不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 请求
    async onAction() {
      if (this.dialogTitle == "编辑设备") {
        const result = await deviceService.update(this.dialogFormData);
        if (result === true) {
          tip.uS();
          return result;
        }
      } else if (this.dialogTitle == "新建设备") {
        const result = await deviceService.create(this.dialogFormData);
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