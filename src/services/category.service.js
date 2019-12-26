'use strict'

import base_api from "./base_api";

const options = base_api('category', 'options')
const index = base_api('category', 'index')
const create = base_api('category', 'create')
const read = base_api('category', 'read')
const update = base_api('category', 'update')

export const categoryService = {
    options,
    index,
    create,
    read,
    update
}