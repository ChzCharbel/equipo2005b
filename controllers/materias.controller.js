const Materia = require('../models/materias.model');
const { getAllCourses } = require('../util/admin.api.client');

exports.get_materias = (request, response, next) => {
    Materia.getAllCourses().then(materias => {
        console.log(materias);
        response.render('materias.ejs', {
        titulo: 'materias',
        materias: materias || [],
        privilegios: request.session.privilegios || [],
        });
    });
    
}