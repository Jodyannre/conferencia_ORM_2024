const express = require('express');
const router = express.Router();
const { loggerMiddleware, loggerMiddlewareResult } = require('@middleware/logger');
const estudianteRoutes = require('./estudiante.routes');
const cursoRoutes = require('./curso.routes');
const asignacionRoutes = require('./asignacion.routes');


router.use(loggerMiddleware);
router.use(loggerMiddlewareResult);

router.get('/', (req, res) => {
    return res.status(201).json({message: "Bienvenido a la API"});
});

// Montar las ruta
router.use('/estudiantes',  estudianteRoutes);
router.use('/cursos',  cursoRoutes);
router.use('/asignaciones',  asignacionRoutes);



module.exports = router;