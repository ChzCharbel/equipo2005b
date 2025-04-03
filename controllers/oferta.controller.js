const Materia = require('../models/materias.model');

exports.get_oferta = (request, response, next) => {
    Materia.getAllCourses().then((materias) => {
        console.log(materias);
        response.render('oferta_academica.ejs', {
            titulo: 'materias',
            privilegios: request.session.privilegios || [],
            materias: materias,
        })
    }).catch((error) => {
        console.log(error);
    });
    
}