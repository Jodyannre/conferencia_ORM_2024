require('module-alias/register')
const {api} = require('./config/constants.js');
const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const printMsg = require('../utils/print.js');
const { print } = require('./config/constants.js');
const syncDatabase = require('../models/syncDatabase.js');

/* Middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(api.PREFIJO, routes);

/* Sincronización de la base de datos e inicio del servidor */
syncDatabase()
  .then(() => {
    // Iniciar el servidor
    app.listen(api.PORT, async () => {
        printMsg(`Aplicación corriendo en http://localhost:${api.PORT}${api.PREFIJO}`,print.TYPE.TEST);
    });
  })
  .catch(error => {
    printMsg('Error al iniciar la aplicación:', print.TYPE.ERROR);
  });

