<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
    @open="onOpen"
    @close="onClose"
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
      <el-form-item label="角色名称：" prop="name">
        <el-input
          v-model="dialogFormData.name"
          placeholder="请输入角色名称"
          :disabled="this.dialogTitle ==='编辑角色'"
        />
      </el-form-item>

      <el-form-item label="角色描述：" prop="describe">
        <el-input v-model="dialogFormData.describe" placeholder="请输入角色描述" />
      </el-form-item>

      <el-form-item label="角色权限：" prop="menu">
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
      </el-form-item>

      <el-form-item label="角色状态: " prop="status">
        <el-switch v-model="dialogFormData.status" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { roleService, menuService } from "@/services";
import { formMixins } from "@/mixins";
import { tip } from "@/components/MessageBox";
import { arr_diffA } from "@/helper/public";

export default {
  mixins: [formMixins],
  name: "roleForm",
  data() {
    return {
      treeData: [],
      treeKeys: [],
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
        ],
        status: [
          { required: true, message: "角色状态不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 窗口打开时绑定tree
    async onOpen() {
      // 绑定tree数据
      const result = await menuService.index();
      this.treeData = result;
      for (let i = 0; i < this.treeData.length; i++) {
        const element = this.treeData[i];
        this.treeKeys.push(element._id);
      }

      console.log(this.treeKeys);

      // 如果角色有菜单字段
      if (this.dialogFormData.menu) {
        // 设置默认展开的ID和默认选中的ID

        for (let i = 0; i < this.dialogFormData.menu.length; i++) {
          let element = this.dialogFormData.menu[i];
          this.treeCheckedKey.push(element);
          //this.treeExpandedKey.push(element);
          for (let j = 0; j < this.treeKeys.length; j++) {
            let ele = this.treeKeys[j];
            if (element === ele) {
              // 有子节点被选中的父节点ID，即默认展开ID
              this.treeExpandedKey.push(ele);
            }
          }
        }

        // 把父节点ID通过数组去重去掉;
        this.treeCheckedKey = arr_diffA(
          this.treeCheckedKey,
          this.treeExpandedKey
        );

        console.log(this.treeCheckedKey);
        console.log(this.treeExpandedKey);

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
      this.treeExpandedKey = [];
      this.treeCheckedKey = [];
      // 调用nextTick防止undefined
      this.$nextTick(function() {
        this.$refs.tree.setCheckedKeys([]);
      });
    },

    // 处理权限选择
    onCheck(data, currentChecked) {
      const { checkedKeys, halfCheckedKeys } = currentChecked;
      const keys = arr_diffA(checkedKeys, halfCheckedKeys);
      this.dialogFormData.menu = keys;
    },

    // 请求
    async onAction() {
      if (this.dialogTitle == "编辑角色") {
        const result = await roleService.update(this.dialogFormData);
        if (result === true) {
          tip.uS();
          return result;
        }
      } else if (this.dialogTitle == "新建角色") {
        const result = await roleService.create(this.dialogFormData);
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