require('module-alias/register')
const { print } = require('../config/constants.js');
const printMsg = require('../utils/print.js');


/**
 * Middleware para hacer logger de las peticiones.
 * 
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next middleware
 */
const loggerMiddleware = (req, res, next) => {

    printMsg(`Petición: ${req.method} ${req.originalUrl}`, print.TYPE.HTTP);

    next();
  };
  

  /** 
   * 
   * Middleware para hacer logger con el resultado de la consulta.
   * @param {*} req request
   * @param {*} res response
   * @param {*} next next middleware
  */
  const loggerMiddlewareResult = (req, res, next) => {
    res.on('finish', () => {
      // Verificar si la respuesta fue exitosa
      if (res.statusCode >= 200 && res.statusCode < 300) {
        printMsg(`Resultado: ${res.statusCode} ${res.statusMessage}`, print.TYPE.SUCCESS);
    } else {
        printMsg(`Resultado: ${res.statusCode} ${res.statusMessage}`, print.TYPE.ERROR);
    }
    });
    next();
  };

  module.exports = { loggerMiddlewareResult, loggerMiddleware };


