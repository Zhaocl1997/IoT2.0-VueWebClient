'use strict'

import base_api from "./base_api";

const options = base_api('device', 'options')
const index = base_api('device', 'index')
const create = base_api('device', 'create')
const read = base_api('device', 'read')
const update = base_api('device', 'update')
const updateStatus = base_api('device', 'updateStatus')
const del = base_api('device', 'delete')
const delMany = base_api('device', 'deleteMany')

export const deviceService = {
    options,
    index,
    create,
    read,
    update,
    updateStatus,
    del,
    delMany
}