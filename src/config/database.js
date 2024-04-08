const { Sequelize } = require('sequelize');
const { db, print } = require('./constants.js');
const printMsg = require('../utils/print.js');

const sequelize = new Sequelize(db.DATABASE, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.DIALECT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/* Verificar que la conexión se realizó correctamente */
sequelize.authenticate()
  .then(() => {
    printMsg(`Conectado a la base de datos: ${db.DATABASE}`, print.TYPE.SUCCESS)
  })
  .catch(err => {
    printMsg('No se conecto', print.TYPE.ERROR)
})


module.exports = sequelize;
