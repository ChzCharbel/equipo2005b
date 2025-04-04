const Materia = require('../models/materias.model');

exports.get_oferta = (request, response, next) => {
    Materia.getAllCourses().then((materias) => {
        //console.log(materias);
        response.render('oferta_academica.ejs', {
            titulo: 'oferta_academica',
            privilegios: request.session.privilegios || [],
            materias: materias,
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
        })
    }).catch((error) => {
        console.log(error);
    });
}

exports.get_agregar = (request, response, next) => {
    //necesito el id del ciclo escolar y el de la materia en la ruta
    
}

exports.post_agregar = (request, response, next) => {

}