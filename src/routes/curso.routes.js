const express = require('express');
const router = express.Router();
const cursoController = require('@controllers/curso.controllers');

router.post('/', cursoController.crearCurso);
router.get('/', cursoController.obtenerCursos);
router.get('/:id', cursoController.obtenerCurso);
router.put('/:id', cursoController.actualizarCurso);
router.delete('/:id', cursoController.eliminarCurso);

module.exports = router;