import Message from 'element-ui/packages/message';
import MessageBox from 'element-ui/packages/message-box';


// 确认消息
export function checkBox(content) {
  return MessageBox
    .confirm(content, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
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
export function alertBox(content, title) {
  return MessageBox
    .alert(content, title, {
      confirmButtonText: '确定'
    }).then(action => {
      if (action == 'confirm') {
        return true;
      }
    }).catch(error => {
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
  error(msg) {
    return Message.error(msg)
  },
  cancel() {
    return Message.info('已取消操作')
  }
}