'use strict'

const CRUD = (function () {
    // 新建或修改流程
    async function action(title, service, info, { t, d }) {
        if (t == `编辑${title}`) {
            const result = await service.update(d)
            if (result === true) {
                info.tip.uS()
                return result
            }
        } else if (t == `新建${title}`) {
            const result = await service.create(d)
            if (result === true) {
                info.tip.cS()
                return result
            }
        }
    }

    // 单个删除流程
    async function singleDel(title, service, info, id, init) {
        const action = await info.checkBox(`是否删除该${title}?`)
        if (action === true) {
            const result = await service.del({ _id: id })
            if (result === true) {
                info.tip.dS()
                init()
            }
        } else {
            info.tip.cancel()
        }
    }

    // 多个删除流程
    async function mutipleDel(title, service, info, self) {
        const id = self.multipleSelection.map(a => a._id)
        const action = await info.checkBox(`是否删除这些${title}?`)
        if (action === true) {
            const result = await service.delMany({ _id: id })
            if (result === true) {
                info.tip.dS()
                self.init()
            }
        } else {
            info.tip.cancel()
            self.$refs.multipleTable.clearSelection()
        }
    }

    return {
        singleDel,
        mutipleDel,
        action
    }
})()

export default CRUD