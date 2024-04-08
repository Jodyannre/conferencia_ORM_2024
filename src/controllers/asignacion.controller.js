const {http} = require('../config/constants.js');
const Asignacion = require('../models/asignacion.model');
const Estudiante = require('../models/estudiante.model');
const Curso = require('../models/curso.model');



const ierror = http.status.INTERNAL_SERVER_ERROR;
const created = http.status.CREATED;
const ok = http.status.OK;
const notfound = http.status.NOT_FOUND;



exports.crearAsignacion = async (req, res) => {
  try {
    const { nombreEstudiante, nombreCurso } = req.body;
    const estudiante = await Estudiante.findOne({ where: { nombre: nombreEstudiante } });
    const curso = await Curso.findOne({ where: { nombre: nombreCurso } });

    if (!estudiante || !curso) {
      return res.status(notfound).json({ error: 'Estudiante o curso no encontrado' });
    }

    const asignacion = await Asignacion.create({
      estudianteId: estudiante.id,
      cursoId: curso.id
    });

    res.status(created).json(asignacion);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.obtenerAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll({
      include: [{ model: Estudiante }, { model: Curso }]
    });
    res.json(asignaciones);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.obtenerAsignacion = async (req, res) => {
  try {
    const { nombreEstudiante } = req.params;
    const estudiante = await Estudiante.findOne({ where: { nombre: nombreEstudiante } });

    if (!estudiante) {
      return res.status(notfound).json({ error: 'Estudiante no encontrado' });
    }

    const asignaciones = await Asignacion.findAll({
      where: { estudianteId: estudiante.id },
      include: [{ model: Curso }]
    });

    if (asignaciones.length > 0) {
      res.json(asignaciones);
    } else {
      res.status(notfound).json({ error: 'El estudiante no tiene asignaciones' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.actualizarAsignacion = async (req, res) => {
  try {
    const { nombreEstudiante, nombreCurso } = req.params;
    const { nuevoNombreEstudiante, nuevoNombreCurso } = req.body;

    const estudiante = await Estudiante.findOne({ where: { nombre: nombreEstudiante } });
    const curso = await Curso.findOne({ where: { nombre: nombreCurso } });
    const nuevoEstudiante = await Estudiante.findOne({ where: { nombre: nuevoNombreEstudiante } });
    const nuevoCurso = await Curso.findOne({ where: { nombre: nuevoNombreCurso } });

    if (!estudiante || !curso || !nuevoEstudiante || !nuevoCurso) {
      return res.status(notfound).json({ error: 'Estudiante o curso no encontrado' });
    }

    const asignacion = await Asignacion.findOne({
      where: { estudianteId: estudiante.id, cursoId: curso.id }
    });

    if (asignacion) {
      asignacion.estudianteId = nuevoEstudiante.id;
      asignacion.cursoId = nuevoCurso.id;
      await asignacion.save();
      res.json(asignacion);
    } else {
      res.status(notfound).json({ error: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.eliminarAsignacion = async (req, res) => {
  try {
    const { nombreEstudiante, nombreCurso } = req.params;
    const estudiante = await Estudiante.findOne({ where: { nombre: nombreEstudiante } });
    const curso = await Curso.findOne({ where: { nombre: nombreCurso } });

    if (!estudiante || !curso) {
      return res.status(notfound).json({ error: 'Estudiante o curso no encontrado' });
    }

    const asignacion = await Asignacion.findOne({
      where: { estudianteId: estudiante.id, cursoId: curso.id }
    });

    if (asignacion) {
      await asignacion.destroy();
      res.json({ message: 'Asignación eliminada' });
    } else {
      res.status(notfound).json({ error: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};