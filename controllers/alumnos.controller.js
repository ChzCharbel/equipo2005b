const Alumno = require('../models/alumnos.model');

exports.get_horario_alumnos_regulares = (request, response, next) => {
    response.render('horario_alumnos_regulares.ejs', {
        titulo: 'alumnos_regulares',
        privilegios: request.session.privilegios || [],
    });
};

exports.get_alumnos = (request, response, next) => {
    console.log(request.session.matricula);
    console.log(request.session.privilegios);
    Alumno.fetchAll().then((alumnos) => {
        console.log(alumnos.rows);
        response.render('alumnos', {
            titulo: 'alumnos',
            privilegios: request.session.privilegios || [],
            alumnos: alumnos.rows,
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
        });

    }).catch((error) => {
        console.log(error);
    })
    
}; 

exports.get_horario_alumnos_irregulares = (request, response, next) => {
    response.render('horario_alumnos_irregulares.ejs', {
        titulo: 'alumnos_irregulares',
        privilegios: request.session.privilegios || [],
    });
};