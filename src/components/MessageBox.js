'use strict'

import Message from 'element-ui/packages/message';
import MessageBox from 'element-ui/packages/message-box';

const info = (function () {
  // 确认消息
  async function checkBox(content) {
    return await MessageBox
      .confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      })
      .then(action => {
        if (action == 'confirm') {
          return true;
        }
      })
      .catch(error => {
        if (error == "cancel") {
          return false;
        }
      })
  }

  // 提示消息
  async function alertBox(content, title) {
    return await MessageBox
      .alert(content, title, {
        confirmButtonText: '确定',
        closeOnClickModal: false
      })
      .then(action => {
        if (action == 'confirm') {
          return true;
        }
      })
      .catch(error => {
        if (error == "cancel") {
          return false;
        }
      })
  }

  // 轻提示
  const tip = {
    cS() {
      return Message.success('新建成功')
    },
    uS() {
      return Message.success('编辑成功')
    },
    dS() {
      return Message.success('删除成功')
    },
    success(msg) {
      return Message.success(msg)
    },
    error(msg) {
      return Message.error(msg)
    },
    cancel() {
      return Message.info('已取消操作')
    }
  }

  return {
    checkBox,
    alertBox,
    tip
  }
})()

export default info