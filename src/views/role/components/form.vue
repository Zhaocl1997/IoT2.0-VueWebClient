<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
    @open="onOpen"
    @close="onCancel"
    @before-close="onClose"
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
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="dialogFormData.name" placeholder="请输入角色名称" />
      </el-form-item>

      <el-form-item label="角色描述：" prop="describe">
        <el-input v-model="dialogFormData.describe" placeholder="请输入角色描述" />
      </el-form-item>

      <el-form-item label="角色权限：" prop="menu">
        <div style="overflow-y: scroll;overflow-x: hidden; height: 250px;">
          <el-tree
            ref="tree"
            :data="treeData"
            show-checkbox
            accordion
            node-key="_id"
            :default-checked-keys="treeCheckedKey"
            :default-expanded-keys="treeExpandedKey"
            :check-strictly="false"
            :props="treeProps"
            @check="onCheck"
            highlight-current
          />
        </div>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { roleService, menuService } from "@/services";
import { formMixins } from "@/mixins";
import { arr_diffA, action } from "@/helper/public";

export default {
  mixins: [formMixins],
  name: "roleForm",
  data() {
    return {
      treeData: [],
      treeOneKeys: [],
      treeCheckedKey: [],
      treeExpandedKey: [],
      treeProps: {
        children: "subs",
        label: "title"
        // isLeaf: "leaf"
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "角色名称长度在2到10位", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "角色描述不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "角色描述长度在2到10位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 窗口打开时绑定tree
    async onOpen() {
      // 绑定tree数据
      const result = await menuService.options();
      this.treeData = result.data;

      // 一级菜单ID
      this.treeData.map(menu => {
        this.treeOneKeys.push(menu._id);
      });

      // 如果有菜单字段
      if (this.dialogFormData.menu && this.dialogFormData.menu.length !== 0) {
        // 默认展开和默认选中
        for (let i = 0; i < this.dialogFormData.menu.length; i++) {
          let element = this.dialogFormData.menu[i];
          this.treeExpandedKey.push(element);
          this.treeCheckedKey.push(element);
        }

        // 调用nextTick防止undefined
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.treeCheckedKey);
        });
      }
    },

    // 窗口关闭的回调
    onClose() {
      // 关闭窗口时清空已有权限数组
      this.treeData = [];
      this.treeOneKeys = [];
      this.treeExpandedKey = [];
      this.treeCheckedKey = [];
      // 调用nextTick防止undefined
      this.$nextTick(function() {
        this.$refs.tree.setCheckedKeys([]);
      });
      this.$emit("cancel");
    },

    // 处理权限选择
    onCheck(data, currentChecked) {
      const { checkedKeys, halfCheckedKeys } = currentChecked;
      // 一级ID和二级ID拼接
      const keys = checkedKeys.concat(halfCheckedKeys);
      // 滤去一级ID
      const result = arr_diffA(keys, this.treeOneKeys);
      this.dialogFormData.menu = result;
    },

    // 请求
    onAction() {
      return action(
        { t: this.dialogTitle, d: this.dialogFormData },
        "角色",
        roleService
      );
    }
  }
};
</script>

<style scoped>
</style>