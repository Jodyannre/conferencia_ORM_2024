const express = require('express');
const router = express.Router();
const asignacionController = require('@controllers/asignacion.controller');

router.post('/', asignacionController.crearAsignacion);
router.get('/', asignacionController.obtenerAsignaciones);
router.get('/:nombreEstudiante', asignacionController.obtenerAsignacion);
router.put('/:nombreEstudiante/:nombreCurso', asignacionController.actualizarAsignacion);
router.delete('/:nombreEstudiante/:nombreCurso', asignacionController.eliminarAsignacion);


module.exports = router;