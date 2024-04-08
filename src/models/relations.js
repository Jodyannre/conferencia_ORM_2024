const Estudiante = require('./estudiante.model');
const Curso = require('./curso.model');
const Asignacion = require('./asignacion.model');

// Definir las relaciones entre los modelos
Asignacion.belongsTo(Estudiante, { foreignKey: 'estudianteId' });
Asignacion.belongsTo(Curso, { foreignKey: 'cursoId' });
Estudiante.hasMany(Asignacion, { foreignKey: 'estudianteId' });
Curso.hasMany(Asignacion, { foreignKey: 'cursoId' });
