const Curso = require('../models/curso.model');
const {http} = require('../config/constants.js');


const ierror = http.status.INTERNAL_SERVER_ERROR;
const created = http.status.CREATED;
const ok = http.status.OK;
const notfound = http.status.NOT_FOUND;



exports.crearCurso = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const curso = await Curso.create({ nombre, descripcion });
    res.status(created).json(curso);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({});
    res.json(cursos);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.obtenerCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByPk(id, {});
    if (curso) {
      res.json(curso);
    } else {
      res.status(notfound).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.actualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const curso = await Curso.findByPk(id);
    if (curso) {
      curso.nombre = nombre;
      curso.descripcion = descripcion;
      await curso.save();
      res.json(curso);
    } else {
      res.status(notfound).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.eliminarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);
    if (curso) {
      await curso.destroy();
      res.json({ message: 'Curso eliminado' });
    } else {
      res.status(notfound).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};