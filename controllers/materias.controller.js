const Materia = require('../models/materias.model');
const Profesor = require('../models/profesores.model');
const Salon = require('../models/salones.model');
const { getAllCourses } = require('../util/admin.api.client');

exports.get_materias = (request, response, next) => {
    Promise.all([
        Materia.getAllCourses(),
        Profesor.fetchAll(),
        Salon.fetchAll()
    ]).then(([materias, profesores, salones]) => {
        response.render('materias.ejs', {
            titulo: 'materias',
            materias: materias || [],
            privilegios: request.session.privilegios || [],
            profesores: profesores.rows || [],
            salones: salones.rows || [],
            carrera: request.session.carrera || '',
        });
    }).catch((error) => {
        console.log(error);
        response.status(500).render('error.ejs', {
            titulo: 'Error',
            mensaje: 'Ocurrió un error al cargar los datos'
        });
    });
};