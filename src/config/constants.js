require('dotenv').config();

/**
 * Objeto que contiene las constantes de la base de datos.
 */
const db = {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DATABASE: process.env.DB_DATABASE,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT: process.env.DB_DIALECT,
};

/**
 * Objeto que contiene las constantes de la API.
 */
const api = {
    PORT: process.env.API_PORT,
    PREFIJO: process.env.API_PREFIJO,
    HOST: process.env.API_HOST,
}

/**
 * Objeto que contiene las constantes de los colores y tipos de mensajes para los prints.
 */
const print = {
    TYPE: {
        SUCCESS: process.env.PRINT_TYPE_SUCCESS,
        ERROR: process.env.PRINT_TYPE_ERROR,
        HTTP: process.env.PRINT_TYPE_HTTP,
        TEST: process.env.PRINT_TYPE_TEST,
    },
    COLOR: {
        SUCCESS: process.env.PRINT_COLOR_SUCCESS,
        ERROR: process.env.PRINT_COLOR_ERROR,
        HTTP: process.env.PRINT_COLOR_HTTP,
        TEST: process.env.PRINT_COLOR_TEST,
    }
}

const http = {
    status: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    arrow: {
        [print.TYPE.HTTP]: '    --> ➡ ',
        [print.TYPE.TEST]: '    --> ℹ ',
        [print.TYPE.SUCCESS]: ' --> ✔ ',
        [print.TYPE.ERROR]: '   --> ✖ ',
    }
}


module.exports = {
    db, api, print, http
};