const Materia = require('../models/materias.model');
const Profesor = require('../models/profesores.model');
const { getAllCourses } = require('../util/admin.api.client');

exports.get_materias = (request, response, next) => {
    Materia.getAllCourses().then(materias => {
        console.log(materias);
        Profesor.fetchAll().then((profesores) => {
            console.log(profesores)
            response.render('materias.ejs', {
                titulo: 'materias',
                materias: materias || [],
                privilegios: request.session.privilegios || [],
                profesores: profesores.rows || [],
                });
        }).catch((error) => {
            console.log(error);
        })
    });
    
}