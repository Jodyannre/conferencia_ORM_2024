const sequelize = require('../config/database');
const printMsg = require('../utils/print');
const {print} = require('../config/constants');
require('./relations');

const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: false });
      printMsg('Tablas sincronizadas', print.TYPE.SUCCESS);
    } catch (error) {
      printMsg('Error al sincronizar las tablas:', print.TYPE.ERROR);
    }
  };

  module.exports = syncDatabase;