import Message from 'element-ui/packages/message';
import MessageBox from 'element-ui/packages/message-box';
import { getNow } from "../helper/public";

// 确认消息
export async function checkBox(content) {
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
    }).catch(error => {
      if (error == "cancel") {
        return false;
      }
    })
}

// 提示消息
export async function alertBox(content, title) {
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
export const tip = {
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

// 备份专用
export async function prompt(content, title, size) {
  return await MessageBox
    .prompt(content, title, {
      inputValue: getNow() + '__' + size + '.json',
      closeOnClickModal: false
    })
    .then(({ value }) => {
      return { status: true, value };
    })
    .catch(() => {
      return { status: false }
    })
}