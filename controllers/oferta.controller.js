const Materia = require('../models/materias.model');

exports.get_oferta = (request, response, next) => {
    
}

exports.get_agregar = (request, response, next) => {
    //necesito el id del ciclo escolar y el de la materia en la ruta
    Materia.getAllCourses().then((materias) => {
        console.log(materias);
        response.render('oferta_academica.ejs', {
            titulo: 'Materias',
            privilegios: request.session.privilegios || [],
            materias: materias,
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
        })
    }).catch((error) => {
        console.log(error);
    });
}