'use strict'

import base_api from "./base_api";

const options = base_api('role', 'options')
const index = base_api('role', 'index')
const create = base_api('role', 'create')
const read = base_api('role', 'read')
const update = base_api('role', 'update')
const updateStatus = base_api('role', 'updateStatus')
const del = base_api('role', 'delete')

export const roleService = {
    options,
    index,
    create,
    read,
    update,
    updateStatus,
    del
}