<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
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
      <el-form-item label="设备名称：" prop="name">
        <el-input v-model="dialogFormData.name" placeholder="请输入设备名称" />
      </el-form-item>

      <el-form-item label="mac地址：" prop="macAddress">
        <el-input v-model="dialogFormData.macAddress" placeholder="请输入mac地址" />
      </el-form-item>

      <el-form-item label="设备种类：" prop="type">
        <el-radio-group v-model="dialogFormData.type" placeholder="请选择设备种类">
          <el-radio v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deviceService } from "@/services";
import { action } from "@/helper/public";
import { formMixins } from "@/mixins";

export default {
  mixins: [formMixins],
  name: "DeviceAddEditForm",
  data() {
    return {
      options: [
        {
          value: "sensor",
          label: "传感器"
        },
        {
          value: "camera",
          label: "摄像头"
        }
      ],
      rules: {
        name: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
          { min: 2, max: 12, message: "设备名称长度在2到12位", trigger: "blur" }
        ],
        macAddress: [
          { required: true, message: "mac地址不能为空", trigger: "blur" },
          {
            pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
            message: "mac地址格式不对",
            trigger: "blur"
          }
        ],
        type: [{ required: true, message: "设备种类不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    // 请求
    onAction() {
      return action(
        { t: this.dialogTitle, d: this.dialogFormData },
        "设备",
        deviceService
      );
    }
  }
};
</script>

<style scoped>
</style>