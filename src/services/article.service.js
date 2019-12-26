'use strict'

import base_api from "./base_api";

const index = base_api('article', 'index')
const create = base_api('article', 'create')
const read = base_api('article', 'read')
const update = base_api('article', 'update')
const del = base_api('article', 'delete')

export const articleService = {
    index,
    create,
    read,
    update,
    del,
}