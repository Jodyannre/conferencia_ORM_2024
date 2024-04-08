const express = require('express');
const router = express.Router();
const estudianteController = require('@controllers/estudiante.controllers');

router.post('/', estudianteController.crearEstudiante);
router.post('/crear-asignar', estudianteController.crearEstudianteYAsignarCurso);
router.get('/', estudianteController.obtenerEstudiantes);
router.get('/:id/query', estudianteController.obtenerEstudiatesQuery);
router.get('/:id/sp', estudianteController.obtenerEstudiatesSP);
router.get('/con-cursos', estudianteController.obtenerEstudiantesConCursos);
router.get('/:id', estudianteController.obtenerEstudiante);
router.put('/:id', estudianteController.actualizarEstudiante);
router.delete('/:id', estudianteController.eliminarEstudiante);

module.exports = router;