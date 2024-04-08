const Estudiante = require('../models/estudiante.model');
const Curso = require('../models/curso.model');
const Asignacion = require('../models/asignacion.model');
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');
const {http} = require('../config/constants.js');


const ierror = http.status.INTERNAL_SERVER_ERROR;
const created = http.status.CREATED;
const ok = http.status.OK;
const notfound = http.status.NOT_FOUND;


exports.crearEstudiante = async (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const estudiante = await Estudiante.create({ nombre, edad });
    res.status(created).status(created).json(estudiante);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({});
    res.status(ok).json(estudiantes);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.obtenerEstudiatesQuery = async (req, res) => {
  const {id} = req.params;
  try {
    const estudiantes = await sequelize.query(
      'SELECT id, nombre, edad, createdAt, updatedAt FROM estudiantes WHERE id=$id', 
      { 
        type: QueryTypes.SELECT,
        bind: { id: id } 
      }
    );
    res.status(ok).json(estudiantes);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
}


exports.obtenerEstudiatesSP = async (req, res) => {
  const {id} = req.params;
  try {
    const estudiantes = await sequelize.query('CALL sp_get_students($id)', 
    { 
      type: QueryTypes.SELECT,
      bind: { id: id } 
    }
    );
    res.status(ok).json(estudiantes);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
}


exports.obtenerEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findByPk(id, {});
    if (estudiante) {
      res.status(ok).json(estudiante);
    } else {
      res.status(notfound).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.actualizarEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    const estudiante = await Estudiante.findByPk(id);
    if (estudiante) {
      estudiante.nombre = nombre;
      estudiante.edad = edad;
      await estudiante.save();
      res.status(ok).json(estudiante);
    } else {
      res.status(notfound).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};

exports.eliminarEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findByPk(id);
    if (estudiante) {
      await estudiante.destroy();
      res.status(ok).json({ message: 'Estudiante eliminado' });
    } else {
      res.status(notfound).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};



exports.obtenerEstudiantesConCursos = async (req, res) => {
  try {
    const { orden1 = 'ASC' } = req.query;
    const { orden2 = 'DESC' } = req.query;

    const estudiantes = await Estudiante.findAll({
      order: [
        ['id', orden1],
        [Asignacion,'id', orden2],
      ],
      include: [
        {
          model: Asignacion,
          include: [
            {
              model: Curso,
              attributes: ['id', 'nombre']
            }
          ],
        }
      ]
    });

    res.status(ok).json(estudiantes);
  } catch (error) {
    res.status(ierror).json({ error: error.message });
  }
};




exports.crearEstudianteYAsignarCurso = async (req, res) => {

  const {nombre, edad, id_curso} = req.body;
  // Iniciar la transacción
  const transaction = await sequelize.transaction();
  
  try {
    // Crear el estudiante
    const estudiante = await Estudiante.create({
      nombre: nombre,
      edad: edad,
    }, { transaction });

    // Obtener el primer curso disponible
    const cursoAasignar = await Curso.findOne({ where: { id: id_curso }, transaction });

    // Asignar el primer curso al estudiante
    const resultado = await Asignacion.create({
      estudianteId: estudiante.id,
      cursoId: cursoAasignar.id
    }, { transaction });

    // Confirmar la transacción
    await transaction.commit();

    res.status(created).json(resultado);

  } catch (error) {
    // Revertir la transacción en caso de error
    if (transaction) await transaction.rollback();
    res.status(ierror).json({ error: error.message });
  }
};
