'use strict'

import base_api from "./base_api";

const index = base_api('logger', 'index')
const del = base_api('logger', 'delete')

export const loggerService = {
    index,
    del
}