'use strict'

import base_api from "./base_api";

const options = base_api('menu', 'options')
const index = base_api('menu', 'index')
const create = base_api('menu', 'create')
const read = base_api('menu', 'read')
const update = base_api('menu', 'update')
const del = base_api('menu', 'delete')

export const menuService = {
    options,
    index,
    create,
    read,
    update,
    del,
}